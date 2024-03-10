import data from "./data.js";
class View {
  #el = document.querySelector(".all-boxes");
  #arrayModifier = document.querySelector("#select-array-length");
  #speedModifier = document.querySelector("#select-sorting-speed");
  #arrayCreator = document.querySelector(".create-new-array");
  #bubbles = document.querySelectorAll(".bubble");
  #inserts = document.querySelectorAll(".insert");
  #quickSorts = document.querySelectorAll(".quick");
  #merges = document.querySelectorAll(".merge");
  #heaps = document.querySelectorAll(".heap");
  #selections = document.querySelectorAll(".selection");
  #responsiveButton = document.querySelector(".responsive-button-menu");
  #responsiveButtonX = document.querySelector(".responsive-button-x");
  #responsiveModule = document.querySelector(".responsive-module");
  #sortingSpeed = 500;
  allBoxes;
  constructor(themeColor = "#3298df") {
    this.themeColor = themeColor;
    this.#arrayModifier.addEventListener(
      "change",
      function () {
        data.modifyArraySize(Number(this.#arrayModifier.value));
        this.renderNewArray(data.getCurArray());
      }.bind(this)
    );
    this.#speedModifier.addEventListener(
      "change",
      function () {
        this.#sortingSpeed = 1000 - Number(this.#speedModifier.value);
        console.log(this.#sortingSpeed);
      }.bind(this)
    );
    this.#responsiveButtonX.addEventListener(
      "click",
      function () {
        this.switchResponsiveModules(
          this.#responsiveButtonX,
          this.#responsiveButton
        );
        this.disableResponsiveModule();
      }.bind(this)
    );
    this.#responsiveButton.addEventListener(
      "click",
      function () {
        this.switchResponsiveModules(
          this.#responsiveButton,
          this.#responsiveButtonX
        );
        this.enableResponsiveModule();
      }.bind(this)
    );
    this.#responsiveModule.addEventListener(
      "click",
      function (e) {
        if (e.target.closest(".selection-button")) {
          this.switchResponsiveModules(
            this.#responsiveButtonX,
            this.#responsiveButton
          );
          this.disableResponsiveModule();
        }
      }.bind(this)
    );
    this.#arrayCreator.addEventListener(
      "click",
      function () {
        data.createAndSetCurArray(Number(this.#arrayModifier.value));
        this.renderNewArray(data.getCurArray());
      }.bind(this)
    );
    this.#bubbles.forEach((button) =>
      button.addEventListener("click", data.bubbleSort.bind(data, this))
    );
    this.#inserts.forEach((button) =>
      button.addEventListener("click", data.insertSort.bind(data, this))
    );
    this.#selections.forEach((button) =>
      button.addEventListener("click", data.selectionSort.bind(data, this))
    );

    console.log(data.getCurArray());

    this.#quickSorts.forEach((button) =>
      button.addEventListener("click", data.runQuickSort.bind(data, this))
    );
    this.#heaps.forEach((button) =>
      button.addEventListener("click", data.runHeapSort.bind(data, this))
    );
    this.#merges.forEach((button) =>
      button.addEventListener("click", data.runMergeSort.bind(data, this))
    );
  }
  switchResponsiveModules(switchFrom, switchTo) {
    switchFrom.classList.add("hidden");
    switchTo.classList.remove("hidden");
    console.log("clicked");
  }
  enableResponsiveModule() {
    this.#responsiveModule.classList.remove("hidden");
  }
  disableResponsiveModule() {
    this.#responsiveModule.classList.add("hidden");
  }
  getAllBoxes() {
    return this.allBoxes;
  }
  getSortingSpeed() {
    return this.#sortingSpeed;
  }
  disableDisruptiveModules() {
    document
      .querySelectorAll("*")
      .forEach((el) => (el.style.pointerEvents = "none"));
  }
  enableAllModules() {
    document
      .querySelectorAll("*")
      .forEach((el) => (el.style.pointerEvents = "all"));
  }
  renderNewArray(array, boxArray = false) {
    console.log(window.innerWidth / array.length);
    console.log(this.#el.style);
    console.log(
      window.innerHeight -
        20 -
        document.querySelector(".main-nav").style.height -
        document.querySelector(".base-for-boxes").style.height -
        (75 - 23)
    );
    // if (!isThisMerge) {
    this.#el.innerHTML = "";
    const isSafari =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
      /iPad|iPhone|iPod/.test(navigator.userAgent);
    const windowWidth = isSafari ? screen.width : window.innerWidth;
    const windowHeight = isSafari ? screen.height : window.innerHeight;

    // array.forEach((val, i, array) => {
    for (const [i, val] of array.entries()) {
      const html = `<div style=" width: ${
        (windowWidth - (isSafari ? 75 : 20)) /
        array.length /
        1.1 /
        (isSafari ? 1.1 : 1)
      }px; height: ${
        (windowHeight -
          20 -
          document.querySelector(".main-nav").style.height -
          document.querySelector(".base-for-boxes").style.height -
          (500 - val)) /
        1.5
      }px; transform:translateX(${i * 110}%); ${
        this.themeColor && this.themeColor !== "#3298df"
          ? `background-color: ${this.themeColor}`
          : ""
      }" class="box">&nbsp;</div>`;
      // console.log("DONE");
      this.#el.insertAdjacentHTML("beforeend", html);

      this.allBoxes = [...document.querySelectorAll(".box")];

      // console.log(this.allBoxes);
    }
  }
  async switchTwoArrayValues(curValIndex, nextValIndex) {
    console.log(curValIndex, nextValIndex);
    const curValElement = this.allBoxes[curValIndex];
    const nextValElement = this.allBoxes[nextValIndex];
    console.log(curValElement, nextValElement);
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
      }, this.#sortingSpeed)
    );
  }
  async renderInsertAnimation(oldIndex, newIndex) {
    this.allBoxes[oldIndex].classList.add("active");
    await new Promise((resolve) => {
      setTimeout(
        function () {
          this.allBoxes[oldIndex].style.transform =
            this.allBoxes[newIndex].style.transform;
          const intermidiateBoxes = this.allBoxes.filter(
            (box, i) => i >= newIndex && i < oldIndex
          );
          console.log(oldIndex, newIndex, intermidiateBoxes);
          for (const [i, box] of intermidiateBoxes.entries()) {
            console.log();
            box.style.transform = `translateX(${
              Number.parseInt(
                box.style.transform.replace("translateX(", "").replace(")", "")
              ) + 110
            }%)`;
          }

          //MOVE THE CURRENT ELEMENT TO THE NEW INDEX LOCATION

          this.allBoxes[oldIndex].classList.remove("active");

          data.insert(
            this.allBoxes[oldIndex],
            oldIndex,
            newIndex,
            this.allBoxes
          );
          resolve();
        }.bind(this),
        this.#sortingSpeed
      );
    });
  }

  // async runMergeAnimation(indexTransformed, val) {
  //   console.log(this.allBoxes[indexTransformed], indexTransformed);
  //   this.allBoxes[indexTransformed].classList.add("active");
  //   await new Promise((resolve) => {
  //     setTimeout(
  //       function () {
  //         // Assuming val contains the transformation information
  //         console.log(val.style.transform.startsWith("translateX"));

  //         this.allBoxes[indexTransformed].style.transform = val.style.transform; //This code causes the problem

  //         this.allBoxes[indexTransformed].classList.remove("active");
  //         // val.classList.remove("active");

  //         resolve();
  //       }.bind(this),
  //       2
  //     );
  //   });
  // }

  async runMergeAnimation(indexTransformed, array) {
    console.log(this.allBoxes[indexTransformed], indexTransformed);
    this.allBoxes[indexTransformed].classList.add("active");
    await new Promise((resolve) => {
      setTimeout(
        async function () {
          // Assuming val contains the transformation information

          // console.log(
          //   this.allBoxes[indexTransformed].style.transform ===
          //     `translateX(${indexTransformed * 110}%)`
          // );
          // this.allBoxes[indexTransformed].style.transform = `translateX(${
          //   indexTransformed * 110
          // }%)`; //This code causes the problem
          // this.allBoxes[indexTransformed].style.height = val.style.height;

          // console.log(`Animated box to index(${indexTransformed})`);

          this.renderNewArray(array);

          // await new Promise((resolve) => setTimeout(resolve, 0)); // This line forces the DOM updates to flush

          this.allBoxes[indexTransformed].classList.remove("active");
          // val.classList.remove("active");

          resolve();
        }.bind(this),
        this.#sortingSpeed
      );
    });
  }

  async renderSortedArray() {
    for (const box of this.allBoxes) {
      box.style.backgroundColor = "purple";
    }
    await new Promise((resolve) =>
      setTimeout(
        function () {
          for (const box of this.allBoxes) {
            box.style.backgroundColor = this.themeColor;
          }
          console.log("Done");
          resolve();
        }.bind(this),
        1000
      )
    );
  }
}

export default View;
