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

  let loadAttempt = 0;

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

  function playSrc(src) {
    clearError();
    video.removeAttribute('crossorigin');
    const source = video.querySelector('[data-landing-preview-source]');
    if (source) {
      source.src = src;
    } else {
      video.src = src;
    }
    video.load();
  }

  async function loadProxy() {
    const origin = await resolveApiOrigin();
    playSrc(`${origin}/api/video/preview-mp4?slug=${encodeURIComponent(slug)}`);
  }

  async function loadPresign() {
    const { data } = await apiFetch(`/video/presign?slug=${encodeURIComponent(slug)}`);
    if (!data || !data.url) throw new Error('No presign url');
    playSrc(data.url);
  }

  async function boot() {
    shell.classList.add('is-loading');
    loadAttempt += 1;
    try {
      await loadProxy();
    } catch (err) {
      console.error('[landing-preview-video] proxy failed', err);
      try {
        await loadPresign();
      } catch (fallbackErr) {
        console.error('[landing-preview-video] presign failed', fallbackErr);
        showError('Видео временно недоступно. Откройте урок в приложении Системы.');
      }
    } finally {
      shell.classList.remove('is-loading');
    }
  }

  video.addEventListener('error', function onVideoError() {
    if (!video.currentSrc) return;
    if (loadAttempt < 2) {
      loadAttempt += 1;
      shell.classList.add('is-loading');
      loadPresign()
        .catch(function () {
          showError('Не удалось воспроизвести видео. Попробуйте обновить страницу.');
        })
        .finally(function () {
          shell.classList.remove('is-loading');
        });
      return;
    }
    showError('Не удалось воспроизвести видео. Попробуйте обновить страницу.');
  });

  boot();
})();
