import { SettingsMenu } from "./modules/SettingsMenu.js";
import { SettingsGroup } from "./modules/SettingsGroup.js";
import { PostWebmentions } from "./modules/PostWebmentions.js";
import { VideoLazyLoader } from "./modules/VideoLazyLoader.js";
import { BandcampPlayer } from "./modules/BandcampPlayer.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!window.siteSettings) {
    window.siteSettings = {
      'theme': 'default',
      'contrast': 'default',
      'animations': 'default'
    };
  }
  customElements.define("settings-menu", SettingsMenu);
  customElements.define("settings-group", SettingsGroup);
  customElements.define("post-webmentions", PostWebmentions);
  customElements.define('bandcamp-player', BandcampPlayer);
  if (!window.reduceMotion && document.documentElement.dataset.animations != 'none'){
    customElements.define('video-lazy-loader', VideoLazyLoader);
  }
});
