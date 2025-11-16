class ColorScheme extends HTMLElement {
  constructor() {
    super();
  }
  const setColorSchemePref = (schemePref) => {
    window.localStorage.setItem("schemePref", schemePref);
    document.documentElement.dataset.schemePref = schemePref;
  };

  let schemePref = "dark";
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    schemePref = "light";
  }
  if (document.documentElement.dataset.schemePref) {
    schemePref = document.documentElement.dataset.schemePref;
  }

  const schemePrefToggleButton = document.querySelector(
    "#schemePrefToggleButton",
  );
  if (schemePrefToggleButton) {
    schemePrefToggleButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (schemePref == "dark") {
        schemePref = "light";
      } else {
        schemePref = "dark";
      }
      setColorSchemePref(schemePref);
    });
  }
}
customElements.define("color-scheme", ColorScheme);
