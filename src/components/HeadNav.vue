<template>
<div class="head">

  <div class="head-pc">
      <div class="head-left animated rubberBand">

          <span class="head-line"  >YeHao</span>

      </div>
    <div class="head-right  animated bounceInDown" >
      <ul>
          <li><router-link to="/Home"><i class="el-icon-s-home">首页</i></router-link> </li>
          <!--<li><i class="el-icon-s-custom"><a href="">关于</a></i></li>-->
          <li><router-link to="/Taglist"><i class="el-icon-s-promotion">分类/标签 </i></router-link></li>
          <li><router-link to="/Archives"><i class="el-icon-s-cooperation">归档</i></router-link></li>
          <li v-for="m in meunList">
            <a @click="getUrl(m)">
              <i :class="m.icon" >
                {{m.name}}
              </i>
              </a>

          </li>


          <li class="pc-i-heght" >

              <div class="iconfont  icon-chaxun icontop"  @click="btnSearch"></div>
              <div class="search-input-icon" >
                <input type="text"  v-on:keyup.enter="btnSearch" id="search-inp" v-model="title" class="search-input" placeholder="搜索..." maxlength="30" autocomplete="off">
              </div>

          </li>
      </ul>
    </div>
    <div style="clear:both"></div>
  </div>


    <div class="head-mobile">
      <div class="head-left animated rubberBand">
        <span class="head-line"  >YeHao</span>
      </div>

      <div class="head-right-mobile  animated bounceInDown" >

        <div class="icontop-mobile">
          <i class="iconfont  icon-chaxun" @click="btnSearch"></i>
        </div>

        <input type="text" v-model="title"  v-on:keyup.enter="btnSearch" class="search-mobile-input" placeholder="搜索..." maxlength="30" autocomplete="off" />

        <i class="el-icon-menu nav-icon"   @click="ishide=!ishide"></i>


      </div>

      <div style="clear:both"></div>

      <div class="mobile-nav-all">
        <el-collapse-transition>
          <div class="mobile-nav" v-show="ishide">
            <ul>
              <li><i class="el-icon-s-home"><router-link to="/">首页</router-link></i></li>
              <li><i class="el-icon-s-promotion"><router-link to="/Taglist">分类/标签</router-link></i></li>
              <li><i class="el-icon-s-cooperation"><router-link to="/Archives">归档</router-link></i></li>
              <li v-for="m in meunList">
                <i :class="m.icon" >
                <a @click="getUrl(m)">
                    {{m.name}}
                </a>
                </i>
              </li>

            </ul>
          </div>
      </el-collapse-transition>
      </div>
    </div>


</div>
</template>

<script>
  import  '../assets/iconfont/search/iconfont.css'
  import {router} from '../router/index'
    export default {
        name: "HeadNav",
        data:()=>({
           ishide:false,
           title:"",
           meunList:[],
          }),
        created(){
          this.getMeun()
        },
        methods:{
          btnSearch(){
            this.$store.dispatch("setSearch",!this.$store.getters.search)
            this.$store.dispatch("setTitle",this.title);
          },
          getUrl(obj){
            var path=obj.url!=""?obj.url:obj.id;
            this.$router.push({path: "/BlogPage/"+path})
          },
          getMeun(){
            this.$axios.get('/api/blog/menu',null)
              .then(res=>{
                this.meunList=res.data.data;
                console.log(this.meunList)
                // for(var i=0;i<this.meunList.length;i++){
                //   var url="/test"
                //   if(this.meunList[i].url!=""){
                //     url="/"+this.meunList[i].url
                //   }
                //     router.addRoutes([
                //         {
                //           path: url+"/*",
                //           name: 'test',
                //           component: () => import('../components/views/BlogDetail')
                //         }
                //     ])
                // }
              })

          }



        }
        }
</script>

<style>
.head{
  width: 100%;
  height: auto;
  line-height: 90px;
  background: #f5f5f5;
}
.head-pc{
  /*width: 50%;*/
  max-width: 1000px;
  height: 100%;
  line-height: 100%;
  margin: 0 auto;
  min-width: 652px;
}
.head-left{
  font-weight: bolder;
  font-size: 22px;
  float: left;
  margin-left: 15px;
}
.head-right{
  float: right;
  font-size: 13px;
  color: #555;
}


.head-right ul li{
  height: 90px;
  line-height: 90px;
  float: left;
}
.head-right ul li i{
  padding: 8px 15px;
  cursor: pointer;
}
.head-right ul li a{
  color: #555;
  text-decoration: none;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.head-line{
  border-bottom: black solid 2px;
  border-top:black solid 2px;
  margin: 0 auto;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 90px;
  line-height: 90px;
}

.head-pc .head-right ul li i:hover {
  background-color: #555;
  color: #ffffff;
  transition: all 0.5s ease 0s;
  border-radius: 15px;
}

.head-pc .head-right ul li i:hover a{
  color: #ffffff;
  transition: all 0.5s ease 0s;
}


.head-mobile{
   width: 100%;
   height: auto;
   line-height: 60px;
   display: none;
  }

.nav-icon{
  font-size: 25px;
  position: absolute;
  top: 50%;
  margin-top: -12.5px;
  right: 3%;
}
.search-mobile-input{
  font-size: 14px;
  line-height: 30px;
  position: relative;
  top: 0;
  right: 30px;
  min-width: 130px;
  width: 150px;
  height: 30px;
  padding: 0 20px 0 10px;
  color: #313131;
  border: 1px solid #eb5055;
  border-radius: 20px;
  margin-right: 8px;
  background-color: #fff;
  -webkit-appearance: none;
}


/*.search-mobile-input i:hover{*/
  /*color: rgba(38, 42, 48, 0.2);*/
/*}*/






.mobile-nav ul li{
  float: none;
  font-size: 14px;
  padding-top:6px ;
  padding-bottom: 6px;
  margin-top: 2px;
  margin-bottom: 2px;
  height: 20px;
  line-height: 20px;
}


.mobile-nav ul li i a{
  color: #555;
  padding-left: 18px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.mobile-nav{
  height: auto;
}

.mobile-nav-all{
  width: 95%;
  height: 100%;
  padding-left: 5%;
}

.search-input-icon{
  line-height: 30px;
  position: absolute;
  top: 28px;
  right: 57px;
  display: inline-block;
  width: 400px;
  max-width: 100%;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 3px;
  z-index: 3;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease-out;
}

.icontop{
  position: relative;
  right: 0px;
  font-size: 22px;
  cursor: pointer;
  /*position: relative;*/
  /*right: 0px;*/
  /*font-size: 22px;*/
  /*height: 0;*/
  z-index: 5;
  /*cursor: pointer;*/
}


.icontop:hover+.search-input-icon{
  visibility: visible;
  opacity: 1;
}



.search-input{
  font-size: 14px;
  line-height: 30px;
  /*position: absolute;*/
  /*top: 0;*/
  /*left: 0;*/
  width: 100%;
  height: 30px;
  padding: 0 40px 0 18px;
  color: #313131;
  border: 1px solid #eb5055;
  border-radius: 20px;
  outline: 0;
  background-color: #fff;
  -webkit-appearance: none;
  z-index: 3;
}

.search-input-icon:hover{
  visibility: visible;
  opacity: 1;
}


.pc-i-heght{
  line-height: 90px;
}

.head-right-mobile{
  float: right;
}



.icontop-mobile{
  position: absolute;
  right: 44px;
  /*font-size: 25px;*/
  top: 0;
  z-index: 5;
}
.icontop-mobile i{
  font-size: 25px;
}
.icontop-mobile i:hover{
  color: #262a30c2;
}


@media screen and (max-width: 650px) {
  .head{
    /*height: 58px;*/
    line-height: 100%;
    height:auto;
    width: 100%;
    min-width: auto;
  }
  .head-mobile{
    display: block;
  }
  .head-pc{
    display: none;
  }
  .head-line{
    height: 60px;
    line-height: 60px;
  }


}




</style>
