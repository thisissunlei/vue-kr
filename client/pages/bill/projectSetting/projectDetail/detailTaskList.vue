<template>
    <div class='chart-wrap'>
       <div class='chart-title'>
          <p>任务列表</p>
          <!-- <p class='chart-title-right' @click="addClick('')">
            <Icon type="plus-circled" size="20" style="vertical-align:middle;color:#499df1;"/>
            <span class='chart-list' style="color:#499df1;">添加任务</span>
          </p> -->
       </div>

       <div class='chart-detail'  @mouseover='leftOver' id="vue-chart-left-detail-list"> 
           <ul>
              <li
                v-for="(item,index) in data"
                :key="item.t_id"
                class='detail-li'
              >
                 <div class='chart-parent' :data-box-id="item.t_id" 
                  @mouseover="overShow(item.t_id)"
                  @mouseout="outHide(item.t_id)"
                 >
                   <div class='parent-middle' @click="editClick(item.value,'')">
                    <Tooltip :content="item.label" :placement="index==0?'bottom':'top'">
                      <div class='chart-left-name' @click="showClick(item.t_id)">
                        <span :class="item.data.focus?'parent-icon active-icon':'parent-icon'" :id="'parent-icon'+item.t_id" @click="iconClick(item.value,item.data.focus)"></span>
                        <span class="chart-name">{{item.label}}</span>
                      </div>
                    </Tooltip>
                    <div  class='chart-edit'>
                        <span class='edit'></span>
                    </div>
                   </div>
                 </div>
                 
                  <ul class='chart-children'  :id='"chart-children"+item.t_id'>
                      <li
                        v-for="items in item.children"
                        :key="items.t_id"
                        class='detail-li'
                      >
                          <div class='chart-parent' style="padding-left:0;" v-if="items.chartType!='single'" :data-box-id="items.t_id"
                            @mouseover="overShow(items.t_id)"
                            @mouseout="outHide(items.t_id)"
                          >
                            <div class='parent-middle' @click="editClick(items.value,item.value)">
                              <Tooltip :content="items.label" placement="top">
                                <div class='chart-left-name'>
                                  <span :class="item.data.focus?'parent-icon active-icon':'parent-icon'" :id="'parent-icon'+item.t_id" @click="iconClick(items.value,items.data.focus)"></span>
                                  <span class="chart-name">{{items.label}}</span>
                                </div>
                              </Tooltip>
                              <div  class='chart-edit'>
                                <span class='edit'></span>
                              </div>
                            </div>
                          </div>
                      </li>
                      <!-- <p class='add-child-task' @click="addClick(item.value)">
                        <Icon type="plus-circled" size="20" style="vertical-align:middle;color: rgb(102, 102, 102);"/>
                        <span class='chart-list'>添加子任务</span>
                      </p> -->
                </ul>

              </li>
            
           </ul>
       </div>

    </div>
</template>

<script>
import ToolTip from '~/components/ToolTip';
export default {
    components:{
       ToolTip
    },
    props:{
        data:{
            type:Array
        }
    },
    mounted(){
      
    },
    methods:{
      leftOver(event){
         this.$emit("leftOver",event); 
      },
      addClick(id){
         this.$emit("addClick",id); 
      },
      editClick(id,parentId){
         this.$emit("editClick",id,parentId); 
      },
      iconClick(id,mask){
         event.cancelBubble = true;
         this.$emit("iconClick",id,mask); 
      },
      showClick(id){
         return ;
         var dom=document.getElementById('chart-children'+id);
         var icon=document.getElementById('parent-icon'+id);
         var classVal = icon?icon.getAttribute("class"):'';
         if(dom.style.display=='none'){
            dom.style.display='block';
            classVal = classVal.concat(" iconDown");
            icon.setAttribute("class",classVal );
         }else{
            dom.style.display='none';
            classVal = classVal.replace("iconDown","");
            icon.setAttribute("class",classVal );
         }
      },
      detailScroll(event){
        this.$emit('scroll',event)
      },
      overShow(id){
            var leftDom = document.querySelectorAll('div[data-box-id="'+id+'"]')[0];
            var rightDom= document.querySelectorAll('div[data-chart="'+id+'"]')[0];
            if(leftDom&&rightDom){
                leftDom.style.background="#F7F9FB";
                rightDom.style.background="#F7F9FB";
            }
      },
      outHide(id){
          var leftDom = document.querySelectorAll('div[data-box-id="'+id+'"]')[0];
          var rightDom= document.querySelectorAll('div[data-chart="'+id+'"]')[0];
          if(leftDom&&rightDom){
              leftDom.style.background="#fff";
              rightDom.style.background="#fff";
          }
      }
    }
}
</script>

<style lang='less' scoped>
   .chart-wrap{
      width:246px;
      display:inline-block;
      border:solid 1px #F0F0F0;
      border-right:solid 5px #F0F0F0;
      //border-bottom:none;
     .chart-title{
       width:100%;
       height:100px;
       //text-align:center;
       line-height:100px;
       padding-left:12px;
       padding-right:18px;
       background: #fff;
       border-bottom:solid 1px #F0F0F0;
      }
      .chart-detail{
         width:100%;
         background: #fff;
         max-height:500px;
         overflow:scroll;
         .detail-li{
              cursor: pointer;
             .chart-parent{
                width:100%;
                height:40px;
                border-bottom:solid 1px #F0F0F0;
                padding-left:12px;
                padding-right:18px;
                display: table;
                .parent-middle{
                    position: relative;
                    display: table-cell;
                    vertical-align: middle;
                    padding-top: 8px;
                }
                .chart-left-name{
                  display:inline-block;
                  max-width:180px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  cursor: pointer;
                  .chart-name{
                    font-family: PingFang-SC-Medium;
                    font-size: 14px;
                    color: #499DF1;
                    padding-left:4px;
                    display:inline-block;
                }
              }
              .chart-edit{
                  cursor: pointer;
                  float:right;
                  .edit{
                     display:inline-block;
                     width:15px;
                     height:15px;
                     background:url(./images/edit.svg) no-repeat center;
                     background-size: contain;
                  }
              }
              .parent-icon{
                 display:inline-block;
                 width:14px;
                 height:14px;
                 background:url(./images/Star.svg) no-repeat center;
                 background-size: 100%;
                 vertical-align: middle;
                 margin-top:-4px;
                 transition: all 0.5s ease;
              }
              .active-icon{
                 background:url(./images/Star_select.svg) no-repeat center;
              }
              .iconDown{
                 transform: rotate(180deg);
              }
           }
           .chart-children{
               transition: all 0.5s ease;
              .chart-left-name{
                 padding-left:12px;
              }
           }
        }   
      }
      p{
          display:inline-block;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          color: #666666;
          line-height: 14px;
          width:50%;
          text-align:left;
      }
      .chart-title-right{
         text-align: right;
         cursor: pointer;
      }
      .add-child-task{
        width:100%;
        height:40px;
        line-height:40px;
        padding-left:26px;
        border-bottom:solid 1px #F0F0F0;
        cursor: pointer;
      }
      .chart-list{
        padding-left:5px;
        color: rgb(102, 102, 102);
      }
   }
   ::-webkit-scrollbar {
         width:0px;
    }
   
</style>
