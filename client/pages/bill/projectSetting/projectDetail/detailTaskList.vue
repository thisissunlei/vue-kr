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
                :key="item.tId"
                class='detail-li'
              >
                 <div class='chart-parent' :data-box-id="item.tId">
                      <div class='chart-left-name' @click="showClick(item.tId)">
                        <span class='parent-icon' :id="'parent-icon'+item.tId"></span>
                        <span class="chart-name">{{item.name}}</span>
                      </div>
                      <div @click="editClick(item.tId)" class='chart-edit'>
                        <Icon type="edit" size="15" style='color:#979797;'/>
                      </div>
                 </div>
                 
                  <ul class='chart-children' style="display:none;" :id='"chart-children"+item.tId'>
                      <li
                        v-for="items in item.children"
                        :key="items.tId"
                        class='detail-li'
                      >
                          <div class='chart-parent' :data-box-id="items.tId">
                              <div class='chart-left-name'>
                                <Icon type="minus-round" size="4" style="color: #666666;"/>
                                <span class="chart-name" style="color: #666666;">{{items.name}}</span>
                              </div>
                              <div @click="editClick(items.tId)" class='chart-edit'>
                                <Icon type="edit" size="15" style='color:#979797;'/>
                              </div>
                          </div>
                      </li>
                      <p class='add-child-task' @click="addClick(item.tId)">
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
    data() {
        return{
           
        }
    },
    methods:{
      addClick(id){
         this.$emit("addClick",id); 
      },
      editClick(id){
         this.$emit("editClick",id); 
      },
      showClick(id){
         var dom=document.getElementById('chart-children'+id);
         var icon=document.getElementById('parent-icon'+id);
         var classVal = icon.getAttribute("class");
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
      padding-bottom:30px;
      margin-left:25px;
     .chart-title{
       width:100%;
       height:101px;
       text-align:center;
       line-height:101px;
       padding-left:12px;
       padding-right:18px;
       background: #F0F1F6;
       border-bottom:solid 1px #E1E6EB;
      }
      .chart-detail{
         width:100%;
         background: #F0F1F6;
         .detail-li{
             .chart-parent{
                height:70px;
                line-height:70px;
                border-bottom:solid 1px #E1E6EB;
                padding-left:12px;
                padding-right:18px;
                .chart-left-name{
                  display:inline-block;
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
        border-bottom:solid 1px #E1E6EB;
        cursor: pointer;
      }
      .chart-list{
        padding-left:5px;
        color:#499DF1;
      }
   }
   
</style>
