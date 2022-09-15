export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
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
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onchangeFont);
    // document 에 이벤트리스너를 붙이면 this 가 documnet 를 가르킨다.
    // 실제 이벤트가 일어나서 가르키길 바라는 곳은 keyboardEl 이다.
    // 이 문제를 해결하는 방식은 불러오는 함수를 화살표함수로 만들거나
    // this.#onKeyDown.bind(this), this.#onKeyUp.bind(this) 같은 형태로 불러오는 것이다.
    document.addEventListener("keydown", this.#onKeyDown);
    document.addEventListener("keyup", this.#onKeyUp);
    this.#inputEl.addEventListener("input", this.#onInput);
  }
  #onInput = (e) => {
    e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  };

  #onKeyDown = (e) => {
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)
    );
    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.add("active");
  };

  #onKeyUp = (e) => {
    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.remove("active");
  };

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
