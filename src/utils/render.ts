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

  while (index < template.length - 1) {
    /* 切割 */
    rest = template.substring(index);
    /* 把空格去掉 */
    if (startSign.test(rest)) {
      /* 检测<>标签 */
      handleSign(rest, startSign, index);
    } else if (endSign.test(rest)) {
      handleSign(rest, endSign, index);
    }
    index++;
  }
};

const handleSign = (rest: string, sign: RegExp, index: number): void => {
  const matchResult = rest.match(sign);
  if (matchResult) {
    const tag = matchResult[1];
    console.log('标记', tag);
    index += tag.length + 2;
  }
};

export default render;
