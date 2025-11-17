class SettingsMenu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.classList.add("moduleLoaded");
    this.open = false;
    const gearAnchor = this.querySelector('.gearAnchor');
    const closeMenuButton = this.querySelector('.closeMenuButton');
    const options = this.querySelector("#options");

    const menuControlAddEventListener = (element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        this.classList.toggle("open");
        this.open = !this.open;
        gearAnchor.setAttribute('aria-expanded', this.open.toString());
      });
    }

    for (const menuControl of [gearAnchor, closeMenuButton]) {
      menuControlAddEventListener(menuControl);
    }

    options.addEventListener("click", (e) => {
      // don't let the click events bubble up to the gearAnchor (which would otherwise close the menu)
      e.stopPropagation();
    });

  }
}

export { SettingsMenu }
