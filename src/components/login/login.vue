<template>
  <div class="login_bg container">	
	  <form class="form-signin" name="login" id="tijiao">
        <h2 class="form-signin-heading">中酒网</h2>
        <label for="inputText" class="sr-only"></label>
        <input type="text" id="inputText" v-model="namefrom.account" class="form-control only_top" placeholder="账号" autofocus="">
        <label for="inputPassword" class="sr-only"></label>
        <input type="password" id="inputPassword" v-model="namefrom.checkPass" class="form-control only_bottom" placeholder="密码">
        
        <!--<div class="vc_code">
          <div class="vc_code_left">
             <label for="inputPassword" class="sr-only">验证码</label>
             <input type="text" id="inputPassword" class="form-control" placeholder="验证码">
          </div>
          <div class="vc_code_right"><img src="../../assets/img/getccap.jpg"></div>
        </div>-->

        <div class="checkbox checkbox-primary">
              <input id="checkbox2" class="styled" type="checkbox" checked="">
              <label for="checkbox2">记住密码</label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" @click="login()" type="button" data-type=1>
                  <i class="glyphicon glyphicon-repeat" v-show="loading"></i>登录
        </button>
      </form>
   </div>	
</template>

<script>
  export default{
  	name:'login',
  	data(){
  	  return{
         loading:false,
        namefrom:{
          account: 'admin',
          checkPass: '123456'
        } 
  	  }
  	},
  methods:{
      login:function(){
        var loginP = {username:this.namefrom.account,password:this.namefrom.checkPass};
        if(this.namefrom.accoun != '' && this.namefrom.checkPass!= ''){
            this.loading = true; 
            this.$router.push('/main')
        }
        else{
        	alert("信息错误")
        }
      }
  }
}
</script>

<style lang="scss" scoped>
.login_bg{width:100%; height:100%; background:url('../../assets/homescreen.jpeg');position:fixed;}

.form-signin {box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02); -webkit-border-radius: 5px; border-radius: 5px;-moz-border-radius: 5px;background-clip: padding-box;margin: 180px auto;width: 450px; padding: 20px 55px 25px 55px; background: #fff; border: 1px solid #eaeaea; box-shadow: 0 0 25px #cac6c6;}
.form-signin .form-signin-heading,.form-signin .checkbox {margin-bottom: 10px;}
.form-signin-heading{text-align: center; padding-bottom: 20px;}
.form-signin .checkbox {font-weight: normal;}
.form-signin .form-control {position: relative;height: auto;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;padding: 10px;font-size: 16px;}
.form-signin .form-control:focus {z-index: 2;}
.form-signin input[type="text"] {margin-bottom: -1px;}
.form-signin input[type="password"] {margin-top: 0px;margin-bottom: -1px;}

/*验证*/
.vc_code {display: inline-block;width: 100%;}
.vc_code .vc_code_left{width: 72%; float:left;}
.vc_code .vc_code_left input[type="text"]{border-radius: 4px; }
.vc_code .vc_code_right{width:24%; float: right; } 
.vc_code .vc_code_right img{width: 100%; height: 42px; border-radius: 4px;}

.only_border{border-radius: 0;}
.only_top{border-bottom-right-radius: 0; border-bottom-left-radius: 0;}
.only_bottom{border-top-right-radius: 0; border-top-left-radius: 0;}
.btn-lg{font-size:16px; }
.glyphicon-repeat{font-size:14px;display: inline-block; vertical-align: middle; margin-top:-5px; position: relative; margin-right: 7px; animation: spin 2s linear infinite; width:20px; height: 15px;}


@keyframes spin {
0% {
    transform:rotate(0deg);
 }
 100% {
    transform:rotate(360deg);
 }
}

</style>