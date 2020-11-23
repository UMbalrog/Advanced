// gulp入口文件
const { src, dest } = require('gulp')
const cleanCSS = require('gulp-clean-css')

exports.stream = () => {
  return src('./src/*.css')
          .pipe(cleanCSS())
          .pipe(dest('dist'));

}