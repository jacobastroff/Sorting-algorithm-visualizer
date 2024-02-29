class Data {
  #curArray;
  delay(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
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
    view.disableDisruptiveModules();
    for (const _ of this.#curArray) {
      const delayTime = view.getSortingSpeed() / 2;

      // await new Promise((resolve) =>
      //   setTimeout(function () {
      //     resolve();
      //   }, 200)
      // );
      for (const [i, a] of this.#curArray.entries()) {
        const delayTime = view.getSortingSpeed() / 2;

        const b = this.#curArray[i + 1];
        if (a - b > 0) {
          await new Promise((resolve) =>
            setTimeout(function () {
              resolve();
            }, delayTime)
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
    view.enableAllModules();
  }
  async insertSort(view) {
    // console.log(this.#curArray);
    const delayTime = view.getSortingSpeed() / 2;
    view.disableDisruptiveModules();

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
          }, delayTime)
        );
        this.insert(el, i, position, this.#curArray);
        // console.log(this.#curArray);
        await view.renderInsertAnimation(i, position);
      }
    }
    await view.renderSortedArray();
    view.enableAllModules();
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
    view.enableAllModules();
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
    const delayTime = view.getSortingSpeed() / 2;
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
          }, delayTime)
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
      }, delayTime)
    );
    console.log(i, end);
    await view.switchTwoArrayValues(i, end);

    return i;
  }

  isSorted(array) {
    const sortedArray = [...array].sort();
    return sortedArray.every((val, i) => val === array[i]);
  }
  async runMergeSort(view) {
    const boxArray = view.getAllBoxes();
    const startIndex = 0;
    const endIndex = this.#curArray.length - 1;
    console.log("HELLO");

    await this.mergeSortHelper(
      this.#curArray,
      boxArray,
      startIndex,
      endIndex,
      this.#curArray.slice(),
      [...boxArray],
      view
    );
  }
  async mergeSortHelper(
    mainArray,
    boxArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    boxAuxiliaryArray,
    view
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    await this.mergeSortHelper(
      auxiliaryArray,
      boxAuxiliaryArray,
      startIdx,
      middleIdx,
      mainArray,
      boxArray,
      view
    );
    await this.mergeSortHelper(
      auxiliaryArray,
      boxAuxiliaryArray,
      middleIdx + 1,
      endIdx,
      mainArray,
      boxArray,
      view
    );
    await this.doMerge(
      mainArray,
      boxArray,
      startIdx,
      middleIdx,
      endIdx,
      auxiliaryArray,
      boxAuxiliaryArray,
      view
    );
    console.log(this.#curArray);
  }

  async doMerge(
    mainArray,
    boxArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    boxAuxiliaryArray,
    view
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        await this.delay(view.getSortingSpeed() / 2);
        await view.runMergeAnimation(k, boxAuxiliaryArray[i]);

        mainArray[k] = auxiliaryArray[i];
        boxArray[k++] = boxAuxiliaryArray[i++];
      } else {
        await this.delay(view.getSortingSpeed() / 2);
        await view.runMergeAnimation(k, boxAuxiliaryArray[j]);

        mainArray[k] = auxiliaryArray[j];
        boxArray[k++] = boxAuxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      await this.delay(view.getSortingSpeed() / 2);
      await view.runMergeAnimation(k, boxAuxiliaryArray[i]); // Moved inside the loop

      mainArray[k] = auxiliaryArray[i];

      boxArray[k] = boxAuxiliaryArray[i]; // Corrected indexing
      k++; // Increment k after setting the value
      i++; // Increment i
    }
    while (j <= endIdx) {
      await this.delay(view.getSortingSpeed() / 2);
      await view.runMergeAnimation(k, boxAuxiliaryArray[j]); // Moved inside the loop

      mainArray[k] = auxiliaryArray[j];
      boxArray[k] = boxAuxiliaryArray[j]; // Corrected indexing
      k++; // Increment k after setting the value
      j++; // Increment j
    }
  }

  async runHeapSort(view) {
    view.disableDisruptiveModules();
    await this.heapSort(view);
    await view.renderSortedArray();
    view.enableAllModules();
  }
  async heapify(n, i, view) {
    const delayTime = view.getSortingSpeed() / 2;
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // left = 2*i + 1
    let right = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (left < n && this.#curArray[left] > this.#curArray[largest]) {
      largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && this.#curArray[right] > this.#curArray[largest]) {
      largest = right;
    }

    // If largest is not root
    if (largest !== i) {
      // Swap arr[i] and arr[largest]
      await new Promise((resolve) => {
        setTimeout(resolve, delayTime);
      });
      let temp = this.#curArray[i];
      this.#curArray[i] = this.#curArray[largest];
      this.#curArray[largest] = temp;
      await view.switchTwoArrayValues(largest, i);

      // Recursively heapify the affected sub-tree
      await this.heapify(n, largest, view);
    }
  }

  // main function to do heap sort
  async heapSort(view) {
    const delayTime = view.getSortingSpeed() / 2;

    const n = this.#curArray.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(n, i, view);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      await new Promise((resolve) => {
        setTimeout(resolve, delayTime);
      });
      await view.switchTwoArrayValues(0, i);
      let temp = this.#curArray[0];
      this.#curArray[0] = this.#curArray[i];
      this.#curArray[i] = temp;

      // call max heapify on the reduced heap
      await this.heapify(i, 0, view);
    }
  }
}

export default new Data();
