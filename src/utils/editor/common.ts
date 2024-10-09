/**
 * 查找最顶层的节点
 */
export const findTopNode = (ele: Node | ParentNode): Element | Node | null => {
  if (ele.nodeName == 'P') {
    return ele;
  }
  const parentNode = ele.parentNode;
  if (parentNode && parentNode.nodeName !== 'P') {
    return findTopNode(parentNode);
  }
  return parentNode ?? null; // 如果 parentNode 为 null，则返回 null，表示没有找到合适的节点
};

/**
 * 全新设置选区
 * @param element 需要重新设置选区的元素，一般都是第一个位置
 * @param all 是否需要全部
 * @param first 第几位开始 默认0
 * @param end 第几位结束 默认0
 */
export const setRange = (element: Element | ChildNode, first?: number, end?: number): void => {
  const selection = window.getSelection();
  if (selection) {
    // 清除所有的选区
    selection.removeAllRanges();
    // 创建新的选区
    const range = document.createRange();
    range.setStart(element, first ?? 0); // 将光标设置在第一个子节点的开始
    range.setEnd(element, end ?? 0); // 设置选区结束点在相同位置
    selection.addRange(range);
  }
};
