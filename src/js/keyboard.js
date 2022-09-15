export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#swichEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onchangeFont);
    document.addEventListener("keydown", (e) => {
      this.#inputGroupEl.classList.toggle(
        "error",
        /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)
      );
      this.#keyboardEl
        .querySelector(`[data-code=${e.code}]`)
        ?.classList.add("active");
    });
    document.addEventListener("keyup", (e) => {
      this.#keyboardEl
        .querySelector(`[data-code=${e.code}]`)
        ?.classList.remove("active");
    });
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
