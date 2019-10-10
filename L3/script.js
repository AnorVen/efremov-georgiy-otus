function getPath(e) {
  let nodeElem = e.target;
  let name = ''
  console.log(nodeElem)
  if (nodeElem === undefined) {
    return
  }
  const checkUnic = (nodeEl) => {
    if (document.querySelectorAll(nodeEl).length) {
      return document.querySelectorAll(nodeEl).length === 1

    } else {
      console.log(`error 404`)
    }
  }
  const getId = (nodeEl) => {
    if (nodeEl.id) {
      let temp = nodeEl.id.split(' ').join('#');
      return `#${temp}`
    }
  }
  const getClassList = (nodeEl) => {
    console.log(nodeEl.className.length);
    if (nodeEl.className.length) {
      let temp = nodeEl.className;
      console.log(temp)
      let newTemp = temp.split(' ').map(item => item !== '' ? item.trim() : null)
      console.log(newTemp.join('.'))
      return `.${newTemp.join('.').replace('..', '.')}`
    }
  }
  name = `${nodeElem.tagName}${getId(nodeElem)}${getClassList(nodeElem)}`

  while (nodeElem.tagName !== 'body') {
    nodeElem = nodeElem.parentElement;
    name = `${nodeElem.tagName}${getId(nodeElem)}${getClassList(nodeElem)} ${name}`
  }
  console.log(name)
  if (checkUnic(name)) {
    console.log('done')
  } else {
    console.log('не done')
  }
}

document.addEventListener('click', getPath, false)
