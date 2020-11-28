import hello from './module1.js'
import './style.css'
import icon from './t_done.png'
import htmlwenan from './title.md'

hello('测试文件');

let img = new Image();
img.src = icon;
document.body.appendChild(img);

document.write(htmlwenan);