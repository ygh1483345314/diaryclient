<template>
  <div class="adminUpload-all" >
    <el-upload
      action="/api/upload"
      :headers="headers"
      list-type="picture-card"
      :file-list="fileList"
      accept=".png,.jpg"
      :on-success="btnSuccess"
      :before-upload="checkType"
      multiple
    >
      <i slot="default" class="el-icon-plus"></i>
      <div  slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
        >

        <span :title="file.name" class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i title="放大" class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          v-clipboard:copy="file.url"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          <i title="复制路径" class="el-icon-copy-document"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i title="删除" class="el-icon-delete"></i>
        </span>
      </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="{file.name}">
    </el-dialog>

    <!--<el-upload-->
      <!--action="/api/upload"-->
      <!--:headers="headers"-->
      <!--list-type="picture-card"-->
      <!--:file-list="fileList"-->
      <!--accept=".png,.jpg"-->
      <!--:on-success="btnSuccess"-->
      <!--:on-preview="handlePictureCardPreview"-->
      <!--:on-remove="handleRemove"-->
     <!--&gt;-->
      <!--<i class="el-icon-plus"></i>-->
    <!--</el-upload>-->
    <!--<el-dialog   :visible.sync="dialogVisible">-->
      <!--<img   width="100%"  :src="dialogImageUrl" >-->
    <!--</el-dialog>-->



  </div>

</template>

<script>
  // import Clipboard from 'v-clipboard'
  // import { Message } from 'element-ui'
    export default {
        name: "adminUpload",
        data() {
          return {
            fileList: [
                       // {keyid: 'food.jpeg', path: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                       // {keyid: 'food2.jpeg', path: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
                       ],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            headers:{Authorization:localStorage.getItem("token")},
          };
        },
      created(){
         this.getData()
      },
      methods: {
        handleRemove(file) {
          this.del(file.keyId)
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        handleDownload(file) {
          console.log(file);
        },
        getData(){
          this.$axios.get('/api/upload',null)
            .then(res=>{
              this.fileList=res.data.data;
              // console.log(this.fileList)
              // console.log(res.data.data)
            })
        },
        del(keyid){
          this.$axios.delete('/api/upload/'+keyid,null)
            .then(res=>{
               // this.getData()
              this.getData()
            })
        },
        checkType(file){
         // var  i=file.name.lastIndexOf(".");
         //  if(i <= -1){
         //    Message({
         //      message: "文件类型不能为空。",
         //      type: "error"
         //    });
         //    return false;
         //  }
         //
         //  var ext = file.name.substring(i);
         //  console.log(ext)
         //  if(ext!=".png"&&ext!=".PNG"&&ext!=".JPG"&&ext!=".jpg"){
         //      Message({
         //        message: "文件类型必须为png或jpg",
         //        type: "error"
         //      });
         //      return false;
         //  }
         //  return true;
          const isJPG = (file.type === 'image/jpeg'|| file.type ==='image/png');
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传图片只能是 JPG或png 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
          }
          return isJPG&&isLt2M;

        },
        btnSuccess(response, file, fileList){
          this.getData()
          // this.fileList.push(response.data)
          // console.log(this.fileList)
          // this.getData()
          //   console.log(response)
          // console.log(file)
          // console.log(fileList)
        },

        onCopy (value){
          this.$message.success("已复制");
        },
        // Error event handler
        onError (value) {
        }
      },

    }
</script>

<style>
.adminUpload-all{
  width: 100%;
  height: 100%;
  padding: 15px;
}

.el-upload-list__item{
  transition:none;
}

/*.el-upload-dragger {*/
  /*width: 100%;*/
/*}*/
/*.el-upload{*/
  /*width: 100%;*/
/*}*/
/*.fileWatch-Item{*/
  /*width: 100%;*/
  /*min-height: 120px;*/
  /*border: 1px dashed #409eff;*/
  /*border-radius:6px;*/
  /*cursor: pointer;*/
  /*padding: 5px;*/
  /*box-sizing:border-box;*/
  /*display: flex;*/
  /*flex-direction:row;*/
  /*flex-wrap: wrap;*/
  /*justify-content: right;*/
/*}*/
/*!*.fileWatch-Item:hover{*!*/
  /*!*border: 1px dashed #409eff;*!*/
/*!*}*!*/
/*.fileWatch{*/
  /*width: auto;*/
  /*height: auto;*/
  /*margin: 5px;*/
  /*border: 1px solid #409eff;*/
/*}*/

/*.fileWatch:hover{*/
  /*border: 3px solid #409eff;*/
/*}*/

 /*.fileWatch img{*/
   /*width: 120px;*/
   /*height: 120px;*/
 /*}*/

</style>

