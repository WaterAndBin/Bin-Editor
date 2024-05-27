'use client';

import { editorButton } from '@/utils/editorDefaultButton';
import handleSelection from '@/utils/handleSelection';
import setMouseStart from '@/utils/setMouseStart';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function EditorMain(): React.ReactElement {
  const editorRef = useRef<HTMLDivElement>(null);
  /* 测试数据 */
  const [value, setValue] = useState<string>('<p>你好，<strong>世界</strong>，这个情况<strong>怎么说</strong>不是很好</p>');

  /* 节点dom，具体是绑定哪个节点 */
  // const [editorNode, setEditorNode] = useState<Element | null>(null);
  const editorNode = useRef<Element | null>(null);

  /**
   * 插入空的p标签
   */
  const insertP = (): void => {
    /* 判断里面是否有节点 */
    if (editorRef.current?.children.length == 0) {
      const newElement = document.createElement('p');
      newElement.appendChild(document.createElement('br'));
      editorRef.current?.appendChild(newElement);
      /* 重新设置节点 */
      editorNode.current = newElement;
    }
  };

  /**
   * 按下enter键
   */
  const handleOnkeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.code == 'Enter') {
      event.preventDefault();
      const newElement = document.createElement('p');
      newElement.appendChild(document.createElement('br'));
      editorRef.current?.appendChild(newElement);
      /* 设置鼠标位置 */
      setMouseStart(newElement);
      /* 重新设置节点 */
      editorNode.current = newElement;
    }
  };

  /**
   * 鼠标点击
   * @param _Dom dom节点
   */
  const handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    editorNode.current = event.target as Element;
    // console.log('鼠标点击了，节点是');
    // console.log(editorNode.current);
  };

  useEffect(() => {
    /* 先插入空的p标签 */
    insertP();
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
          }
        }
        if (mutation.removedNodes.length > 0 && editorRef) {
          // 当有节点被移除时，检查editor是否没有子节点
          if (editorRef.current?.firstChild === null) {
            insertP();
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
    <div className="flex justify-center mt-10 box-border select-none">
      <div className="w-[56rem] border-default text-2xl box-border">
        {/* 头部 */}
        <div className="grid grid-flow-col-dense h-[4rem] border-b-[3px] border-sloid border-black">
          {editorButton.map((items, index) => (
            <div className="w-full grid justify-center" key={index}>
              <div
                className="flex-default flex-col my-1 px-3 cursor-pointer hover:bg-gray-300 mix-blend-difference"
                onClick={() => {
                  handleSelection(editorNode.current, items.actions);
                }}
              >
                <Image src={'/svg/' + items.name} alt={items.title} width={26} height={16} priority></Image>
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
            handleOnkeyDown(event);
          }}
          onMouseDown={(event) => {
            handleOnMouseDown(event);
          }}
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      </div>
    </div>
  );
}

export default EditorMain;
