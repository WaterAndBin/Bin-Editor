/**
 * 富文本编辑器按钮
 */
export const editorButton: EditorButton[] = [
  {
    name: 'editor-title.svg',
    title: '标题',
    hide: false,
    actions: 'title',
    children: [
      {
        name: 'editor-title.svg',
        title: '标题一',
        actions: 'h1'
      },
      {
        name: 'editor-title.svg',
        title: '标题二',
        actions: 'h2'
      }
    ]
  },
  {
    name: 'editor-bold.svg',
    title: '加粗',
    actions: 'strong'
  },
  {
    name: 'editor-italic.svg',
    title: '斜线',
    actions: 'i'
  },
  {
    name: 'editor-strikethrough.svg',
    title: '删除线',
    actions: 's'
  },
  {
    name: 'editor-underline.svg',
    title: '下划线',
    actions: 'u'
  },
  {
    name: 'editor-horizon.svg',
    title: '水平线',
    actions: 'line'
  },
  {
    name: 'editor-codeBlocks.svg',
    title: '代码块',
    actions: 'code'
  },
  {
    name: 'editor-image.svg',
    title: '图像',
    actions: 'image'
  }
];

export interface EditorButton {
  name: string;
  title: string;
  actions: string;
  hide?: boolean;
  children?: EditorButton[];
}
