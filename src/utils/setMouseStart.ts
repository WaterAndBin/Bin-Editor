/**
 * 鼠标点击位置，当插入新节点需要将鼠标移动过去
 * @param _Dom dom节点
 */
const setMouseStart = (_Dom: Element): void => {
  const selection = window.getSelection();
  if (selection) {
    // 创建一个新的 range
    const range = document.createRange();
    // 设置 range 的起点和终点在新插入的 p 元素内
    range.setStart(_Dom, 0);
    range.setEnd(_Dom, 0);
    // 移出所有选区
    selection.removeAllRanges();
    // 将新的 range 设置为选区
    selection.addRange(range);
  }
};

export default setMouseStart;
