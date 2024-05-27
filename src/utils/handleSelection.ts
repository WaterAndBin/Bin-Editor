import render from './render';

/**
 * 范围选择判断
 * @param actions 需要变化的dom元素
 */
const handleSelection = (event: Element | null, actions: string): void => {
  // 获取选择区域的对象
  const selection = window.getSelection();
  if (selection && event) {
    const range = selection.getRangeAt(0);
    /* 取出片段，就不判断范围了，这个感觉没必要判断是前面还是后面 */
    const documentFragment = range.extractContents();
    /* 插入p标签，方便解析AST */
    const p = document.createElement('p');
    p.append(documentFragment);
    render(p.outerHTML);
  }
};

export default handleSelection;
