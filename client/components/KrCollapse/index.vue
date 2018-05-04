<template>

<div class= "ui-kr-collapse" >
	<div class="collapse-box" v-for="(item,index) in data" :key="item.id">
        <div class="title" 
            @click="onChange(index,item)"
            :style="{
             background:activeBox==index?'#EFF2F4':'#ffffff'
          }" 
        >
          {{item.label}}
          <div :class="{
              'collapse-icon':true,
              'collapse-icon-take-up':!activeBox==index,
              'collapse-icon-open':activeBox==index
          }"></div>
        </div>
        <div class="content" 
            :style="{
              height:activeBox==index?item.children.length * 45 +'px':0,
            }">
            <div class="collapse-children" v-for="child in item.children" :key="child.id">
                <div><div class="round"></div>{{child.label}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {

       props:{
          data:{
              type:Array
          },
          openIndex:{
              type:[Number,String],
              default:0,
          }
        },
        data(){
           return{
               activeBox:this.openIndex
           }
        },
        watch:{
           openIndex(){
               this.activeBox = this.openIndex;
           }
        },
        
        methods:{
            onChange(index,data){
                this.$emit('onChange',index,data)
            }

        },
    }
</script>
<style lang="less" scoped>
.ui-kr-collapse{
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    padding-top:5px;
    
    .collapse-box{
        position: relative;
        .collapse-icon{
          display: inline-block;
          height: 8px;
          width: 16px;
          position: absolute;
          right: 20px;
          top: 0px;
          background-size: 100%;
          background-repeat: no-repeat;
          top: 50%;
          margin-top: -4px;
        }
        .collapse-icon-open{
          background-image:url(./images/open.svg); 
        }
        .collapse-icon-open:hover{
          background-image:url(./images/open-active.svg); 
        }
        .collapse-icon-take-up{
          background-image:url(./images/take-up.svg); 
        }
        .collapse-icon-take-up:hover{
          background-image:url(./images/take-up-active.svg); 
        }
       
        .title{
            height: 50px;
            line-height: 50px;
            padding-left:30px;
            border-bottom: 1px solid #EFF2F4;
            font-size: 16px;
            color: #333;
            box-sizing: border-box;
            cursor: pointer;
            position: relative;
        }
        
        .title:hover{
            background: #EFF2F4;
        }
        .content{
            height: auto;
            width: 100%;
            display:block;
            min-height: 0px;
            padding-left: 40px;
            padding-top: 0px;
            background: #ffffff;
            border-bottom: 1px solid #EFF2F4;
            overflow: hidden;
            box-sizing: border-box;
            .collapse-children{
                display: block;
                height: 45px;
                line-height: 45px;
                font-size: 14px;
                color: #666;
                position: relative;
                .round{
                    width: 7px;
                    height: 7px;
                    border-radius: 4px;
                    border: 1px solid #666;
                    position: absolute;
                    top: 19px;
                    left: -10px;
                }
            }
        }
    }
    .collapse-box:nth-of-type(1) .title{
            border-bottom: 1px solid #EFF2F4;
    } 
    
}
</style>
