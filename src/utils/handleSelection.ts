/**
 * 范围选择判断
 * @param actions 需要变化的dom元素
 */
const handleSelection = (event: Element | null, actions: string): void => {
  // 获取选择区域的对象
  const selection = window.getSelection();
  if (selection && event) {
    const range = selection.getRangeAt(0);
    console.log(range);
    /* 取出片段，就不判断范围了，这个感觉没必要判断是前面还是后面 */
    // extractContents
    const documentFragment = range.extractContents();
    console.log(documentFragment);
    console.log(documentFragment.children);

    /* 判断有没有属性，在cloneContents或者extractContents选择<strong>123</strong>这种情况的时候，并不会携带strong标签 */
    if (documentFragment.children.length == 0) {
      console.log('======');
      const parentElement = range.commonAncestorContainer.parentElement;
      if (parentElement) {
        const p = document.createElement(parentElement.nodeName);
        p.append(documentFragment);
        range.insertNode(handleTest(p, actions));
      }
    } else {
      range.insertNode(handleTest(documentFragment, actions));
    }
  }
};

const handleTest = (element: Element | DocumentFragment, actions: string): Element | ChildNode | DocumentFragment => {
  if (element.nodeName !== actions) {
    return handleSameNodeName(element, actions);
  } else {
    return element;
  }
};

/**
 * 处理相同的标签
 * @param element
 * @param actions
 */
const handleSameNodeName = (element: Element | ChildNode | DocumentFragment, actions: string): Element | ChildNode | DocumentFragment => {
  const childNodes = element.childNodes;
  /* 每里面的每一个子节点进行循环 */
  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].nodeName == actions) {
      // console.log(childNodes[i].childNodes);
      const documentFragment = document.createDocumentFragment();
      while (childNodes[i].childNodes.length > 0) {
        documentFragment.appendChild(childNodes[i].childNodes[0]);
      }
      /* 将符合的dom元素进行替换掉 */
      element.replaceChild(documentFragment, childNodes[i]);
    }
    if (childNodes[i].childNodes.length !== 0) {
      handleSameNodeName(childNodes[i], actions);
    }
  }
  return element;
};

export default handleSelection;
