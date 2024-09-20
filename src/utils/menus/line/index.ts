import { type Ele } from '@/types/ele';

export class Line implements Ele {
  /**
   * 创建元素
   */
  createEle(): void {
    // document.execCommand('insertHTML', true, '<hr>');//废弃的方法
    // document.execCommand('insertHTML', true, '<p><br/></p>');
    const hr = document.createElement('hr');
    const p = document.createElement('p');
    const br = document.createElement('br');
    p.appendChild(br);
    this.insertEle(hr, p);
  }

  /**
   * 插入元素
   */
  insertEle(hr: Element, p: Element): void {}
}
