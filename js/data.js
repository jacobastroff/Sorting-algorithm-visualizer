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
  async runMergeSort(view) {
    const array = this.#curArray.map((val, i) => {
      return { val: val, indexOriginalArray: i };
    });
    view.mergeSetAllBoxes();
    await this.mergeSort(array, view);
    console.log(array);
  }
  // async mergeSort(array, view) {
  //   const length = array.length;
  //   if (length <= 1) return array;
  //   const middle = Math.trunc(array.length / 2);
  //   const leftArray = array.slice(0, middle);
  //   const rightArray = array.slice(middle);
  //   await this.mergeSort(leftArray, view);
  //   await this.mergeSort(rightArray, view);
  //   await this.merge(leftArray, rightArray, array, view);
  //   for (const [i, el] of array.entries()) {
  //     await new Promise((resolve) => {
  //       setTimeout(resolve, 150);
  //     });
  //     await view.renderMergeAnimation(
  //       el.indexOriginalArray,
  //       i + leftArray.length
  //     );
  //   }
  // }
  // async merge(leftArray, rightArray, array, view) {
  //   console.log(leftArray, rightArray);
  //   const leftSize = Math.floor(array.length / 2);
  //   const rightSize = array.length - leftSize;
  //   let i = 0,
  //     l = 0,
  //     r = 0; //indices
  //   while (l < leftSize && r < rightSize) {
  //     if (leftArray[l].val < rightArray[r]) {
  //       array[i] = leftArray[l];

  //       i++;
  //       l++;
  //     } else {
  //       array[i] = rightArray[r];
  //       i++;
  //       r++;
  //     }
  //   }
  //   while (l < leftSize) {
  //     array[i] = leftArray[l];

  //     i++;
  //     l++;
  //   }
  //   while (r < rightSize) {
  //     array[i] = rightArray[r];
  //     i++;
  //     r++;
  //   }
  // }
  async heapify(n, i, view) {
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
        setTimeout(resolve, 150);
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
    const n = this.#curArray.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(n, i, view);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      await new Promise((resolve) => {
        setTimeout(resolve, 150);
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
