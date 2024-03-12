class Data {
  #curArray;
  delay(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
  createAndSetCurArray(arraySize) {
    this.#curArray = Array.from(
      new Array(arraySize),
      () => Math.floor(Math.random() * 500) + 1
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
        this.#curArray.push(Math.floor(Math.random() * 500) + 1);
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
          await view.switchTwoArrayValues(i, i + 1);
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
        // await new Promise((resolve) =>
        //   setTimeout(function () {
        //     resolve();
        //   }, delayTime)
        // );
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
  async selectionSort(view) {
    const delayTime = view.getSortingSpeed() / 2;

    view.disableDisruptiveModules();
    for (let i = 0; i <= this.#curArray.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j <= this.#curArray.length - 1; j++) {
        if (this.#curArray[j] < this.#curArray[min]) {
          min = j;
        }
      }
      const temp = this.#curArray[i];
      this.#curArray[i] = this.#curArray[min];
      this.#curArray[min] = temp;
      await new Promise((resolve) =>
        setTimeout(function () {
          resolve();
        }, delayTime)
      );
      await view.switchTwoArrayValues(i, min);
    }
    await view.renderSortedArray();
    view.enableAllModules();
  }

  async runQuickSort(view) {
    view.disableDisruptiveModules();
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
    const pivot = array[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
      if (array[j] < pivot) {
        i++;
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        // await new Promise((resolve) =>
        //   setTimeout(function () {
        //     resolve();
        //   }, delayTime)
        // );
        console.log(view);
        console.log(i, j);
        await view.switchTwoArrayValues(i, j);
      }
    }
    i++;
    const temp = array[i];
    array[i] = array[end];
    array[end] = temp;
    // await new Promise((resolve) =>
    //   setTimeout(function () {
    //     resolve();
    //   }, delayTime)
    // );
    console.log(i, end);
    await view.switchTwoArrayValues(i, end);

    return i;
  }

  isSorted(array) {
    const sortedArray = [...array].sort();
    return sortedArray.every((val, i) => val === array[i]);
  }
  async runMergeSort(view) {
    const startIndex = 0;
    const endIndex = this.#curArray.length - 1;
    view.disableDisruptiveModules();
    await this.mergeSortHelper(this.#curArray, startIndex, endIndex, view);

    await view.renderSortedArray();
    view.enableAllModules();
  }

  // Recursively splits the array and calls the merge function
  async mergeSortHelper(mainArray, startIdx, endIdx, view) {
    if (startIdx >= endIdx) return; // Base case: the array is now a single element
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    await this.mergeSortHelper(mainArray, startIdx, middleIdx, view); // Sort the first half
    await this.mergeSortHelper(mainArray, middleIdx + 1, endIdx, view); // Sort the second half
    await this.doMerge(mainArray, startIdx, middleIdx, endIdx, view); // Merge the sorted halves
  }

  // Merges two sorted halves of the array
  async doMerge(mainArray, startIdx, middleIdx, endIdx, view) {
    let auxiliaryArray = mainArray.slice(startIdx, endIdx + 1); // Copy the segment to be merged
    let i = 0; // Initial index of the first half in auxiliaryArray
    let j = middleIdx + 1 - startIdx; // Initial index of the second half in auxiliaryArray
    let k = startIdx; // Initial index of the merged array

    while (i <= middleIdx - startIdx && j <= endIdx - startIdx) {
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        mainArray[k++] = auxiliaryArray[i++];
        // await this.delay(view.getSortingSpeed() / 2);
        await view.runMergeAnimation(k - 1, mainArray);
      } else {
        mainArray[k++] = auxiliaryArray[j++];
        // await this.delay(view.getSortingSpeed() / 2);
        await view.runMergeAnimation(k - 1, mainArray);
      }
    }

    // Copy the remaining elements of the first half, if any
    while (i <= middleIdx - startIdx) {
      mainArray[k++] = auxiliaryArray[i++];
      // await this.delay(view.getSortingSpeed() / 2);
      await view.runMergeAnimation(k - 1, mainArray);
    }

    // Copy the remaining elements of the second half, if any
    while (j <= endIdx - startIdx) {
      mainArray[k++] = auxiliaryArray[j++];
      // await this.delay(view.getSortingSpeed() / 2);
      await view.runMergeAnimation(k - 1, mainArray);
    }

    // Optionally, update the view to reflect the current state of sorting
    // view.renderNewArray(mainArray);
    console.log(mainArray); // Or use view.renderNewArray(mainArray); to visualize
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
