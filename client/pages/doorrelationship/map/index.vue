<template>
    <div class="door-relationship">
       <Button  type="primary" @click="newCreateEquipmentGroup">新增设备组</Button>
       <Modal
            v-model="openNewCreateModal"
            width="490"
            title="新建设备组"
            @on-ok="sumbmitNewCreateData">
            <NewCreate @formData="getNewCreateData" v-if="openNewCreateModal"/>
        </Modal>
        <Modal
            v-model="openEditModal"
            width="490"
            title="编辑设备组"
            @on-ok="sumbmitEditData">
            <EditForm @formData="getEditForm" v-if="openEditModal" :initialData="editInitailData"/>
        </Modal>
        <div id="myDiagramDiv" style="width:1000px; height:500px; background-color: #DAE4E4;">

        </div>
    </div>
</template>

<script>
import Buttons from '~/components/Buttons';
import NewCreate from './newCreate';
import EditForm from './editForm';

export default {
   name:'doorRelationship',
    head () {
        return {
            title: "门禁级联关系"
        }
    },
   data(){
       return {
            openNewCreateModal :false,
            openEditModal : false,
            newCreateData : {},
            editData : {},
            callback:null,
            cancelCallback:null,
            myDiagram:null,
            model : null,
            editInitailData : {},
       }
   },
   components:{
    NewCreate,
    EditForm
   },
   mounted(){
       let _this =this;
        var $ = go.GraphObject.make;
        this.myDiagram = $(go.Diagram, "myDiagramDiv",
        {
            // start everything in the middle of the viewport
            initialContentAlignment: go.Spot.Center,
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            // have mouse wheel events zoom in and out instead of scroll up and down
            "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        });
        // the template we defined earlier
        this.myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            // { background: "#44CCFF" },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "RoundedRectangle",
                {
                    parameter1: 10,  // the corner has a large radius
                    fill: $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
                    stroke: null,
                    portId: "",  // this Shape is the Node's port, not the whole Node
                    fromLinkable: true, fromLinkableDuplicates: true,
                    toLinkable: true,toLinkableDuplicates: true,
                    cursor: "pointer"
                }),
            $(go.TextBlock, "groupName",
            { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
             new go.Binding("text","groupName").makeTwoWay())
        );

        // unlike the normal selection Adornment, this one includes a Button
        this.myDiagram.nodeTemplate.selectionAdornmentTemplate =
        
            $(go.Adornment, "Spot",
                $(go.Panel, "Auto",
                $(go.Shape, { fill: null, stroke: "blue", strokeWidth: 1 }),
                $(go.Placeholder)  // a Placeholder sizes itself to the selected Node
                ),
                // the button to create a "next" node, at the top-right corner
                $("Button",
                {
                    alignment: go.Spot.TopRight,
                    click: _this.editItemData,  // this function is defined below
                    
                },
                $(go.TextBlock, "编辑",  // the Button content
                    { font: "normal 10pt sans-serif" }),
                $(go.Shape, "PlusLine", { width: 6, height: 6 })
                ) // end button
            ); // end Adornment

        var dateTemplate = { "nodeKeyProperty": "id",
                            "nodeDataArray": [
                                { "id": 0, "loc": "120 120", "groupName": "设备组1" ,"memo":"111233"},
                                { "id": 1, "loc": "330 120", "groupName": "First down" },
                                { "id": 2, "loc": "226 376", "groupName": "First up" },
                                { "id": 3, "loc": "60 276", "groupName": "Second down" },
                                { "id": 4, "loc": "226 226", "groupName": "Wait" }
                            ],
                            "linkDataArray": [
                                { "from": 0, "to": 1, "curviness": 20 },
                                { "from": 1, "to": 2 },
                                { "from": 1, "to": 4 },
                                { "from": 2, "to": 0 },
                                { "from": 2, "to": 3 },
                                { "from": 3, "to": 0 },
                                { "from": 4, "to": 0 },
                            ]
                            }
        this.model = go.Model.fromJson(dateTemplate);
        
        this.myDiagram.model = this.model;

        
   },
   methods:{
        newCreateEquipmentGroup(){
           
            this.openNewCreateModal = !this.openNewCreateModal;
            
        },
        getNewCreateData(form,callback,cancel){
            
            this.newCreateData=form;

        },
        getEditForm(form){
            this.editData=form;
        },
        sumbmitNewCreateData(){
            console.log("newCreateData",this.newCreateData);
            var newCreateData = Object.assign({},this.newCreateData)
            this.myDiagram.startTransaction("make new node");
            this.myDiagram.model.addNodeData(newCreateData);
            this.myDiagram.commitTransaction("make new node");
            // 获取model数据
            console.log("this.myDiagram.model.toJson()",this.myDiagram.model.toJson())
        },
        sumbmitEditData(){
            console.log("editDate",this.editData);
            
        },
        editItemData (e, obj){
            console.log("e",e,"obj",obj,obj.part.adornedPart.data);
            this.editInitailData = obj.part.adornedPart.data;
            this.openEditFormModal();

        },
        openEditFormModal(){
            this.openEditModal = !this.openEditModal
        }



        
    }
 }
</script>
<style lang="less">
    .door-relationship{
        width:100%;
        height:100%;
    }
</style>