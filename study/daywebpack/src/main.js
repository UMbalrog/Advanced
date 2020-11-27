import module from './module1.js'
import './style.css'
import icon from './t_done.png'

module('测试文件')

let img = new Image();
img.src = icon;
document.body.appendChild(img);