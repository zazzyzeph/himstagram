import { SettingsMenu } from "./modules/SettingsMenu.js";
import { SettingsGroup } from "./modules/SettingsGroup.js";

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
});
