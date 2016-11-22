let getElementFromTemplate = (string) => {
  let node = document.createElement('span');
  let content = string;
  node.appendChild(content);
  return node.cloneNode(true);
};

export default getElementFromTemplate;
