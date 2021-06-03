<template>
  <div>
    <div class="box">
      <canvas width="200" height="200" ref="can">

      </canvas>
    </div>
  </div>
</template>
<script>
const rem = 1, r = 100;
export default {
  name: 'canvas',
  data() {
    return {
      time: 0,
      ctx: null
    }
  },
  mounted() {
    // 1\ 创建画布，一个圆、三个指针
    // 2、一个定时器，每次获取一次当时间；
    // 3、根据当前时间，同步画布内容；
          // 计算三个指针位置，
          // 角度计算，周长除以60；
    this.create(0);
    this.autotime();
  },
  methods:{
    create() {
      // let ctx = this.ctx;
      // if(ctx){
      //   ctx.translate(100,100);
      //   ctx.clearRect(-200,-200,200,200);
      //   ctx.save();
      //   ctx.beginPath();
      //   ctx.rotate(s*Math.PI/100);
      //   ctx.strokeStyle='black';
      //   ctx.lineWidth=4;
      //   ctx.moveTo(0,0);
      //   ctx.lineTo(0,80);
      //   ctx.stroke();
      //   ctx.closePath();
      //   ctx.restore();
      // }else{
      let canvas = this.$refs['can'];
      // var canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        this.ctx = canvas.getContext('2d');
        // this.ctx.save(); //保存当前环境的状态
        this.ctx.translate(r,r); 
      }
      
          // ctx.clearRect(0,0,200,200);
          // ctx.strokeStyle = 'red';
          // ctx.beginPath();
          // ctx.moveTo(100, 100);
          // ctx.lineTo(100, 20);
          // ctx.stroke();

          // ctx.strokeStyle = '#00f';
          // ctx.beginPath();
          // ctx.moveTo(100, 100);
          // ctx.lineTo(100, 40);
          // ctx.stroke();
      

    },
    drawHour(hour, minute) {//画时针
      let ctx = this.ctx;
      ctx.save();//保存当前环境的状态
      ctx.beginPath();//重置当前路径
      var rad=2*Math.PI / 12 *hour;//求出每小时所对应的弧长
      var mrad=2*Math.PI /12/ 60 *minute;//求出每分钟对应的弧长
      ctx.rotate(rad+mrad);//旋转当前的绘图
      ctx.lineWidth=6*rem;//设置当前的线条宽度
      ctx.lineCap="round";//设置或返回线条末端线帽的样式为圆形
      ctx.moveTo(0, 10*rem);//设置要画的开始位置
      ctx.lineTo(0, -r/2);//设置结束的位置  因为设置坐标原点为（r，r），所以向上为负值
      ctx.stroke();//绘制图形
      ctx.restore();//返回之前保存过的路径状态和属性
    },
    drawMintue(minute) {//画分针  和时针画法相同
      let ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      var rad= 2*Math.PI / 60 * minute;
      ctx.rotate(rad);
      ctx.lineWidth=3*rem;
      ctx.lineCap="round";
      ctx.moveTo(0, 10*rem);
      ctx.lineTo(0, -r+30*rem);
      ctx.stroke();
      ctx.restore();
    },
    drawSecond(second) {//画秒针
      let ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle='red';
      var rad= 2*Math.PI / 60 *second;
      ctx.rotate(rad);
      ctx.lineWidth=3*rem;
      ctx.moveTo(0, 20*rem);
      // ctx.lineTo(2*rem, 20*rem);
      ctx.lineTo(0, -r+18*rem);
      // ctx.lineTo(-1, -r+18*rem);
      // ctx.fill();
      ctx.stroke();
      ctx.restore();
    },
    drawDot() {//画出中间的小圆点相当于设置一个让三个针固定的螺丝
      let ctx = this.ctx;
      ctx.beginPath();
      ctx.fillStyle='#fff';//设置填充颜色为白色
    
      ctx.arc(0, 0, 3*rem, 0, 2*Math.PI, false);
      ctx.fill();
    },
    draw() {//把三个指针放在这个函数中
      let ctx = this.ctx;
      ctx.clearRect(-100, -100, 200, 200);//清除指针运动时留下的轨迹
      var now=new Date();
      var hour= now.getHours();//获取当前小时
      var minute=now.getMinutes();//获取分钟
      var second=now.getSeconds();//获取秒
      // drawBackground();	//调用函数
      this.drawHour(hour, minute);
      this.drawMintue(minute);
      this.drawSecond(second);
      this.drawDot();
      ctx.restore();//返回之前保存过的路径状态和属性
    },
    autotime(){
      setInterval(() => {
        // let time = new Date();
        // let s = time.getSeconds()
        // console.log(s);
        this.time++;
        this.draw(this.time);

      },1000)
    }
  }
}
</script>
<style scoped>
.box{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #000;
}
</style>


