## promise功能点
```javascript
new Promise
```
1、封装一个类，通过new来使用；
2、需要一个参数,参数传入一个函数；
3、这个函数作为一个生成器，有两个参数，resolve和reject，前者为成功回调，后者为失败回调；
4、成功和失败，及promise有个三个状态，等待、成功、失败，pending\fulfilled\rejected；
5、