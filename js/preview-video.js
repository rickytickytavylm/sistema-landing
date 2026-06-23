(function initLandingPreviewVideo() {
  'use strict';

  const shell = document.querySelector('[data-landing-preview]');
  if (!shell) return;

  const video = shell.querySelector('video');
  const slug = shell.dataset.videoSlug;
  if (!video || !slug) return;

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

  async function boot() {
    shell.classList.remove('has-error');
    shell.classList.add('is-loading');
    try {
      const origin = await resolveApiOrigin();
      video.removeAttribute('crossorigin');
      video.src = `${origin}/api/video/preview-mp4?slug=${encodeURIComponent(slug)}`;
      video.load();
    } catch (err) {
      console.error('[landing-preview-video]', err);
      showError('Видео временно недоступно. Откройте урок в приложении Системы.');
    } finally {
      shell.classList.remove('is-loading');
    }
  }

  video.addEventListener('error', function onVideoError() {
    if (!video.currentSrc) return;
    showError('Не удалось воспроизвести видео. Попробуйте обновить страницу.');
  }, { once: true });

  boot();
})();
