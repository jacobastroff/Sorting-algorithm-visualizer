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
