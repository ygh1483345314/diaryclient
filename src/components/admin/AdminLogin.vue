<template>
   <div class="adminLoginAll">
     <div style="padding-top: 7.5%;padding-bottom: 2%">
       <div class="adminLoginAllBody">
          <div class="adminLogin">
              <div class="adminLoginHead">
                <div class="adminLginHeadTitle">
                      Login Blog
                </div>

              </div>
              <div class="adminLoginBody">
                <el-form ref="ruleForm" :model="user" :rules="rules">

                  <el-form-item prop="username">
                    <el-input v-model="user.username"  placeholder="请输入账号"></el-input>
                  </el-form-item>

                  <el-form-item prop="password">
                    <el-input v-model="user.password"   placeholder="请输入密码" type="password"></el-input>
                  </el-form-item>


                    <el-checkbox-group v-model="user.keep">
                      <el-checkbox label="记住我" name="keep" ></el-checkbox>
                    </el-checkbox-group>

                  <el-button type="danger" round style="width: 100%;margin-top: 10px" @click="btnLogin('ruleForm')">登录</el-button>


                </el-form>

              </div>
          </div>
       </div>
     </div>


   </div>




</template>

<script>
  import jwt_decode from 'jwt-decode'
  import  utils from '../../utils'
  import md5 from 'js-md5';
    export default {
        name: "AdminLogin",
        data:()=>({
          user:{
            username:"",
            password:"",
            keep:false,
          },
          rules: {
            username: [
              { required: true, message: '请输入账号。', trigger: 'blur' },
            ],
            password: [
              { required: true, message: '请输入密码。', trigger: 'blur' },
            ],
          }
        }),
       mounted(){
         var username =this.getCookie("username");
         var password =this.getCookie("password");
         let Base64 = require('js-base64').Base64;
         this.user.username=Base64.decode(username);
         this.user.password=Base64.decode(password);
         this.user.keep=this.getCookie("keep")=="true"?true:false;
       }
       ,
      methods:{
        setCookie: function (cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
          var expires = "expires=" + d.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        //获取cookie
        getCookie: function (cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1){
              return c.substring(name.length, c.length);
            }
          }
          return "";
        },
        setCookieAll(exdays,user){
          let Base64 = require('js-base64').Base64;
          this.setCookie("keep",exdays>0?true:false,exdays);
          this.setCookie("username",Base64.encode(user.username),exdays)
          this.setCookie("password",Base64.encode(user.password),exdays)
        },
        btnLogin(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.post('/api/admin/login',this.user)
                .then(res=>{
                  //登录成功，拿到token
                  if(res==null||res.data==null|| res.data.data==null){
                    return
                  }
                  const { token } = res.data.data;
                  //解析token
                  const decode = jwt_decode(token)
                  //token存储到VueX中
                  if(this.user.keep){
                   this.setCookieAll(7,this.user)
                  }else{
                    this.setCookieAll(-1,this.user)
                  }
                  utils.AdminLoginSetStatus(decode);
                })
            } else {
              return false;
            }
          });
        },

      }
    }
</script>



<style>


  .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #f78989;
  }


  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #f78989;
    border-color: #f78989;
  }

.adminLoginAll{
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/login/1.png");
  background-size: cover;
  overflow: auto;
  /*padding-top: 7.5%;*/
}

.adminLoginAllBody{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

}
.adminLogin{
  width: 380px;
  background-color: #fff;
  /*position: relative;*/
  /*top: -15%;*/
  border-radius: 5px;
}
.adminLoginHead{
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/images/login/bg.png");
  background-size: cover;
  border-radius: 6px 6px 0 0;
  /*background-color: rgba(47, 51, 62, 0.3);*/
}
.adminLginHeadTitle{
  font-size: 28px;
  font-weight: bolder;
  color: #f1f1f1;
  text-shadow: 0px 2px 3px #555;
}

.adminLoginBody{
  padding: 30px;
}

@media screen and (max-width: 450px){
  .adminLogin{
    width: 90%;
  }

}



</style>
