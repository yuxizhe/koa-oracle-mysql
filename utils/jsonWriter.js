// 向前台返回JSON方法的简单封装

module.exports = (ctx, ret) => {
  ctx.type = 'application/json';
  ctx.body = {
    data: ret,
    error_code: 0,
    error_description: '',
  };
};
