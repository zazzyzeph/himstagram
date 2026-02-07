class VideoLazyLoader extends HTMLElement {
  constructor() {
    super();
    this.wasInViewport = false;
    this.videoEl = null;
  }
  connectedCallback() {
    const imgEl = this.querySelector('img');
    const videoSrc = this.getAttribute('data-videosrc');

    if (!imgEl || !videoSrc){
      return false;
    }

    for (const attr of ['src', 'alt']){
      if (!imgEl.hasAttribute(attr)){
        return false;
      }
    }

    this.setupObserver(imgEl, videoSrc);

  }
  setupObserver(imgEl, videoSrc) {
    const options = {
      root: null, // browser viewport is root
      threshold: 0.5 // act when half the element comes in/out of view
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting){
          if (!this.videoEl && this.wasInViewport == false) {
            this.replaceImgWithVideo(imgEl, videoSrc);
            this.wasInViewport = true;
          }
          if (this.videoEl && this.videoEl.paused){
            this.videoEl.play();
            continue;
          }
        }
        if (!entry.isIntersecting && this.wasInViewport){
          if (this.videoEl && !this.videoEl.paused) {
            this.videoEl.pause();
            continue;
          }
        }
      }
    }, options);

    observer.observe(this);
  }
  replaceImgWithVideo(imgEl, videoSrc){
    const poster = imgEl.getAttribute('src');
    const altText = imgEl.getAttribute('alt');
    const cssClasses = imgEl.getAttribute('class') ?? '';
    this.innerHTML = `
      <div class="prodvid-container ${cssClasses}" role="img" aria-label="${altText}">
        <video preload="auto" muted loop playsinline poster="${poster}" tabindex="-1" aria-hidden="true">
          <source src="${videoSrc}" type="video/mp4"/>
          <track kind="captions" label="captions" srclang="en" src="data:text/vtt,WEBVTT%0A%0A1%0A00%3A00.000%20--%3E%2000%3A05.000%0A%5Bno%20audio%5D">
        </video>
      </div>
    `;
    this.videoEl = this.querySelector('video');
    if (document.documentElement.dataset.animations != 'none'){
      this.videoEl.pause();
    }
  }
}

export { VideoLazyLoader };
