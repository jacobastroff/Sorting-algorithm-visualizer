import View from "./view.js";
import data from "./data.js";
const view = new View();
data.createAndSetCurArray(
  Number(document.querySelector("#select-array-length").value)
);

view.renderNewArray(data.getCurArray());
// setTimeout(function () {
//   view.switchBubbleArray(4, 5);
// }, 3000);
// console.log(data.insertSort(view, [3, 2, 1, 4, 5, 6, 7, 3, 2, 1, 3, 4]));
console.log(data.insert(3, 3, 1, [1, 8, 4, 5, 3, 10, 2]));
// console.log(data.quickSort(0, 20, view));
// data.quickSort(0, data.getCurArray().length - 1, view);

// Example usage:
