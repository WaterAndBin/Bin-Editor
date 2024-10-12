'use client';

import { editorButton } from '@/utils/editor/editorDefaultButton';
import { EditorClass } from '@/utils/editor/EditorUtils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import './index.css';
import EditorImage from '../EditorImage';
import { NewImage } from '@/utils/editor/menus/image';

function EditorMain(): React.ReactElement {
  /**
   * 身体 dom
   */
  const editorRef = useRef<HTMLDivElement>(null);
  /**
   * 图片 dom
   */
  const imageRef = useRef(null);
  /**
   * 图片的实例对象
   */
  const newImage = new NewImage();

  /* 测试数据 */
  // const [value, setValue] = useState<string>('<p><strong>你好</strong>，<strong>世<i>界你好啊<u>啊啊</u></i></strong>，这个情况<strong>怎么说</strong>不是很好</p>');
  // const [value, setValue] = useState<string>('<p>你好，<strong>世<i>界你好啊<u>啊啊</u></i></strong>，这个情况<strong>怎么说</strong>不是很好</p>');
  const [value, _] = useState<string>('<p>h<strong>a<u>llo,wo</u>r</strong>ld</p><p>h<strong>allo,wor</strong>ld</p>');

  /**
   * 节点dom，具体是绑定哪个节点
   */
  const editorNode = useRef<Element | null>(null);
  /**
   * 存储实例对象
   */
  const editorClass = useRef<EditorClass | undefined>(undefined);

  useEffect(() => {
    editorClass.current = new EditorClass({
      editorRef,
      editorNode
    });

    /* 先插入空的p标签 */
    editorClass.current.checkEditorMain();
    /* 对该元素身上绑定观察者 */
    const observer = new MutationObserver((mutations): void => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const addedNode = mutation.addedNodes[i];
            if (addedNode.nodeName === 'P') {
              /* 增加一个Event属性 */
              const event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              addedNode.dispatchEvent(event);
            }
            if (addedNode.nodeName === 'IMG') {
              // (addedNode as HTMLElement).remove();
              const imageBase = addedNode as HTMLImageElement;
              if (imageBase.src.includes('data:image')) {
                //   console.log(imageBase.src.includes('data:image'));
                newImage.copyEvent(imageBase.src);
              }
            }
          }
        }
        if (mutation.removedNodes.length > 0 && editorRef) {
          // 当有节点被移除时，检查editor是否没有子节点
          if (editorRef.current?.firstChild === null) {
            editorClass.current?.checkEditorMain();
          }
        }
      });
    });
    // attributes: 当设置为true时，这个属性会观察目标节点的属性变化。当属性变化发生时，MutationObserver回调函数会被触发。
    // childList: 当设置为true时，这个属性会观察目标节点的直接子节点的添加和移除。当子节点发生变化时，MutationObserver回调函数会被触发。
    // subtree: 当设置为true时，这个属性会观察目标节点的所有子孙节点的添加和移除。当子孙节点发生变化时，MutationObserver回调函数会被触发。
    const options = { attributes: true, childList: true, subtree: true };
    observer.observe(document.getElementById('editor') as Node, options);
  }, []);

  return (
    <div className="flex justify-center mt-10 box-border">
      <EditorImage ref={imageRef} editorRef={editorRef}></EditorImage>
      <div className="w-[56rem] border-default text-2xl box-border">
        {/* 头部 */}
        <div className="grid grid-flow-col-dense h-[4rem] border-b-[3px] border-sloid border-black select-none">
          {/* 小标题 */}
          {editorButton.map((items, index) => (
            <div className="w-full grid justify-center" key={index}>
              <div
                className="flex-default flex-col my-1 px-3 cursor-pointer hover:bg-gray-300 mix-blend-difference"
                onClick={() => {
                  editorClass.current?.setAttribute(items.actions, items.execute, imageRef);
                }}
              >
                <Image src={'/svg/' + items.name} alt={items.title} width={0} height={0} className="w-6 h-auto" priority></Image>
                <span className="text-base">{items.title}</span>
              </div>
            </div>
          ))}
        </div>
        {/* 身体 */}
        <div
          id="editor"
          ref={editorRef}
          contentEditable={true}
          className="editor-box box-border min-h-[35rem] w-full cursor-text overflow-hidden p-3 outline-0 select-all"
          onKeyDown={(event) => {
            editorClass.current?.handleOnkeyDown(event);
          }}
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      </div>
    </div>
  );
}

export default EditorMain;
