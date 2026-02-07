class SettingsGroup extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {

    const form = this.querySelector('form');
    const groupTitle = form.dataset.group;
    const radios = form.querySelectorAll('input');

    for (const radio of radios){
      if (radio.value == window.siteSettings[groupTitle]){
        radio.checked = true
        continue;
      }
      radio.checked = false;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    form.addEventListener("change", (e) => {
      const value = e.target.value;
      if (groupTitle == 'animations') {
        location.reload();
      }
      window.siteSettings[groupTitle] = value;
      document.documentElement.dataset[groupTitle] = value;
      window.localStorage.setItem("siteSettings", JSON.stringify(window.siteSettings))
    })

  }
}

export { SettingsGroup }
