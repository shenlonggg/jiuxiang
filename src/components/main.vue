<template>
  <section>
         <div class="main_all">
           <div class="operation">
            <span><input type="text" class="form-control" placeholder="search" v-model="searchIndex" @keyup="searchUp"></span>
            <!--<button class="btn btn-primary">查询</button>-->
            <button class="btn btn-primary"  data-toggle="modal" data-target="#Newadd">新增</button>
           </div>
           <div class="operation_list">
            <table class="table table_border table-hover">
              <thead>
                <tr><td width="60">
                  
                  <div class="checkbox checkbox-primary">   
                      <input id="checkbox" class="styled" @click="checkedAll" v-model="mainshow" type="checkbox"><label for="checkbox"></label>
                  </div>

                </td><td width="50">#</td><td width="120">姓名</td><td width="100">性别</td><td width="100">年龄</td><td width="120">生日</td><td min-width="120">地址</td><td width="150">操作</td></tr>
              </thead>
              <tbody>
                <tr v-for="(listy,index) in list">
                  <td>
                  <div class="checkbox checkbox-primary"> 
                      <input :id="index" class="styled" :value="index" v-model="selectArr" type="checkbox" checkbox=""><label :for="index"></label>
                  </div>
                          </td>
                          <td><span>{{(num-1) * pageNum + (index+1)}}</span></td>
                          <td>{{listy.name}}</td>
                          <td>
                          <span>{{listy.sex}}</span>
                           <!-- 
                            <span v-if="listy.sex == '0'">男</span>
                            <span v-else>女</span>
                           -->
                          </td>
                          <td>{{listy.age}}</td>
                          <td>{{listy.date}}</td>
                          <td>{{listy.addr}}</td>
                          <td><button class="btn btn-default" data-toggle="modal" data-target="#Edit" @click="Edit(index)">编辑</button><button class="btn btn-danger" @click="dev(index)">删除</button></td>
                        </tr>
              </tbody>
            </table>
           </div>
           <div class="batch_page">
             <button class="btn btn_batch btn-danger" :class="disabled?'disabled':''" @click="del">批量删除</button>
             <nav aria-label="Page navigation">
            <ul class="pagination">
                <li>
                  <a href="#" aria-label="Previous" v-if="num>1" @click="num=1,pageClick()">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li v-if="listleft"><a class="ellipsis">...</a></li>
                <li v-for="(list,index) in page" :class="(index+1)==num?'active':''" @click="num=index+1,pageClick(index)"><a href="#">{{list}}</a></li>
                <li v-if="listright"><a class="ellipsis">...</a></li>
                <li>
                  <a href="#" aria-label="Next" v-if="num!=page" @click="num++,pageClick()">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
                
            </ul>
        </nav>
           </div>
         </div>

<!-- 新增 -->         
<div class="modal fade" id="Newadd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">新增个人信息</h4>
            </div>
              
            <form class="modal-body" @submit.prevent="submit">
                <div class="form-group">
                  <label class="col-sm-2"><em>*</em><span>姓名</span></label>
                  <div class="col-sm-10">
                    <input type="text" v-model="user.name" class="form-control" id="inputPassword" placeholder="name">
                  </div>
                </div>
                <div class="form-group group-top">
                  <label class="col-sm-2 control-label">性别</label>
                  <div class="col-sm-10">
                    <div class="radio radio-primary">
                          <input id="radio"  type="radio" name="radi_sex" value="0" v-model="user.sex">
                          <label for="radio">男</label>
                    </div>
                    <div class="radio radio-primary">
                          <input id="radio1"  type="radio" name="radi_sex" value="1" v-model="user.sex">
                          <label for="radio1">女</label>
                    </div>
                  </div>
                </div>
                <div class="form-group group-top">
                  <label class="col-sm-2 control-label">年龄</label> 
                  <div class="col-sm-10 age_style">
                    <input type="text" class="inputnum" ref="mouseOver" v-model="user.age" placeholder="0">
                    <span class="increase"  @mouseover="mouseNum" @click="increase()">-</span>
                    <span class="reduce"  @mouseover="mouseNum" @click="reduce()">+</span>
                  </div>
                </div>
                <div class="form-group group-top">
                  <label class="col-sm-2 control-label">生日</label>
                  <div class="col-sm-10">
                    <el-date-picker v-model="user.date" type="date" placeholder="生日"></el-date-picker>
                  </div>
                </div>
                <div class="form-group group-top">
                  <label class="col-sm-2 control-label">地址</label>
                  <div class="col-sm-10">
                     <textarea class="form-control" v-model="user.add" rows="3"></textarea>
                  </div>
                  <div style="clear:both"></div>
                </div>
                <div style="clear:both"></div>
            
            
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <input class="btn btn-primary" type="submit">
            </div>
            </form>
        </div>
    </div>
</div>


<!-- 编辑 -->
<div class="modal fade" id="Edit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel1">编辑信息22</h4>
            </div>
            <div class="modal-body">在这里添加一些文本</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">提交更改</button>
            </div>
        </div>
    </div>
</div>


  </section>
</template>

<script>
export default {
  data(){
    return{
      search:'',
      users:[],
      selectArr:[],
      mainshow:false,
      disabled:true,
      searchIndex:'',
      page:[],
      num:1,
      pageNum:10,
      searchData:[],
      listleft:false,
      listright:false,
      searchIndex:'',
      list:[],
      bang:[],
      mouseOver:false,
      value1: '',
      user:{
          name:'',
          sex:'',
          age:'',
          date:'',
          add:''
      }
    }
  },
/*
  mounted(){
       var _this = this;
        this.$http.get("/static/demo.json").then(function(res){ 
                  this.users = res.data.users;
                  this.searchData = this.users;
                  _this.list = _this.searchData.filter(function(data,index) {
                       if(index>=(_this.num-1)*_this.pageNum&&index<_this.pageNum*_this.num){
                           return data;
                       }
                  });
                  _this.page =Math.ceil(this.searchData.length/this.pageNum);
          }).catch(function(res){
          
        })
        
  },
*/
  mounted(){
       var url = this.HOST + '/test';
       var _this = this;
       this.$http.get(url).then(res=>{
                  this.users = res.data.users;
                  this.searchData = this.users;
                  _this.list = _this.searchData.filter(function(data,index) {
                       if(index>=(_this.num-1)*_this.pageNum&&index<_this.pageNum*_this.num){
                           return data;
                       }
                  });
           _this.page =Math.ceil(this.searchData.length/this.pageNum);
       },res=>{
           alert("获取数据失败")
       })
  },

  methods:{
       checkedAll:function(event){
          var _this = this;
          this.selectArr = [];
        if (!event.currentTarget.checked) {
          this.selectArr = [];
        } else { 
          this.list.forEach(function(listy, i) {
            _this.selectArr.push(i);
          });
        }
        },
        del:function(){
          var arr = [];
          var len = this.list.length;
          for(var i=0;i<len;i++){
            if(this.selectArr.indexOf(i) != -1){
                console.log(this.selectArr)
            }else{
                 arr.push(this.users[i])
            }
          }
          this.list = arr;
          this.selectArr = [];
        },
        pageClick:function(index){
           var _this = this;
           if(index!=this.num){
              this.selectArr = [];
              _this.list = _this.searchData.filter(function(data,index){
                if((parseInt(index/_this.pageNum)+1) == _this.num){
                  return data;
                }
              })
            }
        },
        dev:function(index){
            this.list.splice(index,1);
            this.selectArr = [];
        },
        searchUp:function(){
           var _this = this;
           if(_this.searchIndex != ''){
              this.searchData = this.users;
              _this.bang = _this.searchData.filter(function(data,index) {
                if(data.name.indexOf(_this.searchIndex)!==-1 ||  data.addr.indexOf(_this.searchIndex)!==-1){
                  return data;
                }
              });
              _this.list = _this.bang.filter(function(data,index) {
                   if(index>=(_this.num-1)*_this.pageNum&&index<_this.pageNum*_this.num){
                       return data;
                   }
              });
              _this.page =Math.ceil(this.bang.length/this.pageNum);
              this.searchData = this.bang;
           }else{
              this.searchData = this.users;
              _this.list = _this.searchData.filter(function(data,index) {
                   if(index>=(_this.num-1)*_this.pageNum&&index<_this.pageNum*_this.num){
                       return data;
                   }
              });
              _this.page =Math.ceil(this.searchData.length/this.pageNum);
           }
        },
        Edit:function(index){
            console.log(this.list[index].name)
        },
        mouseNum:function(){
          this.$refs.mouseOver.focus();
        },
        reduce:function(){
          var _this = this;
           _this.user.age++;
        },
        increase:function(){
          var _this = this;
          if(_this.user.age >0){
            _this.user.age--;
          }
        },
        submit:function(){ 
          var _this = this;
          var Pname = this.user.name;
          var Psex = this.user.sex;
          var Page = this.user.age;
          var Pdate = this.user.date;
          var Padd = this.user.add;
          var Gender = '';
          var format = '';
          var userJson = [];
/*姓名*/
          if(_this.user.name == ""){
             alert("姓名错误")
             return;
          } 
/*性别*/ 

          if(Psex == '0'){
             Gender = '男';
          }
          if(Psex == '1'){
             Gender = '女';
          }

/*年龄*/                 
/* 日期 */
          if(Pdate != ''){
            var year = Pdate.getFullYear();
            var mouth = Pdate.getMonth() + 1;
            var day = Pdate.getDate();
            var format = year + '-' + mouth + '-' + day;
          }

/*地址*/  
           //userJson += {name:Pname,sex:Gender,age:Page,date:format,addr:Padd}
           //console.log(JSON.stringify(userJson))
           console.log(this.searchData)
            

/*  
_this.users.unshift(this.user);        
          _this.searchData = _this.users;          
          _this.list = _this.searchData.filter(function(data,index) {
                       if(index>=(_this.num-1)*_this.pageNum&&index<_this.pageNum*_this.num){
                           return data;
                       }
                  });
           _this.page =Math.ceil(this.searchData.length/this.pageNum);
*/           
        }
     },
     watch:{
          selectArr(e){
            if(e.length === this.list.length){
                this.mainshow = true;
            }
            if(e.length != this.list.length){
                this.mainshow = false;
            }
            if(e.length>0){
                this.disabled = false
            }
            if(e.length==0){
                this.disabled = true
            }
          }   
     },
     computed: {
          
     }
}
/*
var npmlist = [];
          var nmblen = Math.ceil(this.users.length/5) + 1;

          for(var i=1;i<nmblen;i++){
             npmlist.push(i)
          }

          this.numpage = npmlist;

*/

</script>

<style scoped>
label{outline:none}
.label{margin:0;}
.main_all p{width: 100%; margin:0; line-height: 25px; display: inline-block}

.table_border{border:1px solid #ddd;}
.table_border thead{background: #f2f2f2;}

.operation{background: #f2f2f2; padding:10px 6px;}
.operation span{width: 180px; display: inline-block; }

.operation_list{margin-top: 10px;}
.operation_list table td{height: 30px;min-width: 0;text-overflow: ellipsis;vertical-align: middle; }
.operation_list table td input[type="checkbox"]{display: inline-block;vertical-align: middle; margin-top: -2px;}
.operation_list table td button{margin-right: 10px;}
.operation_list table td{max-width:260px;}
.operation_list table td div.checkbox{margin:0;}

.batch_page{background: #f2f2f2; padding:10px 6px; position: relative; text-align: center}
.batch_page .btn_batch{position: absolute; top:16px; left: 6px;}
.batch_page .pagination{ margin: 0; padding:0; margin-top: 4px;}
.batch_page .pagination li{float: left}
.batch_page .pagination li a.ellipsis{vertical-align:sub; border: none; background: none; font-size: 18px; color:#999;}

.btn.disabled, .btn[disabled], fieldset[disabled] .btn{cursor: not-allowed;filter: alpha(opacity=65);-webkit-box-shadow: none; box-shadow: none;opacity: .55; background: #aaa; border: #999 1px solid}

.form-group{min-height: 34px;}
.form-group label{line-height: 34px; text-align: right;}
.form-group label em{color: red;}


.radio-primary{float: left; height: 34px; line-height: 34px; }
.radio{margin:0 20px 0 0!important;}
.radio label{padding-left: 1px;}
.radio label::before{margin-top:8px;}
.radio label::after{margin-top:8px;}
.selected_yes:focus{}
.age_style{width: 200px;height: 34px; position: relative;}
.age_style input.inputnum{
  width: 200px; height: 34px;font-size: 14px;line-height: 1.42857143; color: #555;background-color: #fff; background-image: none; border: 1px solid #ccc;border-radius: 4px; -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075); box-shadow: inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s; transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s; padding-left: 12px;  padding-right: 70px; overflow: hidden;
}
.age_style input.inputnum:focus{
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
.age_style span{height: auto;border-left: 1px solid #ccc; width: 36px;line-height: 32px;top: 1px;text-align: center;color: #97a8be;cursor: pointer;z-index: 1; display: inline-block; font-size:24px;}
.age_style span.increase{position: absolute; top:1px; right: 35px;}
.age_style span.reduce{position: absolute; top:1px; right: 0px;}

.modal-body{ padding-bottom: 0 }

.col-sm-10{padding-left: 0px;}
textarea{resize:none}
</style>




