<template>
  <div style="position: relative;padding: 30px 10px;height: 100%;animation: show 0.8s" class="animated fadeIn">
  <div class="archivesAll">

      <div class="archives-line"></div>
      <div class="archives-title"><p>目前共计{{searchVo.total}}篇文章~</p></div>


      <div v-for="item in articlesArr" class="archives-body">
        <p>{{item.year}}年</p>

        <div  v-for="itemMonth in item.monthDataSort" class="archives-body month">
          <p>{{itemMonth.month}}月</p>
          <div class="archives-note"  v-for="obj in itemMonth.archivesVoList">
            <div class="archives-tetile"><router-link :to="{path:'/BlogDetail/'+obj.id}"  v-html="obj.title"></router-link></div>
            <div class="archives-date"><i class="el-icon-date"></i>
              <span class="pc-ishide">发表于 </span>{{obj.dateb}} | <i class="el-icon-folder"></i>
              <span class="pc-ishide"></span>
              <router-link :key="t" v-for="t  in obj.type" style="margin: 0 2px" class="detail-type"
                           :to="{path:'/Home',query:{type:t}}">{{t}}</router-link>
            </div>
            <div class="detail-note row">
              {{obj.html}}
            </div>
            <div class="archives-items-lable">
              <i  v-for="t in obj.tag" class="archives-lable el-icon-s-promotion" >
                {{t}}
              </i>
            </div>
          </div>

        </div>


      </div>


    <el-pagination
      class="pages-Pc"
      style="text-align: center"
      background
      layout="prev, pager, next"
      :page-size="searchVo.size"
      :total="searchVo.total"
      :current-page="searchVo.page"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    >
    </el-pagination>



    <el-pagination
      class="pages-mobile"
      style="text-align: center"
      small
      background
      layout="prev, pager, next"
      :page-size="searchVo.size"
      :total="searchVo.total"
      :current-page="searchVo.page"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    >
    </el-pagination>


   </div>


  </div>



</template>

<script>
    export default {
        name: "Archives",
      data:()=>({
        articlesArr:[],
        searchVo:{
          title:"",
          page:0,
          size:20,
          total:0,
          types:[],
          tags:[]
        },
      }),
      created(){
        // var type=this.$route.query.type
        // var tag=this.$route.query.tag
        // if(type){
        //   var  types=new Array();
        //   types.push(type);
        //   this.searchVo.type=types
        // }
        // if(tag){
        //   var  tags=new Array();
        //   tags.push(tag);
        //   this.searchVo.tags=tags
        // }
        this.getBlogList()
      },
      methods:{
        getBlogList(title){
          if(title!=null){
            this.searchVo.page=0;
            this.searchVo.title=title
          }
          this.$axios.post('/api/blog/ArchivesList',this.searchVo)
            .then(res=>{
              var data=res.data.data;
              this.searchVo.total=data.total;
              this.searchVo.page=data.page;
              this.articlesArr=data.articlesArr
            })
        },
        handleCurrentChange(val){
          this.searchVo.page=val
          this.getBlogList();
        }

      }
    }
</script>

<style>
.archivesAll{
  width: calc(50% - 15px);
  height: 100%;
  margin: 0 auto;
  padding: 15px;
  /*border-left: solid 1px #eee;*/
}
  .archives-title{
  position: relative;
  color: #555;
  padding: 0 15px;
  font-size: 16px;
  margin-bottom: 20px
  }

.archives-title p:before{
  position: absolute;
  left: -4px;
  top: 5px;
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #999;
}
.archives-body{
  position: relative;
  color: #555;
  padding: 0 10px;
  font-size: 28px;
  margin-bottom: 20px
}
.archives-body p{
  font-size: 28px;
  margin-bottom: 20px;
}
.archives-body:before{
  position: absolute;
  left: -4px;
  top: 10px;
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #999;
}
.month:before{
  left: -15px;
}


.archives-tetile{
  position: relative;
  display: inline-block;
  font-size: 18px;
  color: #262a30;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.archives-tetile a{
  color: #555;
}
.archives-note{
  width: 100%;
  padding: 20px;
  border: solid 1px #ccc ;
  box-shadow: 5px 5px 10px #ccc;
  height: auto;
  line-height: 100%;
  border-radius: 5px;
  margin: 10px 0;
}

.archives-tetile:after{
  content: "";
  width: 0;
  height: 2px;
  background: #555;
  position: absolute;
  bottom: -1px;
  left: 50%;
  transition: all .2s;
}


.archives-tetile:hover:after,.archives-tetile.active:after{
  left: 0%;
  width: 100%;
}

.archives-date{
  font-size: 12px;
  color: #555;
  margin-top: 10px;
  margin-bottom: 20px;
}
.detail-type{
  color: #555;
}
.row{
  border-left: 1px #555;
}
.archives-note{
  font-size: 16px;
  color: #555;
  padding-bottom: 20px;
}

.archives-items-lable{
  width: 100%;
  padding: 10px 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  text-align: center;
}
.archives-lable {
  color: #fff;
  padding: 5px;
  background-color: #262a30;
  font-size: 12px;
  margin-right: 5px;
  border-radius: 5px;
  transition: all .3s;
  position: relative;
  margin-left: 10px;
  margin-top: 10px;
  line-height: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.archives-line{
  position: absolute;
  height: 93%;
  top: 60px;
  width: 2px;
  background-color: #eee;
}


@media screen and (max-width: 750px) {
 .archivesAll{
   width: calc(90% - 15px);;
 }
.archives-tetile{
  font-size: 14px;
}
.archives-body p{
  font-size: 23px;
}
.month{
  font-size: 18px;
}

}





</style>
