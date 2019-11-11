<template>
    <div class="admin-head-all" >


        <div class="admin-head-right">
          <div class="admin-head-right-meum ispc" @click="btnClose()">
            <i class="el-icon-s-fold" v-if="!isclose"></i>
            <i class="el-icon-s-unfold" v-if="isclose"></i>
          </div>

          <div class="admin-head-right-meum ismobile" @click="updateWidth(isclose)">
            <i class="el-icon-s-fold" v-if="!isclose"></i>
            <i class="el-icon-s-unfold" v-if="isclose"></i>
          </div>


          <div class="admin-head-right-user">
            <div class="admin-head-right-img">
              <img src="../../assets/images/authImg.jpg" @click="ishide=!ishide" />
            </div>
            <el-collapse-transition>
              <div class="admin-head-right-meunList" v-if="ishide"  >
                <ul>
                  <li><a href="#"><i class="el-icon-view"></i>预览站点</a></li>
                  <li><a href="#"><i class="el-icon-setting"></i>个人设置</a></li>
                  <li @click="logout"><a href="#"><i class="el-icon-switch-button"  ></i>注销</a></li>
                </ul>
              </div>
            </el-collapse-transition>
          </div>
        </div>


    </div>
</template>

<script>
  import eventVue from '../../assets/event'
  import  utils from '../../utils'
    export default {
        name: "AdminHead",
        data:()=>({
          isclose:false,
          ishide:false,
        }),
       methods:{
         logout(){
           // localStorage.removeItem("token");
           // this.$store.dispatch("setAuthenticated",false)
           // this.$store.dispatch("setUser","")
           // this.$router.push('/adminLogin')
           utils.AdminLogOut();
         },
         btnClose(){
           this.isclose=!this.isclose;
           eventVue.$emit("btnClose",this.isclose)   //$emit这个方法会触发一个事件
         },
         updateWidth(isclose){
           this.isclose=!this.isclose;
           this.$emit('updateWidth',isclose);
         },
       }
    }
</script>

<style>

.admin-head-all{
  width: 100%;
  height: 70px;
  background-color: aqua;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  box-shadow: 5px 5px 10px #ccc;
}
.admin-head-right{
  height: 70px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  flex:1;
}
.admin-head-right-meum{
  width: auto;
  height: auto;
  padding-left: 10px;
}
.admin-head-right-meum i{
  font-size: 25px;
  color: #3031339e;
  cursor: pointer;
}
.admin-head-right-meum i:hover{
  color: #555;
}
.admin-head-right-user{
  padding-right: 35px;
  width: auto;
  position: absolute;
  right: 0;
  top: 0px;
}
.admin-head-right-img{
  display: flex;
  align-items: center;
  height: 70px;
}
.admin-head-right-user img{
  width: 36px;
  height: 36px;
  border: 2px solid #edf0f0;
  border-radius: 50%;
  cursor: pointer;
}

.admin-head-right-meunList{
  width: 140px;
  height: auto;
  position: absolute;
  background-color: #ffffff;
  top:100%;
  right: 20px;
  border: solid 1px #55555559;
  box-shadow: 1px 1px 1px #ccc;
  border-radius: 5px;
}
.admin-head-right-meunList ul{
  margin: 10px 0;
}
.admin-head-right-meunList ul li{
  font-size: 14px;
  float: none;
  padding:4px 0 4px 15px;
  cursor: pointer;
  transition: all 0.4s;
  border-radius: 5px;
}
.admin-head-right-meunList ul li a {
  width: 100%;
  color: black;
}

.admin-head-right-meunList ul li:hover{
    background-color: #555;
}

.admin-head-right-meunList ul li:hover a{
  color: aliceblue;
}

.admin-head-right-meunList ul li i{
  margin-right: 4px;
}

.ispc{
  display: block;
}
.ismobile{
  display: none;
}
@media screen and (max-width: 750px){
.admin-head-right-user{
  padding-right: 10px;
}
}

@media screen and (max-width: 480px){
  .ismobile{
    display: block;
  }
  .ispc{
    display: none;
  }
}


</style>
