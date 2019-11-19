<template>
    <div class="adminleft-all">
      <el-menu :default-active="defaultActive" router background-color="#2f353f"
               text-color="#a7b1c2" active-text-color="#ffffff"  class="el-menu-vertical-demo"
               @select="handleOpen" @close="handleClose" :collapse="isCollapse">

        <div class="admin-head-left" >
          <div class="img-div">
            <a href="#">
              <img src="../../assets/images/unicorn.png" />
            </a>
          </div>
          <div  class="admin-head-left-font" >
            <div> YeHao Blog</div>

           </div>
        </div>

        <!--根据 type 判断 菜单类型 生成菜单.0  为普通菜单  1 为 多级菜单 必须指定子菜单 数组-->
      <div  v-for="item in items">
        <!--<div  v-if="item.type==0">-->
          <el-menu-item   :key="item.url" :index="item.url" @click="updateTitle($route.name)">
            <i :class="item.class"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>

      </div>

      </el-menu>
    </div>
</template>

<script>
  import eventVue from '../../assets/event'

    export default {
        props:['title'],
        name: "adminLeft",
      data() {
        return {
          isCollapse: false,
          defaultActive:"/adminIndex",
          screenWidth: document.body.clientWidth,
          items:[{url:"/adminIndex",class:"el-icon-odometer",name:"仪表盘"},
                 {url:"/AdminNew",class:"el-icon-edit",name:"发布文章"},
                 {url:"/AdminArticles",class:"el-icon-reading",name:"文章管理"},
                 {url:"/AdminPages",class:"el-icon-document",name:"页面管理"},
                 {url:"/AdminFile",class:"el-icon-folder-opened",name:"文件管理"},
                 // {url:"/AdminOther",class:"el-icon-copy-document",name:"其他",},
                 {url:"/AdminTag",class:"el-icon-price-tag",name:"分类/标签"},
                 {url:"/AdminComments",class:"el-icon-chat-dot-round",name:"评论"},
                 {url:"/AdminSeting",class:"el-icon-setting",name:"系统设置"},
                ],       //type  url  class name menus
        };
      },
      created:function(){
        this.btnShow()
        // this.btnHide()
        if(this.screenWidth<450){
          this.isCollapse=true
        }else{
          this.isCollapse=false
        }


      },
      watch:{
        screenWidth(val){
          // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenWidth = val
          let that = this
          setTimeout(function(){
            // 打印screenWidth变化的值
            if(that.screenWidth<480){
              that.isCollapse=true
            }else{
              that.isCollapse=false
            }
          },1000)
        }
      },
      mounted () {
        const that = this
        //检测页面 分辨率
        window.onresize = () => {
          return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
          })()
        }
        //刷新 菜单 高亮 问题
        this.defaultActive=this.$route.path
        var pathName= this.$route.query.pathName
        if(pathName){
          this.defaultActive="/"+pathName
        }
      },

      methods: {
        handleOpen(key, keyPath) {
          this.defaultActive=key;
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        btnShow(){
          eventVue.$on("btnClose",(message)=>{   //这里最好用箭头函数，不然this指向有问题
            this.isCollapse = message
          })
        },


        updateTitle(title){
          this.$emit('updateTitle',title);
      },
      }

    }
</script>

<style>


.admin-head-left{
  height: 70px;
  background-color: #eee;
  display: flex;
  align-items: center;
}
.admin-head-left img{
  width: 50px;
}

.el-menu-vertical-demo:not(.el-menu--collapse){
  width: 240px;
  height: 100%;
  background-color: #2f353f;
  margin: 0;
}

.el-menu--collapse{
  height: 100% ;
  background-color: #2f353f;
  margin: 0;
}
.adminleft-all ul{
  overflow:hidden
}
.adminleft-all ui li{
  list-style: none;
}
.adminleft-all i{
  font-size: 22px;
}
.img-div{
  height: auto;
  width: auto;
  padding-left: 10px;
}
.admin-head-left-font{
  padding-left: 10px;
  font-size: 25px;
  color: #555;
}
.admin-head-left-font div{
  width: 100%;
  white-space: nowrap
}
/*.adminleft-all ul{*/
  /*!*transition:all 0.3s ease 0s*!*/
/*}*/
@media screen and (max-width: 1000px){
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width: 130px;
  }
  .admin-head-left-font{
    font-size: 13px;
    padding-left: 3px;
  }

}

/*@media screen and (max-width: 450px){*/
  /*.adminleft-all ul{*/
    /*transition:width 0.4s ease 0s*/
  /*}*/
/*}*/




</style>
