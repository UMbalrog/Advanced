/*
 * @Author: xujie 
 * @Date: 2021-10-11 17:41:53 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-11 18:04:07
 */
const fs = require('fs');
const marked = require('marked');
const browserSync = require('browser-sync');
const path = require('path');


const temp = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
        .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 1000px;
            margin: 0 auto;
            padding: 45px;
        }
        @media (max-width: 750px) {
            .markdown-body {
                padding: 15px;
            }
        }
        {{style}}
    </style>
</head>
<body>
    <div class="markdown-body">
        {{content}}
    </div>
</body>
</html>
`;

const mdPath = path.join(__dirname, process.argv[2]);
const cssPath = path.resolve('github.css');
const indexPath = mdPath.replace(path.extname(mdPath), '.html');

// console.log(process.argv);

fs.watchFile(mdPath, (curr, prev) => {
  if(curr.mtime != prev.mtime) {
    setHtml();
  }
})
setHtml();
function setHtml() {
  fs.readFile(mdPath, 'utf-8', (err, data) => {
    let mdStr = marked(data);
    fs.readFile(cssPath, (err, cssdata) => {
      let htmlStr = temp.replace('{{content}}', mdStr).replace('{{style}}', cssdata);
      fs.writeFile(indexPath, htmlStr, (err, data) => {
        console.log('生成文件了');
      })
    })
  })
};

browserSync.init({
  browser:'',
  server: __dirname,
  watch: true,
  index: path.basename(indexPath)
})
