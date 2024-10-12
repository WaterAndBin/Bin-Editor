import { type Ele } from '@/types/ele';
import { setRange } from '../../common';

export class NewImage implements Ele {
  /**
   * 创建元素
   */
  createEle(url: string): HTMLImageElement {
    // const span = document.createElement('span');
    const img = document.createElement('img');
    img.className = 'editor-img';
    img.src = url;
    // span.appendChild(img);
    // span.className = 'editor-span';
    // return span;
    return img;
  }

  /**
   * 插入元素
   */
  insertEle(body: HTMLDivElement, _node: React.RefObject<HTMLDivElement>): void {
    if (_node.current) {
      /* 模拟点击事件 */
      _node.current.click();
    }
  }

  /**
   * 上传图片
   */
  uploadEvent(file: File | Blob): string {
    return 'https://hbimg.huaban.com/f4d33dd532384ab3354489e1e6c8e08aff8308783770-Rq5MNL';
  }

  /**
   * 创建事件
   * @param file 文件
   */
  changeEvent(file: File | Blob): void {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    /* 获取地址 */
    const url = this.uploadEvent(file);
    /* 获取图片元素 */
    const image = this.createEle(url);
    /* 插入图片 */
    range?.insertNode(image);
    /* 绑定下一个图片节点 */
    if (image.nextSibling) {
      setRange(image.nextSibling);
    }
  }

  /**
   * 处理粘贴事件
   * @param src 图片base64地址
   */
  copyEvent(src: string): void {
    const blob = this.dataURItoBlob(src);
    const formData = new FormData();
    formData.append('file', blob, 'image.png'); // 假设上传的文件名为image.png
    this.changeEvent(blob);
  }

  /**
   * 将Base64编码的字符串转换为Blob对象
   * @param dataURI
   */
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
