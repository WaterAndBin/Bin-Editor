export interface Ele {
  /**
   * 创建元素
   */
  createEle: ([key]: T) => T;
  /**
   * 插入元素
   */
  insertEle: (body: HTMLDivElement, [key]: T) => T;
}
