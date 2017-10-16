<template>
	<div class="hehe">
	  <div class="maintop" @click="hehe">
	  	  <div class="logo">杨浦刘德华</div>
	  </div>


   <div class="main_region">
	  <div class="mainleft">
	     <div class="toplist">
	     	<ul>
	     		<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
	     			<div @click="index_click(index)">
	     				<span :class="item.iconimg" aria-hidden="true"></span>
	     			    <span>{{item.name}}</span>
	     		    </div>
	     			<ul  v-if="clickshow" :class="{listshow:index==wangIndex}">
	     				<li v-for="child in item.children" :class="$route.path==child.path?'sonbg':''" @click="$router.push(child.path)">
	     					{{child.name}}
	     				</li>
	     			 </ul>
	     		</li>
	     	</ul>
	     </div>
	  </div>
	  <div class="maincenter">
	      <div class="mainlist">
	      	  <div class="remind_main">
	      	      {{$route.name}}
	      	      <div class="remind">
	      	      	<span v-for="item in $route.matched">
	      	      	  {{item.name}}
	      	        </span>
	      	        <span>/</span>
	      	      </div>
	      	  </div>
	      	  <router-view></router-view>
	      </div>
	  </div>
    </div>  

	</div>
</template>


<script>
export default{
	data(){
		return{
		   clickshow:true,
           wangIndex:2,
		}
	},
	methods:{
		hehe:function(){
			
		},
		index_click:function(index){
	      this.clickshow = true;
		  this.wangIndex=index;
		},
		hehe3:function(){
			
		},

	}
}
</script>
<!-- lang="scss" scoped -->
<style>
.btn{padding: 4px 12px}
.main_region{width:100%; display: flex;position: absolute;top: 60px;bottom: 0px;overflow: hidden;}
.mainleft{width:240px; box-sizing: border-box; background: #eef1f6;}
.mainleft .toplist{position: relative; height: 100%;}	
.maincenter{ flex: 1;overflow-y: scroll;padding: 20px; padding-top: 10px; box-sizing: border-box;}
.maincenter .mainlist{ box-sizing: border-box;}

.maintop{width:100%; height: 60px; position: fixed; z-index: 105; background: #337ab7;}
.maintop .logo{width: 240px; height: 60px; text-align: center; color: #fff; line-height: 60px; font-size: 24px;}

.toplist ul{margin:0; padding:0;}
.toplist ul li{ line-height: 56px; list-style: none;}
.toplist ul li ul{margin:0; padding:0; height: 0; display: none;transition: height 2s;
-moz-transition: height 2s;-webkit-transition: height 2s;-o-transition: height 2s; }
.toplist ul li ul li{background: #e4e8f1; padding: 0; line-height: 56px; padding:0 40px;}
.toplist ul li div{padding:0 40px;}
.toplist ul li div:hover{background: #d1dbe5;}
.toplist ul li.nav_3,.toplist ul li.nav_4{padding:0 40px;}
.toplist ul li ul li:hover{background: #d1dbe5;}
.toplist ul li.nav_3:hover,.toplist ul li.nav_4:hover{background: #d1dbe5;}

.toplist ul li ul li.sonbg{color: #20a0ff}
.toplist ul li ul.listshow{height: auto; display: block; }


.glyphicon-envelope,.glyphicon-align-right,.glyphicon-picture,.glyphicon-globe{margin-left: -4px;}
.glyphicon-envelope::before,.glyphicon-align-right::before,.glyphicon-picture::before,.glyphicon-globe::before{margin-left: -20px;}
.remind{float: right; margin-right: 10px;}
.remind span,.remind em{display: inline-block; margin-left: 10px; line-height: 30px;}
.remind span:nth-last-child(2){float: right; color: #aaa;}
.remind span:nth-last-child(1){color: #aaa;}
.remind_main{line-height: 30px;}
</style>