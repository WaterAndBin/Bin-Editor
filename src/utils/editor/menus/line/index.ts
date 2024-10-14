import { type Ele } from '@/types/ele';
import { findTopNode, setRange } from '../../common';

export class Line implements Ele {
  /**
   * 创建元素
   */
  createEle(): HTMLParagraphElement {
    // document.execCommand('insertHTML', true, '<hr>');//废弃的方法
    // document.execCommand('insertHTML', true, '<p><br/></p>');
    const p = document.createElement('p');
    const br = document.createElement('br');
    p.appendChild(br);
    return p;
  }

  /**
   * 插入元素
   */
  insertEle(body: HTMLDivElement): void {
    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode;
    if (anchorNode) {
      /* 找到顶点位置 */
      const topResult = findTopNode(anchorNode);
      if (!topResult) {
        console.error('创建水平线找不到节点了，请及时');
        return;
      }
      const newEle = this.createEle();
      const hr = document.createElement('hr');
      hr.contentEditable = 'false';

      /* 插入hr以及p标签 */
      body.insertBefore(newEle, topResult.nextSibling);
      body.insertBefore(hr, topResult.nextSibling);

      /* 重新设置选区 */
      setRange(newEle);
    }
  }
}
