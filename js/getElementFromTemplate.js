
let getElementFromTemplate = (string) => {
  let node = document.createElement('div');
  node.innerHTML = string;
  return node.cloneNode(true);
};

export default getElementFromTemplate;
