const { mode } = require("../webpack.config");
// loader文件，负责资源文件的从输入到输出的转换，
// 他也是一种管道的概念，可以将这个loader的输出交给下一个loader去输入处理，可以依次执行多个loader
module.exports = source => {
  console.log(source);
  
  // 必须返回一段js代码，会直接放入模块儿中
  return 
}