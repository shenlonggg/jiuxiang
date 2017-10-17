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
                <h4 class="modal-title" id="myModalLabel">模态框（Modal）1标题</h4>
            </div>
            <div class="modal-body">在这里添加一些文本</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">提交更改</button>
            </div>
        </div>
    </div>
</div>


<!-- 编辑 -->
<div class="modal fade" id="Edit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">模态框（Modal）2标题</h4>
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
    }
  },
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
            this.list.splice(index,1)
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




