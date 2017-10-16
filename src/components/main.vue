<template>
  <section>
         <div class="main_all">
           <div class="operation">
            <span><input type="text" class="form-control" placeholder="search" v-model="search"></span>
            <!--<button class="btn btn-primary" >查询</button>-->
            <button class="btn btn-primary">新增</button>
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
                <tr v-for="(listy,index) in searchData" v-model="listlenth">
                  <td>
                  <div class="checkbox checkbox-primary"> 
                      <input :id="index" class="styled" :value="index" v-model="selectArr" type="checkbox" checkbox=""><label :for="index"></label>
                  </div>
                          </td>
                          <td>{{index+1}}</td>
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
                          <td><button class="btn btn-default">编辑</button><button class="btn btn-danger">操作</button></td>
                        </tr>
              </tbody>
            </table>
           </div>
           <div class="batch_page">
             <button class="btn btn_batch btn-danger" :class="disabled?'disabled':''" @click="del">批量删除</button>
             <nav aria-label="Page navigation">
            <ul class="pagination">
                <li>
                  <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li v-if="listleft"><a class="ellipsis">...</a></li>
                <li v-for="(list,index) in numpage" :class="index?'':'active'"><a href="#">{{index+1}}</a></li>
                <li v-if="listright"><a class="ellipsis">...</a></li>
                <li>
                  <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
                
            </ul>
        </nav>
           </div>
         </div>
  </section>
</template>

<script>
import  mastuser from '../json/demo.json';

export default {
  data(){
    return{
      search:'',
      users:mastuser.users,
      selectArr:[],
      mainshow:false,
      disabled:true,
      numpage:[],
      listleft:false,
      listright:false,
      listlenth:'',
    }
  },
  methods:{
       checkedAll:function(event){
          var _this = this;
        if (!event.currentTarget.checked) {
          this.selectArr = [];
        } else { 
          this.users.forEach(function(listy, i) {
            _this.selectArr.push(i);
          });
        }
        },
        del:function(){
          var arr = [];
          var len = this.users.length;
          for(var i=0;i<len;i++){
            if(this.selectArr.indexOf(i) != -1){
                    console.log(this.users[i])
            }else{
                    arr.push(this.users[i])
            }
          }
          this.users = arr;
          this.selectArr = []
        },

     },
     watch:{
          selectArr(e){
            if(e.length === this.users.length){
                this.mainshow = true;
            }
            if(e.length != this.users.length){
                this.mainshow = false;
            }
            if(e.length>0){
                this.disabled = false
            }
            if(e.length==0){
                this.disabled = true
            }
          },
          listlenth(e){
            alert(1)
          }    
     },
     computed: {
        searchData: function() {
          var search = this.search;

          if(search){
              return this.users.filter(function(users) {
              return Object.keys(users).some(function(key) {
                return String(users[key]).toLowerCase().indexOf(search) > -1;
              })
            })
          }
        return this.users
        },

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

</style>




<!-- 
<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">开始演示模态框</button>


<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">模态框（Modal）标题</h4>
            </div>
            <div class="modal-body">在这里添加一些文本</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">提交更改</button>
            </div>
        </div>
    </div>
</div>
 -->