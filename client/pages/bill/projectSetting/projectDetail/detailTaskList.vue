<template>
    <div class='chart-wrap'>
       <div class='chart-title'>
          <p>任务列表</p>
          <p class='chart-title-right' @click="addClick('')">
            <Icon type="plus-circled" size="20" style="vertical-align:middle;color:#499df1;"/>
            <span class='chart-list'>添加任务</span>
          </p>
       </div>

       <div class='chart-detail'> 
           <ul>
              <li
                v-for="item in data"
                :key="item.t_id"
                class='detail-li'
              >
                 <div class='chart-parent' :data-box-id="item.t_id">
                   <div class='parent-middle'>
                     <Tooltip :content="item.label" placement="top">
                        <div class='chart-left-name' @click="showClick(item.t_id)">
                          <span class='parent-icon' :id="'parent-icon'+item.t_id"></span>
                          <span class="chart-name">{{item.label}}</span>
                        </div>
                    </Tooltip>
                    <div @click="editClick(item.value,'')" class='chart-edit'>
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
                          <div class='chart-parent' v-if="items.chartType!='single'" :data-box-id="items.t_id">
                            <div class='parent-middle'>
                              <Tooltip :content="items.label" placement="top">
                                  <div class='chart-left-name'>
                                    <Icon type="minus-round" size="4" style="color: #666666;"/>
                                    <span class="chart-name" style="color: #666666;">{{items.label}}</span>
                                  </div>
                              </Tooltip>
                              <div @click="editClick(items.value,item.value)" class='chart-edit'>
                                <span class='edit'></span>
                              </div>
                            </div>
                          </div>
                      </li>
                      <p class='add-child-task' @click="addClick(item.value)">
                        <Icon type="plus-circled" size="20" style="vertical-align:middle;color:#499df1;"/>
                        <span class='chart-list'>添加子任务</span>
                      </p>
                </ul>

              </li>
           </ul>
       </div>

    </div>
</template>

<script>

export default {
    props:{
        data:{
            type:Array
        }
    },
    methods:{
      addClick(id){
         this.$emit("addClick",id); 
      },
      editClick(id,parentId){
         this.$emit("editClick",id,parentId); 
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
       }
    }
}
</script>

<style lang='less' scoped>
   .chart-wrap{
      width:246px;
      display:inline-block;
      border:solid 1px #E1E6EB;
      border-bottom:none;
     .chart-title{
       width:100%;
       height:101px;
       text-align:center;
       line-height:101px;
       padding-left:12px;
       padding-right:18px;
       background: #F0F1F6;
       border-bottom:solid 2px #E1E6EB;
      }
      .chart-detail{
         width:100%;
         background: #F0F1F6;
         .detail-li{
             .chart-parent{
                width:100%;
                height:70px;
                border-bottom:solid 2px #E1E6EB;
                padding-left:12px;
                padding-right:18px;
                display: table;
                .parent-middle{
                    display: table-cell;
                    vertical-align: middle;
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
                 width:10px;
                 height:8px;
                 background:url(./images/down.svg) no-repeat center;
                 background-size: 100%;
                 vertical-align: middle;
                 margin-top:-3px;
                 transition: all 0.5s ease;
              }
              .iconDown{
                 transform: rotate(180deg);
              }
           }
           .chart-children{
               transition: all 0.5s ease;
              .chart-left-name{
                 padding-left:14px;
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
        height:70px;
        line-height:70px;
        padding-left:26px;
        border-bottom:solid 2px #E1E6EB;
        cursor: pointer;
      }
      .chart-list{
        padding-left:5px;
        color:#499DF1;
      }
   }
   
</style>
