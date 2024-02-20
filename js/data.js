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
    // console.log(this.#curArray);
    for (const _ of this.#curArray) {
      // await new Promise((resolve) =>
      //   setTimeout(function () {
      //     resolve();
      //   }, 200)
      // );
      for (const [i, a] of this.#curArray.entries()) {
        const b = this.#curArray[i + 1];
        if (a - b > 0) {
          await new Promise((resolve) =>
            setTimeout(function () {
              resolve();
            }, 150)
          );
          this.#curArray[i] = b;
          this.#curArray[i + 1] = a;
          // console.log(this.#curArray);
          view.switchTwoArrayValues(i, i + 1);
        }
      }
    }
    // console.log(this.#curArray);
    await view.renderSortedArray();
  }
  async insertSort(view) {
    // console.log(this.#curArray);
    for (const [i, el] of this.#curArray.entries()) {
      // console.log(el);
      let position = -1; //INVALID POSITION TO START OFF
      for (const [index, elBefore] of Array.from(this.#curArray.entries())
        .filter((element) => element[0] < i)
        .reverse()) {
        // console.log(el, elBefore, index);
        if (el < elBefore) {
          position = index;
          continue;
        }
      }
      if (position >= 0) {
        await new Promise((resolve) =>
          setTimeout(function () {
            resolve();
          }, 500)
        );
        this.insert(el, i, position, this.#curArray);
        // console.log(this.#curArray);
        await view.renderInsertAnimation(i, position);
      }
    }
    await view.renderSortedArray();
    return this.#curArray;
  }

  insert(value, previousIndex, newIndex, array) {
    // console.log(array);
    const biggerSmaller = newIndex - previousIndex;
    if (biggerSmaller < 0) {
      // console.log("smaller");
      const middleElements = array.filter(
        (el, i) => i >= newIndex && i < previousIndex
      );
      // console.log(middleElements, newIndex, previousIndex);

      // console.log(middleElements);
      let a = 0;
      for (let j = newIndex + 1; j <= previousIndex; j++) {
        array[j] = middleElements[a];
        a++;
      }
      array[newIndex] = value;
    }

    return array;
  }
  async runQuickSort(view) {
    await this.quickSort(0, this.#curArray.length - 1, view);
    await view.renderSortedArray();
  }
  async quickSort(startIndex, endIndex, view) {
    if (endIndex <= startIndex) return;
    const pivot = await this.createPartition(
      startIndex,
      endIndex,
      this.#curArray,
      view
    );
    await this.quickSort(startIndex, pivot - 1, view);
    await this.quickSort(pivot + 1, endIndex, view);
  }
  async createPartition(start, end, array, view) {
    const pivot = array[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
      if (array[j] < pivot) {
        i++;
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        await new Promise((resolve) =>
          setTimeout(function () {
            resolve();
          }, 12)
        );
        console.log(view);
        console.log(i, j);
        await view.switchTwoArrayValues(i, j);
      }
    }
    i++;
    const temp = array[i];
    array[i] = array[end];
    array[end] = temp;
    await new Promise((resolve) =>
      setTimeout(function () {
        resolve();
      }, 500)
    );
    console.log(i, end);
    await view.switchTwoArrayValues(i, end);

    return i;
  }
  isSorted(array) {
    const sortedArray = [...array].sort();
    return sortedArray.every((val, i) => val === array[i]);
  }
}

export default new Data();
