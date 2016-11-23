let getElementFromTemplate = (string) => {
  let node = document.createElement('span');
  node.innerHTML = string;
  return node.cloneNode(true);
};

export default getElementFromTemplate;
