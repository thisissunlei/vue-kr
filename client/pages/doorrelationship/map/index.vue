<template>
    <div class="door-relationship">
       <div id="myDiagramDiv" style="width:100%; height:100%; background-color: #DAE4E4;">

       </div>
    </div>
</template>

<script>
// import PaidList from './paidList';
// import WaitList from './waitList';
//import utils from '~/plugins/utils';



export default {
   name:'billList',
    head () {
            return {
                title: "门禁级联关系"
            }
    },
   data(){
       return {
        
       }
   },
   components:{
    
   },
   mounted(){
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, "myDiagramDiv",
        {
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                    { angle: 90, layerSpacing: 35 })
        });
        // the template we defined earlier
        myDiagram.nodeTemplate =
        $(go.Node, "Horizontal",
            { background: "#44CCFF" },
            $(go.Picture,
            { margin: 10, width: 50, height: 50, background: "red" },
            new go.Binding("source")),
            $(go.TextBlock, "Default Text",
            { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
            new go.Binding("text", "name"))
        );

        var model = $(go.TreeModel);
        model.nodeDataArray =
        [
        { key: "1",              name: "Don Meow",   source: 'map/images/seal.png'},
        { key: "2", parent: "1", name: "Demeter",    source: "cat2.png" },
        { key: "3", parent: "1", name: "Copricat",   source: "cat3.png" },
        { key: "4", parent: "3", name: "Jellylorum", source: "cat4.png" },
        { key: "5", parent: "3", name: "Alonzo",     source: "cat5.png" },
        { key: "6", parent: "2", name: "Munkustrap", source: "cat6.png" }
        ];
        myDiagram.model = model;
   },
   methods:{
        
        
    }
 }
</script>
<style lang="less">
    .door-relationship{
        width:100%;
        height:100%;
    }


</style>