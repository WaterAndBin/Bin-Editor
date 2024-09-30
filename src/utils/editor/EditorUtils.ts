import { type Ele } from '@/types/ele';
import { type AttributeType } from './editorDefaultButton';

interface EditorClassProps {
  editorRef: React.RefObject<HTMLDivElement>;
  editorNode: React.MutableRefObject<Element | null>;
}

export class EditorClass {
  /**
   * 文章主体DOM
   */
  private readonly editorRef: React.RefObject<HTMLDivElement>;
  /**
   * 节点dom，具体是绑定哪个节点
   *
   * 文章某条内容的节点
   */
  private readonly editorNode: React.MutableRefObject<Element | ChildNode | null>;

  constructor(props: EditorClassProps) {
    this.editorRef = props.editorRef;
    this.editorNode = props.editorNode;
  }

  /**
   * 全新设置选区
   * @param element 需要重新设置选区的元素，一般都是第一个位置
   * @param all 是否需要全部
   * @param first 第几位开始 默认0
   * @param end 第几位结束 默认0
   */
  setRange(element: Element | ChildNode, first?: number, end?: number): void {
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
  }

  /**
   * 获取一个新的P标签
   * @example <p><br/></p>
   */
  getPDocument(): Element {
    const newElement = document.createElement('p');
    newElement.appendChild(document.createElement('br'));
    return newElement;
  }

  /**
   * 检查文章主题，看是否需要添加P标签
   */
  checkEditorMain(): void {
    /* 判断里面是否有节点 */
    if (this.editorRef.current?.children.length == 0) {
      this.setP();
    } else {
      /* 如果里面有节点的话，就重新进行定位selection */
      const children = this.editorRef.current?.lastChild;
      if (children) {
        this.setRange(children, children.childNodes.length, children.childNodes.length);
        console.log('======');
        console.log(children);
        this.setEditorNode(children);
      }
    }
  }

  /**
   * 处理键盘事件
   * @param event 键盘事件
   */
  handleOnkeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.code == 'Enter') {
      console.log('按下了');
      event.preventDefault();
      this.setP();
    }
  }

  /**
   * 设置P标签，并且将选区也选定在P标签当中
   */
  setP(): void {
    const newElement = this.getPDocument();
    // 向父盒子里面push子元素
    this.editorRef.current?.appendChild(newElement);
    this.setRange(newElement);
    this.setEditorNode(newElement);
  }

  /**
   * 重新设置新节点
   * @param ele 新节点
   */
  setEditorNode(newEle: Element | ChildNode): void {
    /* 重新设置节点 */
    this.editorNode.current = newEle;
  }

  /**
   * 查找最顶层的节点
   */
  findTopNode(): void {
    const selection = window.getSelection();
    console.log(selection);
    // const range = selection?.getRangeAt(0);
    // console.log(range);
    // console.log(this.editorRef);
  }

  /**
   * 设置新的样式
   *
   * 例如 strong、u、s
   * @param $document
   */
  setAttribute($document: AttributeType, $ele?: Ele): void {
    this.findTopNode();
    // const handler = AttributeType[$document];
    // if (handler) {
    //   console.log(handler);
    // }

    // if ($ele) {
    //   $ele.createEle();
    // }
    this.checkEditorMain();
  }
}
