<template>
    <div class="floor-chart-box-map">
        <div  class="flow-chart-top-toolbar">      
        </div>

        <div class="flow-chart-content">
            <div :id="drawingBoard" class="drawing-board" :style="{height:'700px',background:'#f5f5f5'}"></div>  
        </div>
         
    </div>
</template>

<script>
import init from './draw';
import dataFormat from './dataFormat';
var canvasData = /*[ 
        { name: "未租", pos: "0 0", size:"50 50", color:"yellow"},
        { name: "在租", pos: "276 19", size:"100 100", color:"#499df1"},
        { name: "合同未生效", pos: "44 214", size:"100 50",color:"#ccc"},
        { name: "不可用", pos: "239 171", size:"50 100",color:"#000"}
    ];*/
    [
        {
            "cellHeight":"30","cellWidth":"30","communityId":1,"communityName":"创业大街社区","currentId":62,"figures":[
            {
                "belongId":1416,"belongType":"SPACE","canFigureId":1,"capacity":9,"cellCoordX":"100","cellCoordY":"100","cellHeight":"200","cellName":"301","cellWidth":"50","floor":3,"floorGraphId":2,"id":9844,"inventStatus":"IN_RENT","price":17100,"quotedPrice":"28080","recentEnd":1651248000000,"recentStart":1540224000000,"seatPrice":28080,"spaceType":"INDEPENDENT_OFFICE","statusName":"在租","totalPrice":28080,"unitPrice":"3120","unitPriceNum":3120
            },
            {
                "belongId":1416,"belongType":"SPACE","canFigureId":1,"capacity":9,"cellCoordX":"300","cellCoordY":"400","cellHeight":"100","cellName":"302","cellWidth":"100","floor":3,"floorGraphId":2,"id":9845,"inventStatus":"NOT_EFFECT","price":17100,"quotedPrice":"28080","recentEnd":1651248000000,"recentStart":1540224000000,"seatPrice":28080,"spaceType":"INDEPENDENT_OFFICE","statusName":"合同未生效","totalPrice":28080,"unitPrice":"3120","unitPriceNum":3120
            },
            {
                "belongId":1416,"belongType":"STATION","canFigureId":1,"capacity":9,"cellCoordX":"10","cellCoordY":"10","cellHeight":"30","cellName":"302","cellWidth":"30","floor":3,"floorGraphId":2,"id":9845,"inventStatus":"AVAILABLE","price":17100,"quotedPrice":"28080","recentEnd":1651248000000,"recentStart":1540224000000,"seatPrice":28080,"spaceType":"INDEPENDENT_OFFICE","statusName":"合同未生效","totalPrice":28080,"unitPrice":"3120","unitPriceNum":3120
            }
            ],"floor":3,"graphFileId":46612,"graphFileName":"大街OP图-01.jpg","graphFilePath":"/krspace_oa_web/doc/docFile/viewFile?sourceservicetoken=AF6nQfcS0uARjSHa6gf4EDwKqoPfHQctOaDrWZTN7GCj7NHlBm0yqBn7WisuUTey&operater=2&fileId=46612","id":2,"idToIndex":{}
            ,"operater":101,"stationSizeSame":"SAME","updateDate":1511339066000
        }
    ]
var flowChart= '';
 export default {
    props:{
        data:{
          default:()=>[],
          type:Array 
        }
    },
    data(){
        return{
            overview:'overPlanview' + this._uid,
            drawingBoard:'drawingPlanBoard' + this._uid
        }
    },
    methods:{
        mouseEnter(event,node){
             var every=node.data;
             var everyData =every?every:{};
             this.$emit('enter',event,everyData,this.data);
        },
        mouseLeave(event,node){
             var every=node.data;
             var everyData =every?every:{};
             this.$emit('leave',event,everyData,this.data);
        },
        mouseClick(event){
            var every=e.subject.part.data;
            var everyData =every?every:{};
            this.$emit('click',event,everyData,this.data); 
        }  
    },
    mounted(){
        flowChart =  init(
            go,
            this.drawingBoard,
            dataFormat.init(this.data),
            this.mouseClick,
            this.mouseEnter,
            this.mouseLeave,
        )
    }
 }
</script>

<style lang="less" scoped> 
.floor-chart-box-map {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding-top: 50px;
    background: #DAE4E4;
    transition: all 0.3 ease;
    .flow-chart-top-toolbar{
        position: absolute;
        height: 50px;
        width: 100%;
        top: 0px;
        left: 0px;
        background: #F6F6F6;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .flow-chart-content{
        .drawing-board{
          box-sizing: border-box;
          margin: 10px;
          border: 1px solid #E5E5E5;
          max-width: 100%;
        }
    }
}



</style>
