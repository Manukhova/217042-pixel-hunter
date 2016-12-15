let mainElement = document.getElementById('main');

let select = (newElem, elem) => {
  mainElement.replaceChild(newElem, elem);
};

export default select;
