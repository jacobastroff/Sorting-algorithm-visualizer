class Data {
  #curArray;
  createAndSetCurArray(arraySize) {
    this.#curArray = Array.from(
      new Array(arraySize),
      () => Math.floor(Math.random() * 75) + 1
    );
  }
  setCurArray(array) {
    this.#curArray = array;
  }
  getCurArray() {
    return this.#curArray;
  }
  modifyArraySize(arraySize) {
    while (this.#curArray.length !== arraySize) {
      if (this.#curArray.length > arraySize) {
        this.#curArray.splice(
          Math.floor(Math.random() * this.#curArray.length),
          1
        );
      } else {
        this.#curArray.push(Math.floor(Math.random() * 75) + 1);
      }
      if (this.#curArray.length === arraySize) break;
    }
  }
  async bubbleSort(view) {
    console.log(this.#curArray);
    for (const _ of this.#curArray) {
      // await new Promise((resolve) =>
      //   setTimeout(function () {
      //     resolve();
      //   }, 200)
      // );
      for (const [i, a] of this.#curArray.entries()) {
        await new Promise((resolve) =>
          setTimeout(function () {
            resolve();
          }, 100)
        );
        const b = this.#curArray[i + 1];
        if (a - b > 0) {
          this.#curArray[i] = b;
          this.#curArray[i + 1] = a;
          console.log(this.#curArray);
          view.switchBubbleArray(i, i + 1);
        }
      }
    }
    console.log(this.#curArray);
  }
}

export default new Data();
