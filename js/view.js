import data from "./data.js";
class View {
  #el = document.querySelector(".all-boxes");
  #arrayModifier = document.querySelector("#select-array-length");
  #speedModifier = document.querySelector("#select-sorting-speed");
  #arrayCreator = document.querySelector(".create-new-array");
  #bubble = document.querySelector("#bubble");
  #insert = document.querySelector("#insert");
  #quickSort = document.querySelector("#quick");
  #merge = document.querySelector("#merge");
  #heap = document.querySelector("#heap");
  #selection = document.querySelector("#selection");

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
    this.#arrayCreator.addEventListener(
      "click",
      function () {
        data.createAndSetCurArray(Number(this.#arrayModifier.value));
        this.renderNewArray(data.getCurArray());
      }.bind(this)
    );
    this.#bubble.addEventListener("click", data.bubbleSort.bind(data, this));
    this.#insert.addEventListener("click", data.insertSort.bind(data, this));
    this.#selection.addEventListener(
      "click",
      data.selectionSort.bind(data, this)
    );

    console.log(data.getCurArray());

    this.#quickSort.addEventListener(
      "click",
      data.runQuickSort.bind(data, this)
    );
    this.#heap.addEventListener("click", data.runHeapSort.bind(data, this));
    this.#merge.addEventListener("click", data.runMergeSort.bind(data, this));
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
    // console.log(window.innerHeight - 10 - document.querySelector());
    // if (!isThisMerge) {
    this.#el.innerHTML = "";
    // array.forEach((val, i, array) => {
    for (const [i, val] of array.entries()) {
      const html = `<div style=" width: ${
        (window.innerWidth - 20) / array.length / 1.1
      }px; height: ${val / 1.5}rem; transform:translateX(${i * 110}%); ${
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
