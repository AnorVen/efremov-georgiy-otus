import {html, render} from 'lit-html';

const app = document.querySelector('#app');
const helloTemplate = (id) => html`<div>Hello ${id}</div>`;
const treeTempalte = ({items, id}) => html`<div class="tree-${id}">${helloTemplate(id)}items-${checkItems(items)}</div>`;

function checkItems(items) {
  items.forEach(item => {
    const {items, id} = item;
    if (!!items) {
      return treeTempalte(item)
    } else {
      return helloTemplate(id)
    }
  })
}

const myTree = (items) => {
  let temp;
  temp = helloTemplate(items.id);
  if (items.items) {
    temp += treeTempalte(items)
  }
  render(temp, app)
}


let test = {
  "id": 1,
  "items": [{
    "id": 2,
    "items": [{
      "id": 3,
      "items": [{
        "id": 4
      }]
    }]
  }]
}
myTree(test);

