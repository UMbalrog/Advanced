<template>
  <div>
    <div class="box">
      <canvas width="600" height="600" ref="can">

      </canvas>
    </div>
  </div>
</template>
<script>
const rem = 1, r = 300;
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
      
      let canvas = this.$refs['can'];
      // var canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        this.ctx = canvas.getContext('2d');
        // this.ctx.save(); //保存当前环境的状态
        this.ctx.translate(r,r); 
      }

    },
    drawBackground() {
      let hourNumbers=[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];//12个小时画圆时使用的数组，圆形是从3的位置为起始位置开始顺时针来画的
      this.ctx.save();//保存当前环境的状态
      // this.ctx.beginPath();//重置当前路径
      hourNumbers.forEach((number,i) => {
        // this.ctx.beginPath();//重置当前路径
        var rad =2 * Math.PI /12 * i;//先求出每个点的弧度 sin和cos使用的是弧度的值
        var x=Math.cos(rad) * (r-30*rem);
        var y=Math.sin(rad) * (r-30*rem);
    
        this.ctx.fillText(number, x, y);//方法在画布上绘制填色的文本。文本的默认颜色是黑色。为每个坐标x和y上的设置数值number
      
      
      });
      // this.ctx.restore();//返回之前保存过的路径状态和属性
    },
    drawHour(hour, minute, second) {//画时针
      let ctx = this.ctx;
      ctx.save();//保存当前环境的状态
      ctx.beginPath();//重置当前路径
      var rad= 2*Math.PI /12 * hour;//求出每小时所对应的弧长
      var mrad= 2*Math.PI /12/60 *minute;//求出每分钟对应的弧长
      var sec= 2*Math.PI /12/60/60 *second;//求出每分钟对应的弧长
      ctx.rotate(rad+mrad+sec);//旋转当前的绘图
      ctx.lineWidth=6*rem;//设置当前的线条宽度
      // ctx.lineCap="round";//设置或返回线条末端线帽的样式为圆形
      ctx.moveTo(0, 10*rem);//设置要画的开始位置
      ctx.lineTo(0, -r/2);//设置结束的位置  因为设置坐标原点为（r，r），所以向上为负值
      ctx.stroke();//绘制图形
      ctx.restore();//返回之前保存过的路径状态和属性
    },
    drawMintue(minute, second) {//画分针  和时针画法相同
      let ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      var rad= Math.PI / 30 * minute;
      var sec= Math.PI / 30/ 60 * second;
      ctx.rotate(rad+sec);
      ctx.lineWidth=3*rem;
      ctx.lineCap="round";
      ctx.moveTo(0, 10*rem);
      ctx.lineTo(0, -r+20*rem);
      ctx.stroke();
      ctx.restore();
    },
    drawSecond(second) {//画秒针
      let ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle='red';
      var rad = Math.PI / 30 * second;
      ctx.rotate(rad);
      ctx.moveTo(-2*rem, 20*rem);
      ctx.lineTo(2*rem, 20*rem);
      ctx.lineTo(0, -r+18*rem);
      ctx.lineTo(-1, -r+18*rem);
      ctx.fill();
      // ctx.stroke();
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
      ctx.clearRect(-300, -300, 600, 600);//清除指针运动时留下的轨迹
      var now=new Date();
      var hour= now.getHours();//获取当前小时
      var minute=now.getMinutes();//获取分钟
      var second=now.getSeconds();//获取秒
      this.drawBackground();	//调用函数
      this.drawHour(hour, minute, second);
      this.drawMintue(minute, second);
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
  width: 600px;
  height: 600px;
  border-radius: 50%;
  border: 1px solid #000;
}
</style>


