import hello from './module1.js'
import './style.css'
import icon from './t_done.png'
// import markdown from './title.md'

hello('测试文件')

const img = new Image()
img.src = icon
document.body.appendChild(img)
