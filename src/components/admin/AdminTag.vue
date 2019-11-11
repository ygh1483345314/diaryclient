<template>
  <div class="admin-articles-all" >

    <div class="admin-TagBodyALl">

        <div class="admin-articles-row adminTag-all">




          <div class="adminTag-body" >
            <div class="adminTag-haead">分类列表</div>

            <div class="adminTag-body-Taglist" >

              <el-dropdown trigger="click"  size="small"  :key="type.id"  v-for="type in types"  class="adminTag-tag"
                           :style="randomRgb()" >
                <el-button type="primary"   >
                  {{type.name}}
                  <span style="font-size: 8px">{{type.qty}}篇</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu >
                  <el-dropdown-item  @click.native="handleClick(0,type)">修改</el-dropdown-item>
                  <el-dropdown-item  @click.native="handleClick(1,type)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>



          <div class="adminTag-body" >
            <div class="adminTag-haead">标签列表</div>

            <div class="adminTag-body-Taglist" >

              <el-dropdown trigger="click"  size="small"  :key="tag.id"  v-for="tag in tags"  class="adminTag-tag"
                           :style="randomRgb()" >
                <el-button type="primary"   >
                  {{tag.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu >
                  <el-dropdown-item  @click.native="delTypeClick(tag.id)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>



        </div>

        <div class="adminTag-boom-all" >
          <!--<input type="hidden" value="types.typeid"/>-->
          <el-form :model="typeObj">
            <input type="hidden" v-model="typeObj.id"/>
            <el-input size="small"   class="adminTag-boom-body"   v-model="typeObj.name"  placeholder="请输入分类名称"></el-input>
          </el-form>
          <el-button type="success" style="flex: 0.05;margin-left: 8px" @click="saveOrUpdateType"    size="small" round>保存分类</el-button>
        </div>

     </div>

  </div>

</template>

<script>

    export default {
        name: "AdminTag",
        data:()=>({
          typeObj:{
            name:"",
            id:"",
          },
          tags:[],
          types:[],
          backgroundStr:[
            {color:"#fff",background:'rgb(236, 64, 122)'},
            {color:"#fff",background:'rgb(41, 182, 246)'},
            {color:"#fff",background:'rgb(51, 184, 108)'},
            {color:"#fff",background:'rgb(239, 83, 80)'},
            {color:"#fff",background:'rgb(126, 87, 194)'},
            {color:"#fff",background:'#6e8cd7'},
            {color:"#fff",background:'#3f51b5'},
            {color:"#fff",background:'#FF9800'},
            {color:"#fff",background:'rgb(96, 125, 139)'},
            ]
        }),
        created(){
          this.getDataType();
        },
        methods:{
          cleanInput(){
            this.typeObj.name="";
            this.typeObj.id="";
          },
          mouseleave(){
            if(this.typeObj.id!=""){
              this.$confirm('修改的类型将不被保存,是否继续?', '提示', {
                confirmButtonText: '继续',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.cleanInput();
              }).catch(() => {

              });
            }


          },
          //判断是修改还是删除
          handleClick(type,tag) {
            if(type==0){//0 为修改
              this.typeObj.name=tag.name;
              this.typeObj.id=tag.id
            }else if(type==1){//1 为删除
                this.del(tag.id);
            }
          },
          delTypeClick(id){
            this.$confirm('是否删除该标签?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'error'
            }).then(() => {
              this.$axios.delete('/api/admin/tag/'+id)
                .then(res=>{
                  this.getDataType();
                })
            }).catch(() => {
            });
          },
          //获取 类型数据
          getDataType(){
            this.$axios.get('/api/blog/typeList',this.typeObj)
              .then(res=>{
                this.tags=res.data.data.taglist;
                this.types=res.data.data.typelist;
              })
          },
          //从数组中获取 随机 背景颜色
          randomRgb(){
            var back=this.backgroundStr[Math.floor((Math.random()*this.backgroundStr.length))];
            return {
              background: back.background
            }
          },

          //保存或者修改 类型
          saveOrUpdateType(){
                if(this.typeObj.name==""){
                  this.$message.error('类别不能为空');
                  return
                }
                if(this.typeObj.id==""){//为空则新增
                  this.saveType();
                }else{
                  this.updateType(this.typeObj);
                }
          },
          //保存类型.
          saveType(){
            this.$axios.post('/api/admin/type',this.typeObj)
              .then(res=>{
                     this.cleanInput();
                     this.getDataType();
              })
          },
          //修改类型.
          updateType(typeObj){
            this.$axios.put('/api/admin/type',typeObj)
              .then(res=>{
                this.cleanInput();
                this.getDataType();
              })
           },
          del(id){
            this.$confirm('是否删除该分类?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'error'
            }).then(() => {
              this.$axios.delete('/api/admin/type/'+id)
                .then(res=>{
                  // this.cleanInput();
                  this.getDataType();
                })
            }).catch(() => {
            });

          }



        },

    }
</script>

<style>


.adminTag-body{
  flex: 1;
  margin: 10px;
  /*width: 50%;*/
  min-height: 100px;
  box-shadow: 5px 5px 10px #ccc;
  background-color: #e7e7e700;
  border-radius: 3px;
}

.adminTag-body-Taglist{
  padding: 15px;
  justify-content: center;

}

.adminTag-body-Taglist{
  margin: 2px;

}
.adminTag-tag{
  margin: 2px;
  transition: all 0.5s;
  border-radius: 3px;
}

.adminTag-body-Taglist .el-button--primary{
  background-color: rgba(41, 182, 246, 0);
  border-color: rgba(41, 182, 246, 0);
}


.adminTag-body-Taglist .el-button{
    padding: 10px 15px ;
}

.adminTag-haead{
  background-color: rgb(126, 87, 194);
  color: #fff;
  height: 20px;
  padding: 10px 20px;
  font-size: 13px;
  border-radius: 3px;
}

.adminTag-boom-all{
  display: flex;margin: 8px 10px;padding: 15px
}


.adminTag-boom-body{
  width: 200px;margin-right: 10px;
  flex: 1;
}

.admin-TagBodyALl{
  box-shadow: 1px 1px 5px #ccc;
}
@media screen and (max-width: 480px){
  .adminTag-body-Taglist{
    padding: 8px;
  }
}



</style>
