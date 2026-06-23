(function initLandingPreviewVideo() {
  'use strict';

  const shell = document.querySelector('[data-landing-preview]');
  if (!shell) return;

  const video = shell.querySelector('video');
  const slug = shell.dataset.videoSlug;
  if (!video || !slug) return;

  const API_BASES = [
    'https://api.sistema-molodtsov.ru/api',
    'https://web-production-3cb7a.up.railway.app/api',
  ];

  async function apiFetch(path) {
    let lastError = null;
    for (const base of API_BASES) {
      try {
        const response = await fetch(`${base}${path}`, { credentials: 'omit' });
        if (!response.ok) {
          lastError = new Error(`HTTP ${response.status}`);
          continue;
        }
        return response.json();
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
  }

  async function boot() {
    shell.classList.add('is-loading');
    try {
      const tokenData = await apiFetch(`/video/hls-token?slug=${encodeURIComponent(slug)}`);
      const manifestPath = tokenData.manifest_path || '';
      const manifestUrl = manifestPath.startsWith('http')
        ? manifestPath
        : `${API_BASES[0]}${manifestPath}`;
      attachHls(manifestUrl);
    } catch (err) {
      try {
        const mp4 = await apiFetch(`/video/presign?slug=${encodeURIComponent(slug)}`);
        if (mp4 && mp4.url) video.src = mp4.url;
      } catch (fallbackErr) {
        console.error('[landing-preview-video]', fallbackErr);
      }
    } finally {
      shell.classList.remove('is-loading');
    }
  }

  boot();
})();
