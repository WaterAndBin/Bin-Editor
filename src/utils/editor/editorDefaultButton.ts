import { type Ele } from '@/types/ele';
import { Line } from './menus/line';
import { EditorClass } from './EditorUtils';

export enum AttributeType {
  STRONG = 'STRONG',
  EM = 'EM',
  I = 'I',
  S = 'S',
  U = 'U',
  LINE = 'LINE',
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  Title = 'Title',
  H1 = 'H1',
  H2 = 'H2'
}

/**
 * 富文本编辑器按钮
 */
export const editorButton: EditorButton[] = [
  {
    name: 'editor-title.svg',
    title: '标题',
    hide: false,
    actions: AttributeType.Title,
    children: [
      {
        name: 'editor-title.svg',
        title: '标题一',
        actions: AttributeType.H1
      },
      {
        name: 'editor-title.svg',
        title: '标题二',
        actions: AttributeType.H2
      }
    ]
  },
  {
    name: 'editor-bold.svg',
    title: '加粗',
    actions: AttributeType.STRONG
  },
  {
    name: 'editor-italic.svg',
    title: '斜线',
    actions: AttributeType.I
  },
  {
    name: 'editor-strikethrough.svg',
    title: '删除线',
    actions: AttributeType.S
  },
  {
    name: 'editor-underline.svg',
    title: '下划线',
    actions: AttributeType.U
  },
  {
    name: 'editor-horizon.svg',
    title: '水平线',
    actions: AttributeType.LINE,
    execute: new Line()
  },
  {
    name: 'editor-codeBlocks.svg',
    title: '代码块',
    actions: AttributeType.CODE
  },
  {
    name: 'editor-image.svg',
    title: '图像',
    actions: AttributeType.IMAGE
  }
];

export interface EditorButton {
  name: string;
  title: string;
  actions: AttributeType;
  execute?: Ele;
  hide?: boolean;
  children?: EditorButton[];
}
