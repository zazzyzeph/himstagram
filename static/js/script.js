import { SettingsMenu } from "./modules/SettingsMenu.js";
import { SettingsGroup } from "./modules/SettingsGroup.js";

document.addEventListener("DOMContentLoaded", () => {
  customElements.define("settings-menu", SettingsMenu);
  customElements.define("settings-group", SettingsGroup);
});
