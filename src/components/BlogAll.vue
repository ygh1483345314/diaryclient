<template>
<div>
  <div class="body-all">
    <div class="left-body">
      <div class="router-body">
        <HeadNav ></HeadNav>
        <div class="router-all">
          <router-view />
        </div>
      </div>
      <Footer></Footer>
    </div>
    <rightNav ref="rightchild"></rightNav>
  </div>
  <div class="right-down-nav"  @click="show()" >
    <span class="span1_nav toggle-line" :class="{'span1':hideRightNav}"></span>
    <span  class="span2_nav toggle-line" :class="{'span2':hideRightNav}"></span>
    <span  class="span3_nav toggle-line" :class="{'span3':hideRightNav}"></span>
  </div>
</div>

</template>

<script>

  import HeadNav from './HeadNav'
  import  rightNav from  './rightNav'
  import  Footer from  './Footer'
  import {
    mapActions,
    mapGetters
  } from 'vuex'

    export default {
      name: "BlogAll",
      components:{
        HeadNav,
        rightNav,
        Footer
      },
      mounted:function(){
        // this.setSelectRightnav(false)
      },
      created(){
        this.getPath();
      },
      data:()=>({
        // ishide:false,
        span1:this.hideRightNav,
      }),
      computed: {
        ...mapGetters([
          'hideRightNav',
          'selectRightnav'
        ])
      },
      watch:{
        '$route':'getPath'
        // '$route' (to,from) {
        //   if(to.path=='/BlogDetail'){
        //     this.setSelectRightnav(true)
        //     this.setHideRightNav(true)
        //     this.span1=true
        //     return
        //   }
        //
        //   if(from.path=='/BlogDetail'){
        //     this.setSelectRightnav(false)
        //     this.setHideRightNav(false)
        //     this.span1=false
        //   }
        // }
      },
      methods:{
        btnSearch(res){
          console.log(res)
          // this.$refs.adminLeftref.$el.children[0].style.width=res
        },
        getPath(){
          if(this.$route.path=="/BlogDetail"){
                // this.setSelectRightnav(true)
                // this.setHideRightNav(true)
                // this.span1=true
          }else{
                this.setSelectRightnav(false)
                this.setHideRightNav(false)
                // this.span1=this.hideRightNav
          }
        },
        ...mapActions([
            'setHideRightNav',
            'setSelectRightnav'
          ]
        ),
        show: function () {
          this.setHideRightNav(!this.hideRightNav)
          this.span1=this.hideRightNav
          // this.ishide = !this.ishide;
          // this.span1 = !this.span1;
          // this.$refs.rightchild.ishide = this.ishide
          // thisishide.$refs.rightchild.selectNav = false
          // // this.setArticleMenu=false;
          // // console.log(this.$refs.rightchild)
          // if (this.ishide) {
          //   this.$refs.rightchild.$el.style.width = "290px";
          //   this.$refs.rightchild.$el.style.transition = "all 0.3s ease 0s";
          // } else {
          //   this.$refs.rightchild.$el.style.width = "0";
          //   this.$refs.rightchild.$el.style.transition = "all 0.3s ease 0s";
          // }



        }
      }

    }
</script>

<style>
  .router-body{
    height: auto;
    min-height: calc(100vh - 107px);
    padding-bottom: 90px;
    padding-top: 90px;
    margin-bottom: -90px;
    margin-top: -90px;
  }
  .router-all{
    width: 100%;
    height: 100%;
  }
  .left-body{
    height: auto;
    flex:1;
  }

  .body-all {
    /*padding-right: auto;*/
    width: 100%;
    height: 100%;
    display:flex;
  }


  @media screen and (max-width: 960px){
    .body-all {
      padding-right: 0
    }
    .right-down-nav{
      display: none;
    }
  }




  .right-down-nav{
    position: fixed;
    width: 16px;
    height: 20px;
    background-color: #262a30;
    right: 10px;
    bottom: 45px;
    padding: 3px 3px 5px 3px ;
    z-index: 1050;
    cursor: pointer;
    line-height: 0;
  }
  .toggle-line{
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 2px;
    margin-top: 4px;
    background-color: #fff;
    transition: all 0.3s ease 0s;
  }

  .right-down-nav:hover .span1_nav{
    width: 50%;
    top: 3px;
    transform: rotateZ(-45deg); opacity: 1; transition: all 0.3s ease 0s;
  }

  .right-down-nav:hover .span3_nav{
    width: 50%;
    top: -3px;
    transform: rotateZ(45deg); opacity: 1; transition: all 0.3s ease 0s;
  }

  .span1{
    width: 100% !important; top: 6px !important; transform: rotateZ(-45deg) !important; opacity: 1 !important; transition: all 0.3s ease 0s !important;
  }
  .span2{
    width: 100% !important; top: 0px !important; transform: rotateZ(0deg) !important; opacity: 0 !important; transition: all 0.3s ease 0s !important;

  }
  .span3{
    width: 100% !important; top: -6px !important; transform: rotateZ(45deg) !important; opacity: 1 !important; transition: all 0.3s ease 0s !important;
  }

</style>
