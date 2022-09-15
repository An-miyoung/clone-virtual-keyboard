export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
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
    this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown);
    // 마우스 업은 해당 키보드위에서 뿐만 아니라 도큐먼트 내부 어디서든 일어날 수 있으므로
    document.addEventListener("mouseup", this.#onMouseUp);
  }

  #onMouseUp = (e) => {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = e.target.closest("div.key");
    const isActve = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val;
    if (isActve && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (isActve && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActve && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    // 누른 키보드가 아니라 다른 키보드위에서 마우스업을 하는 경우가 있어. e.target 을 쓰지 않음
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  };

  #onMouseDown = (e) => {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    e.target.closest("div.key")?.classList.add("active");
  };

  #onInput = (e) => {
    e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  };

  #onKeyDown = (e) => {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)
    );
    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.add("active");
  };

  #onKeyUp = (e) => {
    if (this.#mouseDown) return;
    this.#keyPress = false;
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
