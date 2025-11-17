class SettingsMenu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.open = false;
    const gearAnchor = this.querySelector('.gearAnchor');
    const closeMenuButton = this.querySelector('.closeMenuButton');
    const options = this.querySelector("#options");

    const closeMenu = () => {
      this.classList.remove("open");
      this.open = false;
      gearAnchor.setAttribute('aria-expanded', 'false');
    }

    const closeMenuIfNotClicked = (e) => {
      if (e.target.closest('settings-menu') == null){
        closeMenu();
      };
    }

    const closeMenuOnEsc = (e) => {
      if (e.key == 'Escape') {
        closeMenu();
      }
    }

    const menuControlAddEventListener = (element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        this.classList.toggle("open");
        this.open = !this.open;
        gearAnchor.setAttribute('aria-expanded', this.open.toString());
        if (this.open) {
          document.addEventListener("click", closeMenuIfNotClicked(e));
          document.addEventListener("keyup", closeMenuOnEsc(e));
        }
        else {
          document.removeEventListener("click", closeMenuIfNotClicked);
          document.removeEventListener("keyup", closeMenuOnEsc);
        }
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
