(function initLandingPreviewVideo() {
  'use strict';

  // Как в приложении (yoga-1.js → setupVideoPreview + attachVideoSource):
  // 1) оверлей и старт только по тапу
  // 2) сначала HLS (на iPhone — нативный), MP4 только fallback
  // Сырой 2ГБ mp4 на Safari падает — поэтому не грузим его первым.

  const shell = document.querySelector('[data-landing-preview]');
  if (!shell) return;

  const video = shell.querySelector('video');
  const slug = shell.dataset.videoSlug;
  if (!video || !slug) return;

  const API_BASES = [
    'https://api.xn----7sbbhjdu1agcwbb5abq1f.xn--p1ai/api',
    'https://web-production-3cb7a.up.railway.app/api',
    'https://api.sistema-molodtsov.ru/api',
  ];

  let loadStarted = false;
  let activeSrc = '';
  let hlsInstance = null;
  let mp4FallbackTried = false;

  function isAppleTouchVideoDevice() {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    return /iPad|iPhone|iPod/i.test(ua) ||
      (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function canPlayNativeHls() {
    return !!(
      video.canPlayType('application/vnd.apple.mpegurl') ||
      video.canPlayType('application/x-mpegURL')
    );
  }

  function apiOrigin(base) {
    return String(base || '').replace(/\/api\/?$/u, '');
  }

  function showError(message) {
    shell.classList.add('has-error');
    shell.classList.remove('is-loading');
    let note = shell.querySelector('[data-landing-preview-error]');
    if (!note) {
      note = document.createElement('p');
      note.className = 'landing-preview-error';
      note.setAttribute('data-landing-preview-error', '');
      shell.appendChild(note);
    }
    note.textContent = message;
  }

  function clearError() {
    shell.classList.remove('has-error');
    const note = shell.querySelector('[data-landing-preview-error]');
    if (note) note.remove();
  }

  async function apiFetch(path) {
    let lastError = null;
    for (const base of API_BASES) {
      try {
        const response = await fetch(`${base}${path}`, { credentials: 'omit', mode: 'cors' });
        if (!response.ok) {
          lastError = new Error(`HTTP ${response.status}`);
          continue;
        }
        return { base, data: await response.json() };
      } catch (err) {
        lastError = err;
      }
    }
    throw lastError || new Error('API unavailable');
  }

  function prepareVideoAttrs() {
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('controls', '');
    video.playsInline = true;
    video.preload = 'metadata';
    video.removeAttribute('crossorigin');
  }

  function stripEmptySource() {
    const source = video.querySelector('[data-landing-preview-source]');
    if (source) source.remove();
  }

  function destroyHls() {
    if (hlsInstance && typeof hlsInstance.destroy === 'function') {
      try { hlsInstance.destroy(); } catch (_) {}
    }
    hlsInstance = null;
  }

  function ensureHlsJs() {
    if (window.Hls) return Promise.resolve(window.Hls);
    return new Promise(function (resolve, reject) {
      const existing = document.querySelector('script[data-hls-loader="true"]');
      if (existing) {
        existing.addEventListener('load', function () { resolve(window.Hls); });
        existing.addEventListener('error', reject);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js';
      script.async = true;
      script.dataset.hlsLoader = 'true';
      script.onload = function () { resolve(window.Hls); };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function playUrl(src) {
    clearError();
    activeSrc = String(src || '');
    prepareVideoAttrs();
    stripEmptySource();
    destroyHls();
    if (video.getAttribute('src')) video.removeAttribute('src');
    video.src = activeSrc;
    try { video.load(); } catch (_) {}
  }

  async function loadMp4() {
    const { data } = await apiFetch(`/video/presign?slug=${encodeURIComponent(slug)}`);
    if (!data || !data.url) throw new Error('No presign url');
    playUrl(data.url);
  }

  async function loadHls() {
    const { base, data } = await apiFetch(`/video/hls-token?slug=${encodeURIComponent(slug)}`);
    if (!data || !data.token) throw new Error('No hls token');
    const hlsUrl = `${base}/video/hls.m3u8?token=${encodeURIComponent(data.token)}`;
    prepareVideoAttrs();
    stripEmptySource();
    destroyHls();
    clearError();
    activeSrc = hlsUrl;

    if (canPlayNativeHls()) {
      // iPhone/Safari — как в attachVideoSource для Apple.
      if (video.getAttribute('src')) video.removeAttribute('src');
      video.src = hlsUrl;
      try { video.load(); } catch (_) {}
      return { type: 'hls-native', url: hlsUrl };
    }

    const Hls = await ensureHlsJs().catch(function () { return null; });
    if (Hls && Hls.isSupported()) {
      if (video.getAttribute('src')) video.removeAttribute('src');
      const hls = new Hls({
        enableWorker: false,
        autoStartLoad: true,
        lowLatencyMode: false,
        backBufferLength: 30,
        maxBufferLength: 60,
      });
      hlsInstance = hls;
      hls.on(Hls.Events.ERROR, function (_evt, info) {
        if (!info || !info.fatal || mp4FallbackTried) return;
        mp4FallbackTried = true;
        destroyHls();
        loadMp4().catch(function () {
          showError('Не удалось воспроизвести видео. Попробуйте обновить страницу.');
        });
      });
      hls.attachMedia(video);
      hls.loadSource(hlsUrl);
      return { type: 'hls-js', url: hlsUrl };
    }

    // Нет HLS — сразу MP4.
    await loadMp4();
    return { type: 'mp4', url: activeSrc };
  }

  function ensureOverlay() {
    let overlay = shell.querySelector('[data-landing-preview-start]');
    if (overlay) return overlay;

    const poster = video.getAttribute('poster') || '';
    overlay = document.createElement('button');
    overlay.type = 'button';
    overlay.className = 'landing-preview-start';
    overlay.setAttribute('data-landing-preview-start', '');
    overlay.setAttribute('aria-label', 'Смотреть видео');
    if (poster) overlay.style.backgroundImage = `url('${poster}')`;
    overlay.innerHTML =
      '<span class="landing-preview-start-action" aria-hidden="true">' +
        '<span class="landing-preview-start-icon"></span>' +
        '<span class="landing-preview-start-label">Смотреть первый урок</span>' +
      '</span>';
    shell.insertBefore(overlay, video.nextSibling);
    return overlay;
  }

  function requestPlay() {
    const playPromise = video.play && video.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(function () {
        // После жеста на iPhone controls достаточно.
      });
    }
  }

  async function startPlayback() {
    if (loadStarted) return;
    loadStarted = true;
    clearError();
    shell.classList.add('is-loading');
    const overlay = shell.querySelector('[data-landing-preview-start]');
    if (overlay) overlay.classList.add('is-loading');

    try {
      await loadHls();
      if (overlay) {
        overlay.classList.remove('is-loading');
        overlay.classList.add('is-hidden');
      }
      shell.classList.remove('is-loading');
      requestPlay();
    } catch (err) {
      console.error('[landing-preview-video] hls failed', err);
      try {
        await loadMp4();
        if (overlay) {
          overlay.classList.remove('is-loading');
          overlay.classList.add('is-hidden');
        }
        shell.classList.remove('is-loading');
        requestPlay();
      } catch (fallbackErr) {
        console.error('[landing-preview-video] mp4 failed', fallbackErr);
        loadStarted = false;
        if (overlay) overlay.classList.remove('is-loading');
        shell.classList.remove('is-loading');
        showError('Видео временно недоступно. Откройте урок в приложении Системы.');
      }
    }
  }

  video.addEventListener('error', function onVideoError() {
    if (!loadStarted || !activeSrc) return;
    // Нативный HLS на Apple упал → один раз пробуем MP4.
    if (!mp4FallbackTried && /hls\.m3u8/i.test(activeSrc)) {
      mp4FallbackTried = true;
      shell.classList.add('is-loading');
      loadMp4()
        .then(function () {
          shell.classList.remove('is-loading');
          requestPlay();
        })
        .catch(function () {
          showError('Не удалось воспроизвести видео. Попробуйте обновить страницу.');
        });
      return;
    }
    showError('Не удалось воспроизвести видео. Попробуйте обновить страницу.');
  });

  prepareVideoAttrs();
  video.preload = 'none';
  stripEmptySource();

  const overlay = ensureOverlay();
  overlay.addEventListener('click', function (ev) {
    ev.preventDefault();
    startPlayback();
  });
})();
