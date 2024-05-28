/**
 * 范围选择判断
 * @param actions 需要变化的dom元素
 */
const handleSelection = (event: Element | null, actions: string, editorRef: React.RefObject<HTMLDivElement>): void => {
  // 获取选择区域的对象
  const selection = window.getSelection();
  if (selection && event) {
    const range = selection.getRangeAt(0);
    console.log(range);
    console.log(selection);
    // console.log(range.commonAncestorContainer);
    /* 取出片段，就不判断范围了，这个感觉没必要判断是前面还是后面 */
    // extractContents
    const documentFragment = range.extractContents();
    const res = checkParentNodeNmae(range.commonAncestorContainer, documentFragment);
    // console.log(res);
    // console.log(res?.parentNode);

    if (res) {
      const result = handleTest(res, actions);
      /* 如果返回来的是dom元素，而不是片段，证明是缺少属性的 */
      if (result instanceof Element) {
        range.insertNode(result);
        /* 重新设置选取的范围 */
        setRange(result);
      } else {
        /* 这里要开始处理一些事情 */
        // console.log('开始处理');
        // console.log(range);

        /* 检查上下元素是否都有相同的actions */
        /* 检查下个元素 */
        // const checkNext = checkNextNode(range.endContainer, actions);
        /* 检查上个元素 */
        // const checkPrev = checkPrevNode(range.commonAncestorContainer, actions);

        console.log(range.startContainer.parentNode?.firstChild);
        console.log(range.startContainer == range.startContainer.parentNode?.firstChild);

        // console.log(checkNext);
        // console.log(checkPrev);

        // /* 找到父亲，好插入节点 */
        // const parent = findParent(range.commonAncestorContainer);

        // /* 证明选区是在后面 */
        // if (checkNext && !checkPrev) {
        //   console.log(range.startContainer);
        //   parent?.insertBefore(result, range.startContainer.parentNode);
        // }
        // /* 证明选区是在前面 */
        // if (!checkNext && checkPrev) {
        // }
        // /* 证明选区是全选 */
        // if (!checkNext && !checkPrev) {
        //   /* 选区如果是全选的情况，就选择插入 */
        //   parent?.insertBefore(result, range.startContainer.parentNode);
        // }

        // }
      }
    }
  }
};

/**
 * 对样式进行处理，并且将里面的相同的actions给清理或者重新赋值
 * @param element
 * @param actions
 * @returns
 */
const handleTest = (element: Element | DocumentFragment, actions: string): Element | ChildNode | DocumentFragment | Node => {
  if (element.nodeName !== actions) {
    console.log('赋值样式');
    /* 先把里面存在的样式全部清理掉 */
    const res = handleSameNodeName(element, actions);
    /* 随后创建对应的样式 */
    const newElement = document.createElement(actions);
    while (res.firstChild) {
      newElement.appendChild(res.firstChild);
    }
    // console.log(newElement);
    // res.parentNode?.replaceChild(newElement, res);
    // console.log(newElement);
    return newElement;
  } else {
    console.log('取消样式');
    // return handleSameNodeName(element, actions);
    const res = handleSameNodeName(element, actions);
    // console.log(res.childNodes);
    const documentFragment = document.createDocumentFragment();
    while (res.firstChild) {
      documentFragment.appendChild(res.firstChild);
    }
    // console.log(documentFragment);
    return documentFragment;
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

/**
 * 删除空的元素
 * @param range 选区
 */
const clearNullElement = (container: ChildNode): void => {
  // 检查这个节点是否为空，如果为空则删除
  /* 要从后面开始删除，它的数组也会跟着变化，如果从0开始就会有问题 */
  for (let i = container.childNodes.length - 1; i >= 0; i--) {
    if (container.childNodes[i].childNodes.length !== 0) {
      clearNullElement(container.childNodes[i]);
    }
    if (container.childNodes[i].textContent == '') {
      container.removeChild(container.childNodes[i]);
    }
  }
};

/**
 * 输出完成的DOM结构，可能是多层的
 * @param node
 * @param documentFragment
 * @returns
 */
const checkParentNodeNmae = (node: Node, documentFragment: DocumentFragment | HTMLElement): HTMLElement | undefined => {
  if (node.parentNode) {
    /* 判断父盒子是否是P */
    if (node.parentNode?.nodeName == 'P' || node.parentNode?.nodeName == 'DIV') {
      if (documentFragment instanceof DocumentFragment) {
        let p;
        if (node.nodeName == '#text') {
          p = document.createElement(node.parentNode.nodeName);
        } else {
          p = document.createElement(node.nodeName);
        }
        p.appendChild(documentFragment);
        return p;
      }
      return documentFragment;
    } else {
      const p = document.createElement(node.parentNode.nodeName);
      p.appendChild(documentFragment);
      return checkParentNodeNmae(node.parentNode, p);
    }
  }
};

/**
 * 重新设置选取范围
 */
const setRange = (element: Element): void => {
  const selection = window.getSelection();
  if (selection) {
    // 清除任何现有的选取范围
    selection.removeAllRanges();
    const range = document.createRange();
    // 通常，我们会选择元素的整个内容，但也可以根据需要设置start和end
    range.selectNodeContents(element); // 选择元素的全部内容
    // 添加新的选取范围
    selection.addRange(range);
    console.log(range);
  }
};

/**
 * 找到自己的父亲
 * @param element
 * @returns
 */
const findParent = (element: Node | ParentNode | null): Node | ParentNode | undefined => {
  if (element) {
    // console.log(element);
    if (element?.nodeName == 'P') {
      return element;
    } else {
      return findParent(element.parentNode);
    }
  } else {
    console.error('找不到节点？');
  }
};

/**
 * 检查后文章是否有跟自己相同的元素
 * @param element
 * @param actions
 * @returns
 */
const checkNextNode = (element: Node, actions: string): void => {
  console.log(element);
};

/**
 * 检查后文章是否有跟自己相同的元素
 * @param element
 * @param actions
 * @returns
 */
const checkPrevNode = (element: Node, actions: string): void => {
  const parent = element.parentNode;
  console.log(parent);
};

export default handleSelection;
