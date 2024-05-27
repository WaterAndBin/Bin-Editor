/**
 * 形成虚拟节点，方便对DOM进行操作
 * @param template 节点的string类型
 */
const render = (template: string): void => {
  console.log(template);

  let index = 0;
  /* 剩余的部分 */
  let rest = '';
  /* 开始标记 */
  const startSign = /^<([a-z]+[1-6]?)>/;
  /* 结束标记 */
  const endSign = /^<\/([a-z]+[1-6]?)>/;
  /* 文字标记 */
  //   const wordSign = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;
  /* 判断第几个，方便后期构建 */
  const key = 0; // 判断父亲，最外层的key为0
  /* 堆栈 */
  const signStack = []; // 存放标签的堆栈
  const textStack = []; // 存放文字的堆栈

  while (index < template.length - 1) {
    /* 切割 */
    rest = template.substring(index);
    /* 把空格去掉 */
    if (startSign.test(rest)) {
      /* 识别开头的 */
      const matchResult = rest.match(startSign);
      if (matchResult) {
        /* 获取标签 */
        const tag = matchResult[1];
        console.log('开始标记', tag);
        index += tag.length + 2;
      }
    } else if (endSign.test(rest)) {
      /* 识别中间的 */
      const matchResult = rest.match(endSign);
      if (matchResult) {
        const tag = matchResult[1];
        console.log('结束标记', tag);
        index += tag.length + 2;
      }
    }
    // else if (wordSign.test(rest)) {
    //   const wordResult = rest.match(wordSign);
    //   console.log(wordResult);
    //   if (wordResult) {
    //     const word = wordResult[1];
    //     console.log('文字', word);
    //     index += word.length;
    //   }
    // } else {
    index++;
    // }
  }
};

// const handleSign = (rest: string, sign: RegExp, index: number): void => {
//   const matchResult = rest.match(sign);
//   if (matchResult) {
//     const tag = matchResult[1];
//     console.log('标记', tag);
//     index += tag.length + 2;
//   }
// };

export default render;
