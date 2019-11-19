<template>
    <div class="footer-all">
      <div class="footer-body">
        <p>本博客已运行:{{time}}</p>
        <p>@YeHao ———— java开发、前端开发、python开发 什么都学的程序员~</p>
        <p>本站由 @YeHao 创建 - © 2019. 粤ICP备19136746号</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data:()=>({
          time:0
        }),
        methods: {
          timer() {
            let startTime = new Date('2019/11/09 00:00:00')
            let timer = setInterval(() => {
              let time = new Date() - startTime
              let day = parseInt(time / 1000 / 60 / 60 / 24, 10)
              let hour = parseInt(time / 1000 / 60 / 60 % 24, 10)
              let minute = parseInt(time / 1000 / 60 % 60, 10)
              let second = parseInt(time / 1000 % 60, 10)
              this.time = `${day}天${hour}小时${minute}分${second}秒`
            }, 1000)
          }
        },
      created(){
          this.timer()
      }


    }
</script>

<style>
.footer-all{
  background-color: #262a30;
  width: 100%;
  /*height: 90px;*/
  /*position: relative;*/
  /*bottom: 0;*/
  /*margin-top: -90px;*/
  text-align: center;
}
.footer-body{
  padding: 25px 0;
  width: 100%;
  height: auto;
}
.footer-all p{
  margin-bottom: 0 ;
  font-size: 14px;
  color: #999;
}

</style>
