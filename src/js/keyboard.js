export class Keyboard {
  #swichEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#swichEl = document.getElementById("switch");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", (e) => {
      // html 을 handling 하기 위해 documentElement 를 사용
      document.documentElement.setAttribute(
        "theme",
        e.target.checked ? "dark-mode" : ""
      );
    });
  }
}
