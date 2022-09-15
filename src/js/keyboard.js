export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#swichEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onchangeFont);
  }

  #onChangeTheme = (e) => {
    // html 을 handling 하기 위해 documentElement 를 사용
    document.documentElement.setAttribute(
      "theme",
      e.target.checked ? "dark-mode" : ""
    );
  };

  #onchangeFont = (e) => {
    document.body.style.fontFamily = e.target.value;
  };
}
