<template>
  <div class="adminnew-form">
    <el-form  :rules="rules"  ref="ArForm"    :model="article"    :label-position="labelPosition" size="small" >

      <div class="adminnew-from-row">
        <!--<div class="adminnew-from-flex-col">-->
        <el-form-item prop="title" class="adminnew-from-flex-col">
          <el-input   v-model="article.title"   placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <!--</div>-->

        <div  class="adminnew-from-flex-col">
          <el-form-item >
            <el-input v-model="article.url"  placeholder="自定义访问路径，如：my-first-article  默认为文章id"></el-input>
          </el-form-item>
        </div>

      </div>



      <div class="adminnew-from-row">
        <div class="adminnew-from-flex-col-ba" >

          <div class="tag-input"   @click="thisInput"  >
            <el-tag
              :key="tag"
              v-for="tag in article.dynamicTags"
              closable
              :disable-transitions="true"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>

            <div style="display: block;float: left;margin-top: -3px">
              <input placeholder="请输入标签"  ref="inputTag" v-model="inputValue" @keyup.enter.native="handleInputConfirm"  @blur="handleInputConfirm" class="input-new" />
            </div>


          </div>


        </div>

        <div  class="adminnew-from-flex-col">
          <!--<el-form-item prop="type">-->
            <!--<el-select class="selectinput"  v-model="article.type" multiple placeholder="请选择文章类型">-->
              <!--<el-option-->
                <!--v-for="item in types"-->
                <!--:key="item.id"type-->
                <!--:label="item.name"-->
                <!--:value="item.id">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item >
            <el-input   v-model="article.icon"   placeholder="请输入页面图标样式,样式必须为elementui 的icon"></el-input>
          </el-form-item>
        </div>


      </div>



      <el-row type="flex" class="btnright">
        <el-col :span="24">
          <el-button  style="float: right" size="mini" type="primary" round @click="switchEdit">
            <span v-if="article.edit==0">切换富文本编辑器</span>
            <span v-else>切换markdown编辑器</span>
          </el-button>
        </el-col>
      </el-row>

      <el-row type="flex" style="margin-bottom: 10px">
        <el-col >
          <!--markdown 控件-->
          <div  v-show="article.edit==0" class="markdown-all controls">
            <mavon-editor v-model="article.content"
                          ref="md"
                          defaultOpen="preview"
                          @imgAdd="$imgAdd"
            />
          </div>
          <!--editorElem控件-->
          <div class="controls" v-show="article.edit==1">
            <div id="editorElem" style="text-align:left"  ></div>
          </div>
        </el-col>
      </el-row>



      <div class="adminnew-from-row marboom">
        <!--<div class="adminnew-from-flex-col">-->
        <div class="adminnew-from-flex-col" >
          是否置顶
          <el-switch
            v-model="article.top"
            active-color="#13ce66"
            active-value=1
            inactive-value=0
            inactive-color="#DCDFE6">
          </el-switch>
        </div>

        <div class="adminnew-from-flex-col">
          允许评论
          <el-switch
            v-model="article.comments"
            active-color="#13ce66"
            active-value=1
            inactive-value=0
            inactive-color="#DCDFE6">
          </el-switch>
        </div>

        <div class="adminnew-from-flex-col">
          是否原创
          <el-switch
            v-model="article.original"
            active-color="#13ce66"
            active-value=1
            inactive-value=0
            inactive-color="#DCDFE6">
          </el-switch>
        </div>
        <!--</div>-->
      </div>



      <div class="adminnew-from-row">
        <div class="adminnew-from-flex-col">
          <el-form-item  class="date-width" label-width="80px"  label="发布时间">
            <el-date-picker    format="yyyy-MM-dd HH:mm:ss"   value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" v-model="article.dateb" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </div>
        <div class="adminnew-from-flex-col-right adminnew-from-flex-col" >
          <el-form-item>
            <el-button size="mini" @click="btnNewPage('AdminPages')" round>返回列表</el-button>
            <el-button size="mini" type="success" @click="sumbit(1)" round>发布文章</el-button>
            <el-button size="mini" type="warning"   @click="sumbit(0)" round>保存草稿</el-button>
          </el-form-item>
        </div>
      </div>

    </el-form>

  </div>
</template>

<script>
  import E from 'wangeditor'
  import toMarkdown from 'to-markdown'
  import { markdown }    from '../../markdown'
  import utils   from '../../utils'


  // var toMarkdown = require('to-markdown');

  export default {
    name: "AdminPagesNew",
    data:()=>({
        editor:null,
        article:{
          id:0,
          title:"",
          url:"",
          type:[],
          content:"",
          html:"",
          edit:0,
          reading:0,
          dateb:utils.nowDateTime(),
          original:"0",
          comments:"1",
          top:"0",
          dynamicTags: [],
          status:0,
          page:1,
          icon:"el-icon-s-custom"
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          // type:[
          //   { required: true, message: '请输入类型', trigger: 'blur' },
          // ],
        },
        labelPosition:"left",
        inputVisible: false,
        inputValue: '',
        types:[],
      }
    ),
    watch: {
      content() {
        this.editor.txt.html(this.html)
      },
      '$route' (to, from) {
        // this.article.id=0;
        Object.assign(this.$data, this.$options.data())
        this.getDataType();//初始化 类型
      }

    },
    mounted(){
      this.editor = new E('#editorElem')
      this.editor.customConfig.onchange = (html) => {
        this.article.html = html
      }
      this.editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        // 'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复

        // 'head',
        // 'bold',
        // 'italic',
        // 'underline'
      ]
      this.editor.create()
    },
    created(){
      this.getDataType();//初始化 类型
      var id=this.$route.query.id
      if(id){
        this.getArticleData(id)
      }
    },
    methods:{
      //初始化类型
      getDataType(){
        this.$axios.get('/api/admin/type',null)
          .then(res=>{
            this.types=res.data.data;
          })
      },
      //如果为修改 初始化数据。
      getArticleData(id){
        this.$axios.get('/api/admin/article/'+id,null)
          .then(res=>{
            this.article=res.data.data;
            this.editor.txt.html(this.article.html)
          })
      },
      //发布成功
      sumbit(status){
        this.$refs['ArForm'].validate((valid) => {
          if(valid){
            this.article.status=status;
            this.save();
          }
        })
      },
      btnNewPage(pages){
        this.$router.push({path: pages})
      },
      save(){
        // console.log(this.$refs.md.d_render)
        // console.log(this.markdownHtml(this.article.content))
        if(this.article.edit==0){
          //  console.log(markdown)
          // console.log(markdown(this.$refs.md.d_render))
          this.article.html=this.markdownHtml(this.article.content);
        }else{
          // var toMarkdown = require('to-markdown');
          var html=this.article.html;
          var markdown=toMarkdown(html);
          this.article.content=markdown;
        }
        var mothod="post";
        if(this.article.id!=null&&this.article.id!=0){
          mothod="put";
        }
        this.add(mothod);
      },
      markdownHtml(str) {
        return markdown(str)
      },
      add(method){
        this.$axios({
          method: method,
          url: '/api/admin/article/',
          data: this.article
        }).then(res=>{
          if(res.data.code=="200"){
            this.getArticleData(res.data.data);
          }
        });
      },
      //切换 markdown 和富文本框按钮  根据 字段 article.edit 判断 当前 文本框模式  true 为 markdown模式 反之 富文本模式
      switchEdit(){
        if(this.article.edit==0){//如果为 markdown模式 切换 成 富文本模式则 将 markdown 语法 编译成的html 复制给 富文本框。
          this.article.html=this.markdownHtml(this.article.content);
          this.editor.txt.html(this.article.html)
          this.article.edit=1
        }else{//相反 则 把富文本框 html 转成 markdown 语法 并赋值。
          var html=this.article.html;
          var markdown=toMarkdown(html);
          this.article.content=markdown;
          this.article.edit=0
        }
      },
      //标签 方法
      handleClose(tag) {
        this.article.dynamicTags.splice(this.article.dynamicTags.indexOf(tag), 1);
      },
      //标签 方法
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      //标签 方法
      handleInputConfirm() {
        let inputValue = this.inputValue;
        var dys=this.article.dynamicTags;
        this.inputValue = '';
        this.inputVisible = false;
        if (!inputValue) {
          return
        }
        this.$refs.inputTag.focus()
        for(var i=0;i<dys.length;i++){
          if(dys[i]==inputValue){
            return
          }
        }
        this.article.dynamicTags.push(inputValue);
      },
      //点击 标签框 定位光标
      thisInput(){
        this.$refs.inputTag.focus()
      },

      imgeApi(pos,formdata){
        this.$axios({
          method: 'post',
          url: '/api/upload/',
          data: formdata
        }).then(res=>{
          if(res.data.code=="200"){
            // this.getArticleData(res.data.data);
            console.log(res.data.data.url);
            // let url = "/api/" + res.data.data;
            this.$refs.md.$img2Url(pos, res.data.data.url);
            // //得到相应的html/文件
            // console.log(this.$refs.md.d_render);
          }
        });
      },

      // 绑定@imgAdd event  markdown 图片上传方法
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('file', $file);
        this.imgeApi(pos,formdata)


        // console.log(formdata.get("file"));
        //
        // imgeApi(formdata).then(res => {
        //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        //   /**
        //    * $vm 指为mavonEditor实例，可以通过如下两种方式获取
        //    * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        //    * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
        //    */
        //   console.log(res.data);
        //   let url = "/server/" + res.data.data;
        //   this.$refs.md.$img2Url(pos, url);
        //   //得到相应的html/文件
        //   console.log(this.$refs.md.d_render);
        // });
      },
    },

  }
</script>

<style>




</style>
