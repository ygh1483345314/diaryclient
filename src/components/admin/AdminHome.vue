<template>
  <div class="flex-all">
    <AdminLeft  ref="adminLeftref" class="admin-home-left"   v-on:updateTitle="updateTitle($event)" ></AdminLeft>

    <div class="admin-home-all">
        <AdminHead class="adminh-home-head"  v-on:updateWidth="updateWidth($event)" ></AdminHead>
        <div class="adminh-home-content">
          <div class="admin-index-all">
            <div class="admin-index-body">
              <div class="admin-index-head">
                <div class="admin-index-head-font">{{title}}</div>
              </div>
              <router-view v-bind:title = "title" />
            </div>
          </div>



        </div>
      <!--<router-view/>-->
    </div>

  </div>
</template>

<script>
  import AdminHead from './AdminHead'
  import AdminLeft from './AdminLeft'
    export default {
        name: "AdminHome",
      components:{
        AdminHead,
        AdminLeft
      },
      data:()=>({
        title:"My Blog",
        screenWidth: document.body.clientWidth,
      }),
      methods:{
        updateTitle(res){
          this.title=res
        },
        updateWidth(res){
          if(res){
            this.$refs.adminLeftref.$el.children[0].style.width="60px"
          }else{
            this.$refs.adminLeftref.$el.children[0].style.width=0
          }
        }

      },

      mounted () {
          this.title=this.$route.name
        // const that = this
        // window.onresize = () => {
        //   return (() => {
        //     window.screenWidth = document.body.clientWidth
        //     that.screenWidth = window.screenWidth
        //
        //   })()
        // }
      },
      created(){
        // let that = this
        // if(that.screenWidth<1050){
        //   that.$refs.adminLeftref.isCollapse=true
        // }else{
        //   that.$refs.adminLeftref.isCollapse=false
        // }
      },

      // watch:{
      //   screenWidth(val){
      //     // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      //       // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
      //       this.screenWidth = val
      //       let that = this
      //       setTimeout(function(){
      //         // 打印screenWidth变化的值
      //         console.log(that.screenWidth)
      //         if(that.screenWidth<1050){
      //           that.$refs.adminLeftref.isCollapse=true
      //         }else{
      //           that.$refs.adminLeftref.isCollapse=false
      //         }
      //       },100)
      //
      //   }
      // }

    }
</script>

<style>

.flex-all{
  height: 100vh;
  display: flex;
}

.admin-home-left{
  flex: none;
  overflow-y: auto;
  display: block;
  transition:all 0.3s ease 0s;
  /*width: 12%;*/
}



.admin-home-all{
  flex: auto;
  display: flex;
  flex-direction: column;
  width: 0;
  /*min-width: 800px;*/
  /*height: 100%;*/
  /*width: 88%;*/
}


.adminh-home-content{
  /*flex: auto;*/
  background-color: #e7e7e773;
  height: 100%;
  overflow-y: auto;
  padding:20px 24px 0px 24px;
}

.admin-index-all{
  /*width: calc(100% - 48px);*/
  height: auto;
  padding:20px 24px 0px 24px ;
}

.admin-index-body{
  /*min-height:calc(100% - 30px);*/
  height: auto;
  background-color: #fff;
  box-shadow: 5px 5px 10px #ccc;
  border-radius: 10px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 5px;
}


.admin-index-head{
  /*width: 100%;*/
  height: 30px;
  background-color: #6e8cd7;
  padding: 10px 20px;
  line-height: 30px;
  border-radius: 10px;
}
.admin-index-head-font{
  font-size: 16px;
  color: #fff;
}

.width-console{
  width: 0px;
}

@media screen and (max-width: 1000px){
  .adminh-home-content{
    padding: 5px 6px 0px 6px;
  }
  .admin-index-all{
    padding: 5px 6px 0px 6px;
    width: auto;
  }
  .admin-index-head{
    padding: 5px 10px;
  }
.admin-index-head-font{
  font-size: 13px;
}
  .adminh-home-content{
    /*width: auto;*/
    padding: 15px 0;
  }
}





/*新增页面*/





.adminnew-from-row{
  display: flex;
  width: 100%;
}

.adminnew-from-flex-col{
  flex: 1;
  margin-right: 10px;
}
.adminnew-from-flex-col-right{
  text-align: right;
}
.adminnew-from-flex-col-ba{
  flex: 1;
  margin-right: 10px;
  width: 0;
  /*overflow-x: auto;*/
}


.adminnew-from-flex-col-mini{
  flex: 0.2;
  margin-right: 10px;
}


.admin-new-all{
  height: auto;
  background-color: #fff;
  box-shadow: 5px 5px 10px #ccc;
  border-radius: 10px;
}

.admin-new-body{
  height: auto;
  background-color: #fff;
  box-shadow: 5px 5px 10px #ccc;
  border-radius: 10px;
}
.adminnew-form{
  width: auto;
  max-width: 100%;
  height: 100%;
  padding: 10px;
}
.selectinput{
  width: 100%;
}
.el-tag.el-tag--info{
  background-color: #ecf5ff;
  color: #409eff;
  border: 1px solid #d9ecff;
}
.tag-input{
  border: 1px solid #ccc;
  background: #FFF;
  padding: 2px;
  height: 28px;
  overflow-x: hidden;
  overflow-y: auto;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 5px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.el-tag{
  /*height: 23px;*/
  /*line-height: 30px;*/
  /*margin:0 2px;*/
  display: block;
  float: left;
  padding: 2px 5px;
  text-decoration: none;
  background: #317eeb;
  color: #fff;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 13px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 5px;
  height: 25px;
  line-height:20px;
}

.button-new-tag {
  width: 100% ;
  padding: 5px;
  height: 30px;
}

.mditor {
  margin: 45px auto;
  width: 100%;
}

.v-note-wrapper .v-note-op.shadow{
  background-color: #55555517;
  /*overflow-y: auto;*/
}


.btnright{
  padding: 10px;
}

.controls{
  transition: all 0.3s;
}
.marboom{
  margin-bottom: 20px;
}
.picklable{
  font-size: 15px;
}
.btn-boom-right{
  text-align: right;
}

.input-new{
  width: 80px;
  height: 28px;
  margin: 0px;
  font-size: 13px;
  border: 1px solid transparent;
  padding: 2px;
  background: transparent;
  color: #000;
  outline: 0px;
  /*margin-right: 5px;*/
  /*margin-bottom: 5px;*/
}

.input-new::-webkit-input-placeholder{
  color: #ccc;
}

.w-e-toolbar{
  flex-wrap: wrap;
}
.date-width{
  width: 265px;
}
.v-note-wrapper{
  z-index: 0 !important;
}
@media screen and (max-width: 480px){
  .adminnew-from-row{
    display: block;
    width: 100%;
  }

  .adminnew-from-flex-col-ba{
    width: auto;
  }
  .adminnew-form{
    padding: 5px;
  }
  .btnright{
    padding-right: 2px;
  }
  .v-note-wrapper{
    min-width: 100% !important;
    width: 100%;
    min-height: 400px !important;
  }

  .el-form-item__content{
    width: auto;
  }
  .date-width{
    width: auto;
  }

}







/*@media screen and (max-width: 500px){*/
  /*!*.admin-home-left{*!*/
    /*!*width: 0;*!*/
  /*!*}*!*/
/*}*/




</style>
