<template>
  <div >
    <div class="show_box">
      <div class="list">
        <div v-for="(item,k) in arr" :key="k">
          <div>{{item}}</div>
        </div>
      </div>
      <div class="pre" @click="pre">左</div>
      <div class="next" @click="next">next</div>
    </div>
    <p>the width of content is 500px, flex-basic of flex item is 120px.</p>
    <p>A, B, C are flex-shrink:1. D and E are flex-shrink:2</p>
    <p>the width of D is not the same as A's</p>
    <div id="content">
      <div class="box" style="background-color:red;">A</div>
      <div class="box" style="background-color:lightblue;">B</div>
      <div class="box" style="background-color:yellow;">C</div>
      <div class="box1" style="background-color:brown;">D</div>
      <div class="box1" style="background-color:lightgreen;">E</div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return{
      arr: ['123','123','123'],
      width: 300,
      left: 0,
      showindex: 0
    }
  },
  method:{
    pre() {
      this.showindex ;
      // 上一个按钮，列表向右移动，left +300;
      this.left += this.width;
      // 边界问题, 当移动到最右侧时，再移是跳致最后一个
      let len = (this.arr.length-1) * this.width;
      if(this.left > 0){
        this.left = (len*-1);
      }
    },
    next() {
      this.showindex ++;
      // 下一个按钮，列表向左移动，left -300;
      this.left -= this.width;
      // 边界问题, 当移动到最左侧时，回跳致第一个
      let len = (this.arr.length-1) * this.width;
      if(this.left < (len*-1)){
        this.left = 0;
      }
    },
    auto() {
      setInterval(() => {
        this.next();
      }, 2000)
    }
  }
}
</script>
<style scoped>
#content {
  display: flex;
  width: 500px;
}

#content div {
  width: 120px;
  border: 3px solid rgba(0,0,0,.2);
}

.box {
  flex-shrink: 1;
}

.box1 {
  flex-shrink: 2;
}
</style>
