<template>
  <div class="inventory-floor-map" id="inventory-floor-map-wrap">
      <SectionTitle title="库存平面图"/>
      <div class="bar">
          <SearchForm 
           @searchForm="searchForm"
           @changeCount="changeCount"
          />
          <Discount 
           @countChange="countChange"
          />
      </div>
      
      <Loading v-if="!isLoading"/>
      
      <FloorPlan
            v-if="isLoading"
            v-for="item in canvasData"
            :key="item.id"
            @click="mouseClick"
            @enter="mouseEnter"
            @leave="mouseLeave"
            @scroll="scroll"
            :data="item"
      >
            <div  class="flow-chart-top-toolbar" slot="toolbar">
                <Tooltip v-for="item in colorLabels" :key="item.id" :content="item.content" placement="bottom"> 
                    <div :class="item.class">
                        <span class="map-font-tip">{{item.label}}</span>
                        <span class="map-color-tip" :style="'background:'+item.color"></span>
                    </div>
                </Tooltip>
                <!-- <span class="warning-tip"></span>
                <span style="font-size: 14px;color: #999999;vertical-align: middle;">图中仅展示独立办公室和固定办公桌的库存</span>  -->

                <Tooltip content="在随后的60天内，有客户或特殊情况占用（目前只可短租）" placement="bottom"> 
                    <div style="display:inline-block;">
                        <span style="font-size:14px;color: #999999;display:inline-block;margin-right:5px;vertical-align: middle;font-family: PingFangSC-Medium;">未来被占用</span>
                        <span class='m-use'></span>
                    </div>
                </Tooltip>
                <Tooltip content="目前的占用将在30天内结束，结束后有连续60天可租" placement="bottom"> 
                    <div style="display:inline-block;margin-right:26px;margin-left:26px;">
                        <span style="font-size:14px;color: #999999;display:inline-block;margin-right:5px;vertical-align: middle;font-family: PingFangSC-Medium;">可预租</span>
                        <span class='m-can'></span>
                    </div>
                </Tooltip>


            </div>
            <template slot="export" slot-scope="props" style="display:inline-block;">
                <div class="export" :id="props.id">导出高清图</div>
                <div class="export" style="width:60px;" @click="openConfig">配置</div>
            </template>    
      </FloorPlan>
      
       <Modal
            width="600"
            v-model="openTime"
            class-name="config-tip"
            title="提示信息的时间配置"
        >
            <Configuration 
              v-if="openTime"
              @submit="submitConfig"
              @close="openConfig"
            />
            <div slot="footer"></div>
       </Modal>

  </div>
</template>

<script>
import FloorPlan from '~/components/FloorPlan/index';
import SectionTitle from '~/components/SectionTitle';
import SearchForm from './searchForm';
import publicFn from './publicFn';
import Discount from './discount';
import utils from '~/plugins/utils';
import Loading from '~/components/Loading';
import Configuration from './configuration';
var wrapDom='';
var mainDom='';
//点击的dom存进一个数组
var clickNone=[];
export default {
  components: {
    FloorPlan,
    SectionTitle,
    SearchForm,
    Discount,
    Loading,
    Configuration
  },
  data(){
    return{
       openTime:false,
       colorLabels:[
        {label:'未租',color:'#BCE590',content:'库存日期当日是未租的',class:'toolbar-inner no-rent'},
        {label:'在租',color:'#fedc82',content:'库存日期当日有客户在租，合同已生效',class:'toolbar-inner in-rent'},
        {label:'合同未生效',color:'#fea877',content:'库存日期当日有未生效的合同占用',class:'toolbar-inner no-availible'},
        {label:'不可用',color:'#E4E4E4',content:'库存日期当日被特殊情况占用',class:'toolbar-inner no-use'}
       ],
       canvasData:[],
       tabForms:{},
       isLoading:false,
       discount:"",
       isFirstClick:false,
       scrollTop:0,
       displayList:'',
       isClickShow:false,
       displayList:'',
       countNum:0   
    }
  },
  mounted(){
     wrapDom=document.getElementById('inventory-floor-map-wrap');  
     mainDom=document.getElementById('layout-content-main');
     mainDom.addEventListener('scroll',this.mainScroll);
     document.body.addEventListener('click',this.allBodyClick);
     let store=localStorage.getItem('floor-map-show-select');
     let route=this.$route.query;
     if(route.displayList){
         this.displayList=route.displayList;
     }else if(store){
         let show=JSON.parse(store);
         let str='';
         show.map((item,index)=>{
             str=str?str+','+item:item
         })
         this.displayList=str; 
     }
  },
  destroyed(){
     document.body.removeEventListener('click',this.bodyClick);
     document.body.removeEventListener('click',this.allBodyClick);
     mainDom.removeEventListener('scroll',this.mainScroll);
  },
  methods:{
    changeCount(val){
        this.countNum++;
        if(this.countNum==1){
            return ;
        }
        let str='';
        val.length&&val.map((item,index)=>{
            str=str?str+','+item:item;
        })
        this.displayList=str;
        localStorage.setItem('floor-map-show-select',JSON.stringify(val));
        this.isClickShow=true;
    },
    submitConfig(forms){
        this.openConfig();
        this.getMapData(this.tabForms);
    },
    openConfig(){
        this.openTime=!this.openTime;
    },
    mainScroll(event){  
        this.scrollTop=event.target.scrollTop;
        if(this.scrollTop==0){
            return ;
        }
        this.isFirstClick=true;
    },
    getItem(arr){
        var obj={};
        arr.map((item,index)=>{
            console.log('name---',localStorage.getItem('map-config-'+item.name),'00',item.name);
            obj[item.name]=localStorage.getItem('map-config-'+item.name)||item.number;
        })
        return obj
    },
    //获取数据
    getMapData(values){
        this.isLoading=false;
        values.currentDate=utils.dateCompatible(values.currentDate);
        let arr=[{name:'futureAvlDays',number:60},{name:'futureOccDays',number:60},{name:'futureAvlEndDays',number:30}];
        console.log('this.getItem(arr)---',this.getItem(arr));
        values=Object.assign({},values,this.getItem(arr));
        this.$http.get('getInventoryMap',values).then((res)=>{
           this.canvasData=[].concat(res.data.items);
           this.canvasData.map((item,index)=>{
                item.currentDate=this.tabForms.currentDate.split(' ')[0];
           })
           this.isLoading=true;
        }).catch((error)=>{
           this.$Notice.error({
              title:error.message
            });
        })        
    },
    searchForm(formItem){
        this.tabForms=Object.assign({},formItem);
        if(clickNone.length){
            clickNone.map((item,index)=>{
              var parentNode=document.getElementById('gantt-chart-tool-tip'+item.id).parentNode;
              this.closeCommon(parentNode);  
            })
            clickNone=[];
        }
        this.tabForms=Object.assign({},this.tabForms,{displayList:this.displayList});
        this.getMapData(this.tabForms);
    },
    countChange(param,countRadio){
        this.discount=countRadio==1?'':param;
    },
    mouseClick(event,every,all,canvas,scroll){
        if(!this.isFirstClick){
            mainDom.scrollTop=0;
        }else{
            mainDom.scrollTop=this.scrollTop;
        }
        var index=this.findEle(clickNone,'id',every.item.id);
        if(index!=-1){
            return ;
        }
        var tirDom = document.getElementById('gantt-chart-tool-tip'+every.item.id);
        if(!tirDom){
            let icon=false;
            this.createTooltip(event,every,all,canvas,scroll,icon,every.item.id);
        }
        clickNone.push({id:every.item.id,everyData:every});
    },
    findEle(array,attr,val){
        for (var i=0;i<array.length;i++){
            if(array[i][attr]==val){
                return i;
            }
        }
        return -1;
    },
    //生成浮框
    createTooltip(event,every,all,canvas,scroll,isIcon,selectId){
         this.createDom(every,isIcon);
         //监听click事件
         document.body.addEventListener('click',this.bodyClick);
         //显示
         var tirDom = document.getElementById('gantt-chart-tool-tip'+selectId);
         var angleDom = document.getElementById('gantt-chart-tool-tip-triangle'+selectId);
         tirDom.style.display = 'block';
         angleDom.style.display = 'block';
         publicFn.poptipOver(every,all,canvas,scroll,this.discount,isIcon)
    },
    mouseEnter(event,every,all,canvas,scroll,isIcon){
         let selectId=isIcon=='icon'?(every.item.id+'icon'+every.item.id):every.item.id;
         var index=this.findEle(clickNone,'id',selectId);
         if(index!=-1){
            return ;
         } 
         this.createTooltip(event,every,all,canvas,scroll,isIcon,selectId);
    },
    allBodyClick(){
        if(this.isClickShow){
            this.isClickShow=false;
            this.$router.replace({path:'/inventory/floor-plan',query:{displayList:this.displayList}});
            //utils.addParams({displayList:this.displayList})
        }
    },
    bodyClick(event){
        var id=event.target.getAttribute('data-titleId');
        var parentNode=event.target.parentNode.parentNode;
        if(id){
            this.titleClose(parentNode,id);
        }
    },
    mouseLeave(event,every,all,isIcon){
        let selectId=isIcon=='icon'?(every.item.id+'icon'+every.item.id):every.item.id;
        var index=this.findEle(clickNone,'id',selectId);
        if(index!=-1){
            return ;
        }     
        var parentNode=document.getElementById('gantt-chart-tool-tip'+selectId).parentNode;
        this.closeCommon(parentNode);
    },
    scroll(all,canvas,scroll){
        clickNone.map((item,index)=>{
            publicFn.poptipOver(item.everyData,all,canvas,scroll,this.discount)
        })
    },
    //关闭dom
    closeCommon(parentNode){
        wrapDom.removeChild(parentNode);
    },
    //点击关闭套弹窗
    titleClose(parentNode,id){
        var index=this.findEle(clickNone,'id',id);
        if (index > -1) {
           clickNone.splice(index, 1);
        }
        this.closeCommon(parentNode);    
    },
    //生成dom
    createDom(every,isIcon){
         let selectId=isIcon=='icon'?(every.item.id+'icon'+every.item.id):every.item.id;
         let isTitle=isIcon=='icon'?'':'<div class="title" data-titleId='+selectId+'></div>';
         var productDom=
            '<div id="gantt-chart-tool-tip'+selectId+'" class="gantt-chart-tool-tip">'+
                isTitle+
                '<div id="gantt-chart-tool-tip-content'+selectId+'" class="gantt-chart-tool-tip-content"></div>'+
            '</div>'+
            '<div id="gantt-chart-tool-tip-triangle'+selectId+'" class="top-triangle gantt-chart-tool-tip-triangle" />';
         var el = document.createElement('div');
         el.innerHTML = productDom;
         wrapDom.appendChild(el);
    }
  }
}
</script>

<style lang="less"> 
  .inventory-floor-map{
     position: relative;
     background: #f5f7f9;
     .section-title{
         background:#fff;
     }
     .flow-chart-top-toolbar{
        padding-left:20px;
        line-height: 50px;
        height: 50px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        display:inline-block;
        .toolbar-inner{
             display:inline-block;
            .map-font-tip{
                display:inline-block;
                vertical-align: middle;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #999999;
            }
            .map-color-tip{
                display:inline-block;
                width:20px;
                height:15px;
                margin-left:10px;
                border-radius: 4px;  
                vertical-align: middle;
            }
        }
        .warning-tip{
            display:inline-block;
            width:19px;
            height:23px;
            background:url(img/warning.png) no-repeat center;
            background-size: 100%;
            margin-right:6px;
            vertical-align: middle;
        }
    }
    .export{
        float:right;
        width:109px;
        height:30px;
        line-height: 30px;
        background: #499DF1;
        box-shadow: 0 1px 4px 0 rgba(14,94,174,0.50);
        border-radius: 4px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        margin-top: 9px;
        margin-right:20px;
        cursor: pointer;
    }
    .gantt-chart-tool-tip{
          max-width: 280px;
          display: none;
          //opacity: 0;
          background: #575D6A;
          position: absolute;
          top: 0px;
          left: 0px;
          border-radius: 4px;
          padding: 5px;
          color: #ffffff;
          z-index: 999;
          //transition: all .1s;
          .title{
              position: absolute;
              right:6px;
              top:10px;
              width:10px;
              height:10px;
              font-size: 14px;
              background:url(img/close.png) no-repeat center;
              background-size:100%;
              cursor: pointer;
          }
          .content{
              font-size: 14px;
              padding: 0px;
              background: transparent;
              display:inline-block;
              vertical-align: middle;
          }
          .gantt-chart-tool-tip-content{
              padding-right:14px;
          }
      }
      .top-triangle{
          border-color: rgba(70,76,91,.9) transparent transparent transparent;
      }
      .bottom-triangle{
          border-color: transparent transparent rgba(70,76,91,.9)  transparent;
      }
      .gantt-chart-tool-tip-triangle{
          //opacity: 0;
          position: absolute;
          display:none;
          width:0;
          height:0;
          border-style:solid;
          border-width:5px;
          top: 0px;
          left: 10px;
          //transition: all .1s;
          z-index: 999;
      }
      .bar{
          position: relative;
          margin-bottom:5px;
      }
      .m-use{
         display:inline-block;
         width:16px;
         height:16px;
         background:url('~/assets/images/use.svg') no-repeat center;
         background-size:100%;
         vertical-align: middle;
      }
      .m-can{
         display:inline-block;
         width:16px;
         height:16px;
         background:url('~/assets/images/can.svg') no-repeat center;
         background-size:100%;
         vertical-align: middle;
      }
      .ivu-tooltip-inner{
        white-space: normal;
      }
      .in-rent{
          margin:0 26px;
      }
      .no-use{
          margin:0 26px;
      }
      .floor-chart-box-map{
          .ivu-tooltip{
              &:first-child{
                  .ivu-tooltip-popper{
                      width:100px;
                  }
              }
          }
      }
  }
  .config-tip{
    .ivu-modal-content{
        height:340px;
    }
   }
</style>
