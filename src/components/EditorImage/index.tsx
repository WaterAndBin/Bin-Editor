import { NewImage } from '@/utils/editor/menus/image';
import React, { forwardRef } from 'react';

interface EditorImageProps extends React.ComponentProps<'input'> {
  editorRef: React.RefObject<HTMLDivElement>; // 根据实际类型修改
}

const EditorImage = forwardRef<HTMLInputElement, EditorImageProps>((_, ref): React.ReactElement => {
  const _Image = new NewImage();

  const changeImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileInput = event.target;

    // 处理文件选择逻辑
    const files = fileInput.files;
    if (files && files.length > 0) {
      // 处理选中的文件
      _Image.changeEvent(files[0]);
    }

    // 清空文件输入的值
    fileInput.value = '';
  };

  return (
    <div className="hidden">
      {/* 输入框，留给图片按钮用的 */}
      <input ref={ref} type="file" accept="image/*" onChange={changeImage} />
    </div>
  );
});

EditorImage.displayName = 'EditorImage';

export default EditorImage;
