<template>
    <div class="door-relationship">
        <Select
            v-model="communityId"
            style="width:150px"
            placeholder="请选择社区"
            filterable
            clearable
        >
            <Option  v-for="item in communityList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
        </Select>
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
            addNewNode : 0 ,
            communityId : null,
            communityList :[],
            dateTemplate :{},
            
       }
   },
   components:{
    NewCreate,
    EditForm
   },
   mounted(){

       this.getCommunity();
       this.drawMap()
   },
  
   methods:{
        drawMap(){
            console.log("dldkfldk")
            let _this =this;
            var $ = go.GraphObject.make;
            this.myDiagram = $(go.Diagram, "myDiagramDiv",
            {
                initialContentAlignment: go.Spot.Center,
                "undoManager.isEnabled": true, 
                "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
            });
            this.myDiagram.nodeTemplate =
            $(go.Node, "Auto",
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "RoundedRectangle",
                    {
                        parameter1: 10,  
                        fill: $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
                        stroke: null,
                        portId: "",  
                        fromLinkable: true, fromLinkableDuplicates: true,
                        toLinkable: true,toLinkableDuplicates: true,
                        cursor: "pointer"
                    }),
                $(go.TextBlock, "name",
                { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text","name").makeTwoWay())
            );

            this.myDiagram.nodeTemplate.selectionAdornmentTemplate =
            
                $(go.Adornment, "Spot",
                    $(go.Panel, "Auto",
                    $(go.Shape, { fill: null, stroke: "#000", strokeWidth: 1 }),
                    $(go.Placeholder)  
                    ),
                     
                    $("Button",
                    {
                        alignment: go.Spot.TopRight,
                        click: _this.editItemData, 
                        
                    },
                    $(go.TextBlock, "编辑", 
                        { font: "normal 10pt sans-serif" }),
                    $(go.Shape, "PlusLine", { width: 6, height: 6 })
                    ) 
                ); 

            var dateTemplate = this.dateTemplate;
            this.model = go.Model.fromJson(dateTemplate);
            this.myDiagram.model = this.model;
        },

        getMapData(params){
            this.$http.get('getDoorRelationshipData', params).then((res)=>{
                var reponseData = res.data;
                var nodeDataArrayNew = [];
                for(var i = 0 ;i< reponseData.setList.length;i++){
                    nodeDataArrayNew[i] = {
                        "id": reponseData.setList[i].id,
                        "loc": reponseData.setList[i].x + " "+ reponseData.setList[i].y,
                        "name" : reponseData.setList[i].name,
                        "memo" : reponseData.setList[i].memo,
                        "communityId " : reponseData.setList[i].communityId,
                    }
                }
                this.dateTemplate = { "nodeKeyProperty": "id",
                                "nodeDataArray":nodeDataArrayNew,
                                "linkDataArray":reponseData.setRelationList
                                }
                var dateTemplate = this.dateTemplate;
                this.model = go.Model.fromJson(dateTemplate);
            
            this.myDiagram.model = this.model;
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },

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
            var locationY = (this.addNewNode)*70
            var location  = 0+ " " + locationY
            var newCreateData = Object.assign({},this.newCreateData,{"loc":location})
            this.addNewNode +=1;
            
            this.myDiagram.startTransaction("make new node");
            this.myDiagram.model.addNodeData(newCreateData);
            this.myDiagram.commitTransaction("make new node");
            // 获取model数据
            this.addNewCreateDataReq(newCreateData);
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
        },
        addNewCreateDataReq(sendMsg){
            let _this =this;
            var locationArr = sendMsg.loc.split(' ');
            console.log("locationArr",locationArr)
            var realsendMsg = {
                communityId : _this.communityId,
                memo :sendMsg.memo,
                name :sendMsg.name,
                x :locationArr[0],
                y :locationArr[1],
            }
            this.$http.post('newCreateDoorRelationship', realsendMsg).then((res)=>{
				console.log("新增成功")
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        getCommunity(){
            
            this.$http.get('join-bill-community','').then((res)=>{
                this.communityList=res.data.items;
                this.communityId = res.data.items[0].id

                var params = {communityId : this.communityId}
                this.getMapData(params);
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
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