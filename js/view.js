import data from "./data.js";
class View {
  #el = document.querySelector(".all-boxes");
  #arrayModifier = document.querySelector("#select-array-length");
  #arrayCreator = document.querySelector(".create-new-array");
  #bubble = document.querySelector("#bubble");
  allBoxes;
  constructor(themeColor = undefined) {
    this.themeColor = themeColor;
    this.#arrayModifier.addEventListener(
      "change",
      function () {
        data.modifyArraySize(Number(this.#arrayModifier.value));
        this.renderNewArray(data.getCurArray());
      }.bind(this)
    );
    this.#arrayCreator.addEventListener(
      "click",
      function () {
        data.createAndSetCurArray(Number(this.#arrayModifier.value));
        this.renderNewArray(data.getCurArray());
      }.bind(this)
    );
    this.#bubble.addEventListener("click", data.bubbleSort.bind(data, this));
  }
  renderNewArray(array) {
    this.#el.innerHTML = "";
    array.forEach((val, i, array) => {
      const html = `<div style=" width: ${
        (window.innerWidth / array.length -
          (window.innerWidth / array.length) * 0.1) /
        10
      }rem; height: ${val / 1.5}rem; transform:translateX(${i * 110}%); ${
        this.themeColor && this.themeColor !== "#3298df"
          ? `background-color: ${this.themeColor}`
          : ""
      }" class="box">&nbsp;</div>`;
      // console.log("DONE");
      this.#el.insertAdjacentHTML("beforeend", html);
      this.allBoxes = [...document.querySelectorAll(".box")];
      // console.log(this.allBoxes);
    });
  }
  async switchBubbleArray(curValIndex, nextValIndex) {
    const curValElement = this.allBoxes[curValIndex];
    const nextValElement = this.allBoxes[nextValIndex];
    // console.log(curValElement, nextValElement);
    this.allBoxes[curValIndex] = this.allBoxes[nextValIndex];
    this.allBoxes[nextValIndex] = curValElement;
    curValElement.classList.add("active");
    await new Promise((resolve) =>
      setTimeout(function () {
        const curValTransform = curValElement.style.transform;
        curValElement.style.transform = nextValElement.style.transform;
        nextValElement.style.transform = curValTransform;
        curValElement.classList.remove("active");
        resolve();
      }, 100)
    );
  }
}

export default View;
