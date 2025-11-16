class SettingsMenu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.classList.add("moduleLoaded");
    const options = this.querySelector("#options");

    this.addEventListener("click", (e) => {
      e.preventDefault();
      this.classList.toggle("open");
    });

    options.addEventListener("click", (e) => {
      // don't let the click events bubble up to the gear-anchor (which would otherwise close the menu)
      e.stopPropagation();
    });

  }
}

export { SettingsMenu }
