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
  bubbleSort(view) {
    console.log(this.#curArray);
    for (const _ of this.#curArray) {
      this.#curArray.forEach((a, i, array) => {
        const b = array[i + 1];
        if (a - b > 0) {
          array[i] = b;
          array[i + 1] = a;
          view.switchBubbleArray(i, i + 1);
        }
      });
    }
    console.log(this.#curArray);
  }
}

export default new Data();
