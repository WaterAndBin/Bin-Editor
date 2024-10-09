export interface Ele {
  /**
   * 创建元素
   */
  createEle: () => T;
  /**
   * 插入元素
   */
  insertEle: (body: HTMLDivElement) => T;
}
