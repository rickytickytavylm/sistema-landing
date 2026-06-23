(function initLandingPreviewVideo() {
  'use strict';

  const shell = document.querySelector('[data-landing-preview]');
  if (!shell) return;

  const video = shell.querySelector('video');
  const slug = shell.dataset.videoSlug;
  if (!video || !slug) return;

  video.setAttribute('crossorigin', 'anonymous');

  const API_BASES = [
    'https://web-production-3cb7a.up.railway.app/api',
    'https://api.sistema-molodtsov.ru/api',
  ];

  function apiOrigin(base) {
    return String(base || '').replace(/\/api\/?$/u, '');
  }

  function showError(message) {
    shell.classList.add('has-error');
    let note = shell.querySelector('[data-landing-preview-error]');
    if (!note) {
      note = document.createElement('p');
      note.className = 'landing-preview-error';
      note.setAttribute('data-landing-preview-error', '');
      shell.appendChild(note);
    }
    note.textContent = message;
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

  function attachHls(src) {
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      return;
    }
    if (!window.Hls || !window.Hls.isSupported()) {
      throw new Error('HLS unsupported');
    }
    const hls = new window.Hls({ enableWorker: true });
    hls.loadSource(src);
    hls.attachMedia(video);
    hls.on(window.Hls.Events.ERROR, function (_, data) {
      if (data && data.fatal) showError('Не удалось загрузить видео. Попробуйте обновить страницу.');
    });
  }

  async function boot() {
    shell.classList.remove('has-error');
    shell.classList.add('is-loading');
    try {
      const { base, data: tokenData } = await apiFetch(`/video/hls-token?slug=${encodeURIComponent(slug)}`);
      const manifestPath = tokenData.manifest_path || '';
      if (!manifestPath) throw new Error('No manifest path');
      const manifestUrl = manifestPath.startsWith('http')
        ? manifestPath
        : `${apiOrigin(base)}${manifestPath}`;
      attachHls(manifestUrl);
    } catch (err) {
      try {
        const { data: mp4 } = await apiFetch(`/video/presign?slug=${encodeURIComponent(slug)}`);
        if (mp4 && mp4.url) {
          video.src = mp4.url;
        } else {
          throw new Error('No presign url');
        }
      } catch (fallbackErr) {
        console.error('[landing-preview-video]', err, fallbackErr);
        showError('Видео временно недоступно. Откройте урок в приложении Системы.');
      }
    } finally {
      shell.classList.remove('is-loading');
    }
  }

  boot();
})();
