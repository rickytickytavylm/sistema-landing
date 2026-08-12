(function initLandingPreviewVideo() {
  'use strict';

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
  let triedProxyFallback = false;

  function isAppleTouchVideoDevice() {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    return /iPad|iPhone|iPod/i.test(ua) ||
      (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
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

  async function resolveApiOrigin() {
    let lastError = null;
    for (const base of API_BASES) {
      try {
        const response = await fetch(`${base}/health`, { credentials: 'omit', mode: 'cors' });
        if (!response.ok) {
          lastError = new Error(`HTTP ${response.status}`);
          continue;
        }
        return apiOrigin(base);
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
    // Без crossorigin: иначе Safari требует CORS у Object Storage.
    video.removeAttribute('crossorigin');
  }

  function playSrc(src) {
    clearError();
    activeSrc = String(src || '');
    prepareVideoAttrs();
    const source = video.querySelector('[data-landing-preview-source]');
    if (source) {
      source.removeAttribute('src');
      source.remove();
    }
    video.src = activeSrc;
    try {
      video.load();
    } catch (_) {}
  }

  async function loadPresign() {
    const { data } = await apiFetch(`/video/presign?slug=${encodeURIComponent(slug)}`);
    if (!data || !data.url) throw new Error('No presign url');
    playSrc(data.url);
  }

  async function loadProxyRedirect() {
    const origin = await resolveApiOrigin();
    playSrc(`${origin}/api/video/preview-mp4?slug=${encodeURIComponent(slug)}`);
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

  async function startPlayback() {
    if (loadStarted) return;
    loadStarted = true;
    clearError();
    shell.classList.add('is-loading');
    const overlay = shell.querySelector('[data-landing-preview-start]');
    if (overlay) overlay.classList.add('is-loading');

    try {
      // Как в приложении/shorts: сначала прямой signed URL (Yandex, РФ).
      await loadPresign();
      if (overlay) {
        overlay.classList.remove('is-loading');
        overlay.classList.add('is-hidden');
      }
      shell.classList.remove('is-loading');

      // На iPhone autoplay после жеста часто ок; если нет — остаются controls.
      const playPromise = video.play && video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(function () {
          if (isAppleTouchVideoDevice()) return;
          if (overlay) {
            overlay.classList.remove('is-hidden');
            loadStarted = false;
          }
        });
      }
    } catch (err) {
      console.error('[landing-preview-video] start failed', err);
      try {
        await loadProxyRedirect();
        if (overlay) {
          overlay.classList.remove('is-loading');
          overlay.classList.add('is-hidden');
        }
        shell.classList.remove('is-loading');
        if (video.play) video.play().catch(function () {});
      } catch (fallbackErr) {
        console.error('[landing-preview-video] proxy failed', fallbackErr);
        loadStarted = false;
        if (overlay) overlay.classList.remove('is-loading');
        shell.classList.remove('is-loading');
        showError('Видео временно недоступно. Откройте урок в приложении Системы.');
      }
    }
  }

  video.addEventListener('error', function onVideoError() {
    if (!loadStarted || !activeSrc) return;
    if (!triedProxyFallback && /yandexcloud\.net/i.test(activeSrc)) {
      triedProxyFallback = true;
      shell.classList.add('is-loading');
      loadProxyRedirect()
        .then(function () {
          shell.classList.remove('is-loading');
          if (video.play) video.play().catch(function () {});
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
  // Пустой <source> на iOS даёт MEDIA_ERR сразу — убираем до клика.
  const emptySource = video.querySelector('[data-landing-preview-source]');
  if (emptySource && !emptySource.getAttribute('src')) emptySource.remove();

  const overlay = ensureOverlay();
  overlay.addEventListener('click', function (ev) {
    ev.preventDefault();
    startPlayback();
  });
})();
