<template>
         <div class="admin-index-detail-list">

           <div class="adminindex-pc">
            <div class="admin-index-detail">
               <div class="admin-index-datail-head">
                 <div class="admin-index-datail-left">
                      <i class="el-icon-cpu"></i>
                 </div>
                 <div class="admin-index-datail-right">
                        <p class="font-p">发表了</p>
                        <p class="num-p" >{{count}}</p>
                        <p class="font-p">篇文章</p>
                 </div>
               </div>

                <div class="admin-index-datail-body">
                    <div class="admin-index-datail-titae">最新文章</div>
                  <div class="admin-index-datail-body-new">
                   <ul>
                     <li>
                       <div class="admin-index-datail-blogTitlelist">
                           <span class="admin-index-datail-blogTitlelist-left"><a href="#">第一篇文章</a></span>
                           <span class="admin-index-datail-blogTitlelist-right" title="2条评论">2</span>
                       </div>
                     </li>
                   </ul>
                  </div>

                </div>
            </div>




           <div class="admin-index-detail">
             <div class="admin-index-datail-head comment-head">
               <div class="admin-index-datail-left">
                 <i class="el-icon-chat-dot-round"></i>
               </div>
               <div class="admin-index-datail-right">
                 <p class="font-p">收到了</p>
                 <p class="num-p" >{{commentcount}}</p>
                 <p class="font-p">条留言</p>
               </div>
             </div>

             <div class="admin-index-datail-body">
               <div class="admin-index-datail-titae">最新留言</div>
               <div class="admin-index-datail-body-new">
                 <ul>

                   <li >
                     <div class="admin-index-datail-commentList">
                        <span class="admin-index-comment-image">
                          <img src="../../assets/images/photo.jpg"/>
                           <p class="commentNick">我的昵称</p>
                           <p class="commentDate">2019-09-01</p>
                        </span>
                       <p class="commentbody"><a href="#">楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安楼主好人一生平安zzz123123123123123123123123123123123123123123asdasdasdadsasdasdadasdasdasd.</a></p>
                       <div class="btnList">
                         <el-button size="mini" type="success" round>通过</el-button>
                         <el-button  size="mini" type="danger" round>删除</el-button>
                       </div>
                     </div>
                   </li>

                 </ul>
               </div>
             </div>
           </div>





           <div class="admin-index-detail">
             <div class="admin-index-datail-head upload-head">
               <div class="admin-index-datail-left">
                 <i class="el-icon-upload"></i>
               </div>
               <div class="admin-index-datail-right">
                 <p class="font-p">上传了</p>
                 <p class="num-p" >{{filecount}}</p>
                 <p class="font-p">个附件</p>
               </div>
             </div>

             <div class="admin-index-datail-body">
               <div class="admin-index-datail-titae">系统日志</div>
               <div class="admin-index-datail-body-new">
                 <ul>
                   <li>
                     <div class="admin-index-datail-blogTitlelist">
                       <span class="admin-index-datail-blogTitlelist-left">
                          2019-09-01 12:03:55
                          <span class="admin-index-datail-blog-log">登陆后台</span>
                       </span>

                     </div>
                   </li>
                 </ul>
               </div>

             </div>
           </div>

           </div>

    </div>

       <!--</div>-->
    <!--</div>-->
</template>

<script>
    export default {
        name: "AdminIndex",
        data:()=>({
           count:1,
           commentcount:1,
           filecount:1
        }),
      methods:{
          getIndexData(){
            // this.$axios.get('/api/admin/test',this.user)
            //   .then(res=>{
            //       // console.log(res)
            //   })

          }
      },
      created(){
          this.getIndexData();
      }
    }
</script>

<style>
.admin-index-detail-list{
}
.admin-index-detail{
  height: auto;
  flex: 1;
  margin: 20px;
  min-width: 200px;
}

.admin-index-detail-mobile{
  height: 115px;
  margin: 10px;
  width: 100px;
}



.admin-index-datail-head{
  padding: 20px;
  background-color: deepskyblue;
  height: auto;
  overflow: hidden;
  border-radius: 5px;
}


.comment-head{
  background-color: #7e57c2!important;
}

.upload-head{
  background-color: #33b86c!important;
}



.admin-index-datail-left{
  height: 60px;
  float:left;
  font-size: 38px;
  border-radius: 100%;
  width: 60px;
  background-color: rgba(255, 255, 255, 0.44);
  color: #fff;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.admin-index-datail-left:hover{
  color: black;
}

.admin-index-datail-right{
   height: 76px;
   float: right;
   color: #fff;
}
.font-p{
  font-size: 14px;
}

.num-p{
  font-size: 24px;
  font-weight: 600;
  text-align: right;
}

.admin-index-datail-body{
  height: auto;
  margin-top: 20px;
  box-shadow: 5px 5px 10px 5px #ccc;
  border-radius: 8px;
}

.admin-index-datail-titae{
   font-size: 16px;
   color: #797979;
   padding: 10px 20px ;
   background-color: #e7e7e7d1;
   border-radius: 5px;
}


.admin-index-datail-body-new{
  padding: 5px;
  height: auto;
}

.admin-index-datail-blogTitlelist{
  padding: 10px 20px;
  overflow: hidden;
  border: 1px solid #5555552b;
}
.admin-index-datail-blogTitlelist-left{
  float: left;
  font-size: 14px;
}

.admin-index-datail-blogTitlelist-left a{
  color: #6e8cd7;
}

.admin-index-datail-blogTitlelist-left a:hover{
  color: #555;
}


.admin-index-datail-blogTitlelist-right{
  float: right;
  border-radius: 100%;
  width: 16px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background-color: #6e8cd7;
}

.admin-index-datail-body-new ul li{
  padding: 5px 0 10px 0;
}


.admin-index-datail-commentList{
  padding: 5px ;
  overflow: hidden;
  border-bottom: 1px solid #5555552b;
  height: auto;
  /*width: 100%;*/
  /*display: flex;*/
}
.admin-index-comment-image{
  display: flex;
  padding-bottom: 10px;
}
.admin-index-comment-image img{
  border-radius: 100%;
  width: 40px;
  height: 40px;
  /*flex: 1;*/
}
.commentNick{
  flex: 1;
  font-size: 8px;
  padding: 10px;
  color: #23527c;;
}

.commentDate{
  /*flex: 1;*/
  font-size: 8px;
  padding: 10px;
  color: #23527c;;
  /*position: absolute;*/
}

.commentbody{
  font-size: 12px;
  overflow: hidden;
  /*width: 200px;*/
  /*min-width: 200px;*/
  /*width: calc(100% - 10px);*/
  text-overflow: ellipsis;
  white-space: nowrap;
}

.commentbody a{
  color: #23527c;
}

.commentbody a:hover{
  color: #555;
}

.btnList{
  margin-top: 10px;
  float: right;
}
.admin-index-datail-blog-log{
  margin-left: 3px;
  padding: 2px;
  font-size: 12px;
  background-color: #555;
  color: #fff;
  border-radius: 3px;
}

.adminindex-pc{
  display: flex;
  /*display: block;*/
}









@media screen and (max-width: 1000px){
  .admin-index-datail-body-new{
    padding: 5px;
  }
  .commentbody a{
    font-size: 8px;
    width: 80px;
  }
.admin-index-detail{
  margin: 10px;
  min-width: 150px;
}
.admin-index-datail-titae{
  font-size: 13px;
}
.admin-index-datail-blogTitlelist{
  padding: 5px 10px;
}
.admin-index-datail-blogTitlelist-left{
  font-size: 10px;
}
.admin-index-datail-blogTitlelist-right{
  width: 13px;
  font-size: 10px;
}
.admin-index-comment-image{
  height: 30px;
}
.admin-index-comment-image img{
  width: 30px;
  height: 30px;
}
.admin-index-datail-commentList{
  padding: 5px;
}
.admin-index-datail-blog-log{
  font-size: 8px;
}
.admin-index-datail-head{
  padding: 10px;
}
.admin-index-datail-titae{
  padding: 5px 10px;
}

}



@media screen and (max-width: 750px){
  .adminindex-pc{
    display: block;
  }
  .admin-index-detail{
    min-width: 0;
  }
  /*.adminindex-mobile{*/
    /*display: block;*/
  /*}*/
}






</style>
