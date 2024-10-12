import { type Ele } from '@/types/ele';
import { type AttributeType } from './editorDefaultButton';
import { setRange } from './common';

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
        setRange(children, children.childNodes.length, children.childNodes.length);
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
    setRange(newElement);
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
   * 设置新的样式
   *
   * 例如 strong、u、s
   * @param $document 元素本身 例如 strong
   * @param $ele 元素的实例对象
   * @param _element 其他节点
   */
  setAttribute($document: AttributeType, $ele: Ele | undefined, _node: React.RefObject<HTMLDivElement>): void {
    if (this.editorRef.current) {
      $ele?.insertEle(this.editorRef.current, _node);
    }
  }
}
