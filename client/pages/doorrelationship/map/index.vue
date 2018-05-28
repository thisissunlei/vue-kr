<template>
    <div class="door-relationship">
        <Select
            v-model="communityId"
            style="width:150px"
            placeholder="请选择社区"
            filterable
            @on-change="onChangeCommunity"
        >
            <Option  v-for="item in communityList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
        </Select>
        <div class="right-part">   
            <Button type="primary" icon="ios-search" @click="clearAll" class="search-btn">清除</Button>
            <span>输入内容查找设备所在的组：</span>
            <SearchForm 
                :searchFilter="searchFilter"
                :onSubmit="onSubmitSearchForm"
            />
            
        </div>
       
       
        <div id="doorGroupRelationshipMap" style="width: 100%; height: 400px; background-color: #DAE4E4;">

        </div>
        <Drawer
            :openDrawer="openEquipmentDetail"
            iconType="view-icon"
            :close="closeEquipmentDetail"
            width="652"
        >

            <GroupDetail
                :editInitialDataProps="editInitailData"
                @deleteEquipmentGroup="deleteEquipmentGroup"
                :groupDetailDoorListData="groupDetailDoorListData"
                :communityId ="communityId"
                @editNodeDataInDetail = "editNodeDataInDetail"
                @openDeleteTipFromDetail = "openDeleteTipModel"
                @openAddEquipmentModalFun = "openAddEquipmentModalFun"
                @deleteEquipmentSendReq = "deleteEquipmentSendReq"
                @searchEquipment ="searchEquipment"
            />
        </Drawer>
        <Modal
            v-model="openDeleteTip"
            title="注意"
            ok-text="确定"
            cancel-text="取消"
            width="600"
        >
            <p class="delete-tip">删除设备组或组织间的关系时，将同事删除掉组及与该组有关的关系，确认删除吗？</p>
            <div slot="footer">
                <Button type="primary" @click="confirmDelete">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="openDeleteTipModel">取消</Button>
            </div>
        </Modal>
        <Modal
            v-model="openAddEquipmentModal"
            title="所有设备列表"
            ok-text="添加"
            cancel-text="取消"
            width="1000"
            class-name="all-equipment-modal"
        >
            <AllEquipmentList
                v-if="openAddEquipmentModal"
                @addEquipmentToGroup="addEquipmentToGroup"
                :communityId="communityId"
            />
           
            <div slot="footer" class="displayNone"></div>
        </Modal>
    </div>
</template>

<script>

import Drawer from '~/components/Drawer';
import SearchForm from '~/components/SearchForm';
import GroupDetail from './groupDetail';
import AllEquipmentList from './allEquipmentList';

export default {
   name:'doorRelationship',
    head () {
        return {
            title: "门禁级联关系"
        }
    },
   data(){
       return {
            openAddEquipmentModal : false,
            openEquipmentDetail : false,
            newCreateData : {},
            selectedNodeData : {},
            callback:null,
            cancelCallback:null,
            myDiagram:null,
            model : null,
            editInitailData : {},
            addNewNode : 0 ,
            communityId : 1,
            communityList :[],
            //图表数据
            dateTemplate :{},
            refreshedMapData : false,
            openDeleteTip :false,
            groupDetailDoorListData : {},
            searchFilter:[
                    {
                        label:'屏幕编号',
                        value:'doorCode'
                    },
                    {
                        label:'屏幕标题',
                        value:'title'
                    },
                    {
                        label:'硬件ID',
                        value:'deviceId'
                    }
            ],
            searchGroupId : -1,
            searchGroupIdsArr : [],
       }
   },
   components:{
    Drawer,
    GroupDetail,
    AllEquipmentList,SearchForm
   },
   mounted(){

       this.getCommunity(this.getMapData,this.drawMap);
   },
  
   methods:{
       onChangeCommunity(option){
            let _this =this;
            this.communityId = option;
            this.getMapData({communityId :this.communityId },this.refreshMap)
            
       },
       refreshMap(){
           var dateTemplate =this.dateTemplate;
            // console.log("dateTemplate",dateTemplate);
            this.model = go.Model.fromJson(dateTemplate);
            this.myDiagram.model = this.model;
       },
       openDeleteTipModel(){
           this.openDeleteTip = !this.openDeleteTip;
       },
        drawMap(){
            let _this =this;
            var $ = go.GraphObject.make;
            
            this.myDiagram =
                $(go.Diagram, "doorGroupRelationshipMap",  // must name or refer to the DIV HTML element
                    {
                        // start everything in the middle of the viewport
                        initialContentAlignment: go.Spot.Center,
                        // have mouse wheel events zoom in and out instead of scroll up and down
                        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
                        // support double-click in background creating a new node
                        "clickCreatingTool.archetypeNodeData": { text: "new node" },
                        // enable undo & redo
                        "undoManager.isEnabled": true,
                        "clickCreatingTool.insertPart": function(loc) {  // customize the data for the new node
                            this.archetypeNodeData = {
                                // key: getNextKey(), // assign the key based on the number of nodes
                                name: "新设备组",
                                memo: ""
                            };
                            
                            var newCreateNodeParams = Object.assign({},this.archetypeNodeData,{x:loc.x,y:loc.y,communityId : _this.communityId})
                            _this.addNewCreateDataReq(newCreateNodeParams);
                            return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                        },
                       
                    }
                );
            this.myDiagram.nodeTemplate =
           
            $(go.Node, "Auto",


                { 
                    click: function(e, obj) { 
                            _this.selectedNodeData = obj.part.data;
                            // console.log("_this.selectedNodeData",_this.selectedNodeData)
                    },
                    doubleClick: function(e, node) {
                        _this.selectedNodeData = node.data;

                        _this.openEquipmentDetailFun(node.data);
                    },
                    
                    
                }, 
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "RoundedRectangle",
                    {
                        
                        parameter1: 10,  
                        stroke : null,
                        portId: "",  
                        fromLinkable: true, fromLinkableDuplicates: true,
                        toLinkable: true,toLinkableDuplicates: true,
                        cursor: "pointer",
                        
                        
                    },
                    new go.Binding(
                            "fill", 
                            "isHighlighted", 
                            function(h) { 
                                console.log("h",h);
                                return h ? "#f89903" : "#328cf1"; 
                            }
                    ).ofObject()
                ),

                
               
                $(go.TextBlock, "name",
                
                { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text","titleText").makeTwoWay()),
                
                
                
            );

            this.myDiagram.linkTemplate =
            $(go.Link,  // the whole link panel
                
                {
                curve: go.Link.Bezier, adjusting: go.Link.Stretch,
                //  relinkableFrom: true, relinkableTo: true,
                toShortLength: 3
                },
                new go.Binding("points").makeTwoWay(),
                new go.Binding("curviness"),
                $(go.Shape,  // the link shape
                { strokeWidth: 1.5 }),
                $(go.Shape,  // the arrowhead
                { toArrow: "standard", stroke: null }),
                
               
            );

            this.myDiagram.addModelChangedListener(function(evt) {
                // ignore unimportant Transaction events
               
                if (!evt.isTransactionFinished) return;
                var txn = evt.object;  // a Transaction
                if (txn === null) return;
                // iterate over all of the actual ChangedEvents of the Transaction
                txn.changes.each(function(e) {
                    // record node insertions and removals
                    // if (e.change === go.ChangedEvent.Property) {

                    //     if (e.modelChange === "linkFromKey") {
                    //     console.log(evt.propertyName + " changed From key of link: " +
                    //                 e.object + " from: " + e.oldValue + " to: " + e.newValue);
                    //     } else if (e.modelChange === "linkToKey") {
                    //     console.log(evt.propertyName + " changed To key of link: " +
                    //                 e.object + " from: " + e.oldValue + " to: " + e.newValue);
                    //     }
                    // } else
                    // console.log("e.modelChange",e.modelChange,e.change);
                     if (e.change === go.ChangedEvent.Insert ) {
                         if(e.modelChange === "linkDataArray"){
                            var linkData = e.newValue;
                            var param = {
                                            preSetId :linkData.from,
                                            setId :linkData.to,
                                            communityId : _this.communityId
                                        }
                            if(linkData.points){
                                _this.newCreateConnect(param,linkData);
                            }
                         }else if(e.modelChange === "nodeDataArray"){
                             console.log("e.newData",e.newData)
                         }
                        
                        

                    } else if (e.change === go.ChangedEvent.Remove) {
                        if(e.modelChange === "linkDataArray"){
                        
                            var linkData = e.oldValue;
                            var param = {
                                            id :linkData.id,
                                        }
                            // _this.deleteLinkConnectFun(param)
                        }else if(e.modelChange === "nodeDataArray"){
                        
                            var linkData = e.oldValue;
                            var param = {
                                            id :linkData.id,
                                        }
                            // _this.deleteEquipmentGroup(param)
                        }
                        
                    }
                });
            });

            // this.myDiagram.mouseDrop = function(e,obj){
                // console.log("mouseDrop,e",e,"obj",obj)
                // console.log("this.selectedNodeData",this.selectedNodeData);
                // var selectedData = this.selectedNodeData;
                // var locationArr = selectedData.split(" ");
                // this.editDataReq()
            // };
            _this.myDiagram.commandHandler.deleteSelection = function(e){
            //    console.log("e",e);
                // console.log("this.selectedNodeData",_this.selectedNodeData);
                _this.openDeleteTipModel();

            }
            _this.myDiagram.addDiagramListener("ObjectSingleClicked",
                function(e) {
                    var part = e.subject.part;
                    if ((part instanceof go.Link)) {
                        _this.selectedNodeData = part.data;
                    }
                }
            );

            _this.myDiagram.addDiagramListener("SelectionMoved",
                function(e) {
                    var partData= e.diagram.selection.first().data;
                    
                    var location  = partData.loc.split(" ");
                    var params = {
                        id : partData.id,
                        memo :partData.memo,
                        name : partData.name,
                        x : parseInt(location[0]+0),
                        y : parseInt(location[1]+0),
                    }
                    _this.editDataReq(params);
                }
            );
        
            var dateTemplate =this.dateTemplate;
            this.model = go.Model.fromJson(dateTemplate);
            this.myDiagram.model = this.model;

            
        },

        getMapData(params,drawMapCallback){
            this.refreshedMapData = true;
            this.$http.get('getDoorRelationshipData', params).then((res)=>{
                var reponseData = res.data;
                var nodeDataArrayNew = [],linkConnectArr = [];
                var setListData = reponseData.setList;
                for(var i = 0 ;i< setListData.length;i++){
                    var countNum = setListData[i].elementCount || "0"
                    nodeDataArrayNew[i] = {
                        "id": setListData[i].id,
                        "loc": setListData[i].x + " "+ setListData[i].y,
                        "name" :setListData[i].name,
                        "memo" : setListData[i].memo,
                        "communityId " : setListData[i].communityId,
                        "titleText" : setListData[i].name + "（"+ countNum + ")"
                    }
                }
                for(var i = 0 ;i< reponseData.setRelationList.length;i++){
                    linkConnectArr[i] = {
                        "from": reponseData.setRelationList[i].preSetId,
                        "to": reponseData.setRelationList[i].setId,
                        "id" : reponseData.setRelationList[i].id,
                    }
                }
                
                this.dateTemplate = { "nodeKeyProperty": "id",
                                "nodeDataArray":nodeDataArrayNew,
                                "linkDataArray":linkConnectArr
                                }
                // console.log("this.dateTemplate ",this.dateTemplate )
                drawMapCallback && drawMapCallback();
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },

       closeEquipmentDetail(){
           this.openEquipmentDetail = !this.openEquipmentDetail
       },
       
       

        openEquipmentDetailFun(nodeData){

            this.editInitailData = nodeData;
            // console.log("nodeData",nodeData)
            this.getEquipmentListData({setId : nodeData.id},"openDetail")
            

        },
       

        sumbmitEditData(){
            
            var location  = this.editData.loc.split(" ");
            var params = {
                id : this.editData.id,
                memo :this.editData.memo,
                name : this.editData.name,
                x : parseInt(location[0]+0),
                y : parseInt(location[1]+0),
            }
            this.editDataReq(params);
        },

        // editItemData (e, obj){
        //     this.editInitailData = obj.part.adornedPart.data;
        //     this.openEditFormModal();
        // },
        
        openEditFormModal(){
            this.openEditModal = !this.openEditModal
        },
        editDataReq(sendMsg){
            this.$http.post('editDoorRelationshipData', sendMsg).then((res)=>{
               
                // this.$Notice.success({
                //     title: '编辑成功',
                //     desc: '编辑设备组成功',
                //     render: h => {
                //         console.log("dklldfkldk")
                //         return h('span', ['编辑设备组成功'])
                //     }
                // });

			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        addNewCreateDataReq(sendMsg){
            let _this =this;
            this.$http.post('newCreateDoorRelationship', sendMsg).then((res)=>{
                
                //修改node的id
                _this.myDiagram.startTransaction();
                var selectedNodeData = _this.selectedNodeData;
                var findNodeData = _this.myDiagram.findNodesByExample({__gohashid: selectedNodeData.__gohashid }).first();
                if (findNodeData) {
                    _this.myDiagram.model.setDataProperty(findNodeData.data, "id",res.data.id);
                }
                _this.myDiagram.commitTransaction("changed id");


			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        confirmDelete(){
            
            var param = this.selectedNodeData
            // console.log(param,"param");
            if(param.from){
                // console.log("dsklfkfdlkfd");
                this.deleteLinkConnectFun(param);
            }else{
                this.deleteEquipmentGroup(param);
            }
            
        },
        deleteEquipmentGroup(param){
            var sendParam = {id : param.id}
            let _this =this;
            this.$http.delete('deleteDoorGroupInRelation', sendParam).then((res)=>{
                
                this.$Notice.success({
                    title: '删除成功',
                    desc: '删除组成功',
                    render: h => {
                        return h('span', ['删除组成功'])
                    }
                });


                var deletedNode = _this.myDiagram.findNodesByExample(sendParam).first();
                
                
                _this.myDiagram.startTransaction('removing links');
                _this.myDiagram.removeParts(new go.Set().addAll(deletedNode.linksConnected));
                _this.myDiagram.commitTransaction('removing links');


                _this.myDiagram.model.removeNodeData(param);
                

                this.openDeleteTipModel();
                this.openEquipmentDetail = false;
                

			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        deleteEquipmentGroupFromDetail(param){

            var deletedNode = _this.myDiagram.findNodesByExample(param).first();
            _this.myDiagram.startTransaction('removing links');
            _this.myDiagram.removeParts(new go.Set().addAll(deletedNode.linksConnected));
            _this.myDiagram.commitTransaction('removing links');

            _this.myDiagram.model.removeNodeData(param);
        },
        getCommunity(getMapDataCallback,drawMapCallback){
            
            this.$http.get('join-bill-community','').then((res)=>{

                this.communityList=res.data.items;
                // this.communityId = res.data.items[2].id

                var params = {communityId : this.communityId}
                getMapDataCallback && getMapDataCallback(params,drawMapCallback)
                
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        newCreateConnect(param,linkData){
            
            let _this =this;
            this.$http.post('newCreateDoorGroupConnect',param).then((res)=>{
                
                // this.getMapData(paramMapData);
                this.$Notice.success({
                    title: '新增成功',
                    desc: '新增关系成功',
                    render: h => {
                        return h('span', ['新增关系成功'])
                    }
                });
                if(linkData){
                    
                    var link = _this.myDiagram.findLinksByExample({ __gohashid: linkData.__gohashid }).first();
                    if (link !== null) _this.myDiagram.model.setDataProperty(link.data, "id",res.data.id);
                    
               }

            }).catch((error)=>{
                    
                _this.myDiagram.commandHandler.undo()
                    
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        deleteLinkConnectFun(param){

            var sendParam = {id : param.id}
            this.$http.delete('deleteLinkConnect',sendParam).then((res)=>{
                
                this.openDeleteTipModel();
                this.$Notice.success({
                    title: '删除成功',
                    desc: '删除关系成功',
                    render: h => {
                        return h('span', ['删除关系成功'])
                    }
                });

                var myDiagram = this.myDiagram;
                var linkData = myDiagram.findLinksByExample(sendParam);
                myDiagram.startTransaction('removing links');
                myDiagram.removeParts(linkData,false);
                myDiagram.commitTransaction('removing links');

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },


        editNodeDataInDetail(sendMsg){
            console.log("sendMsg编辑完成传到map页",sendMsg);
           
            let _this =this;
            
            
            var newObj = Object.assign({},sendMsg);
            
            //修改node的id
            _this.myDiagram.startTransaction();
            var selectedNodeData = _this.selectedNodeData;
            var findNodeData = _this.myDiagram.findNodesByExample({id: sendMsg.id}).first();
            if (findNodeData) {
                // console.log("-----------",findNodeData.data)
                // _this.myDiagram.model.setDataProperty(findNodeData.data, "name",newObj.name);
                _this.myDiagram.model.setDataProperty(findNodeData.data, "memo",newObj.memo);
            }
            _this.myDiagram.commitTransaction("changed name and memo");

        },


        openAddEquipmentModalFun(){
            this.openAddEquipmentModal = !this.openAddEquipmentModal;
        },

        addEquipmentToGroup(selection){
            // this.openAddEquipmentModalFun();
            this.senReqEquipmentToGroup(selection);
        },
        senReqEquipmentToGroup(selection){

            let _this =this;
            var equipmentIds = [];
            for(var i=0;i<selection.length;i++){
                equipmentIds.push(selection[i].id)
            }
            var equipmentIdsStr = equipmentIds.join(",");
            var sendParams = {
                communityId : _this.communityId,
                setId : _this.selectedNodeData.id,
                doorIds : equipmentIdsStr

            }
            this.$http.post('addEquipmentToGroup', sendParams).then((res)=>{
                this.$Message.success('添加成功');


                var getEquipmentParam = {setId : this.selectedNodeData.id}
                this.getEquipmentListData(getEquipmentParam);


			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        getEquipmentListData(param,strParam){


            this.$http.get('getDoorListByGroup', param).then((res)=>{

                this.groupDetailDoorListData = res.data;
                if(strParam=="openDetail"){
                    this.closeEquipmentDetail()
                }
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },

        deleteEquipmentSendReq(params){

            this.$http.delete('deleteEquipmentFromGroup', params).then((res)=>{

                var getEquipmentParam = {setId : this.selectedNodeData.id}
                this.getEquipmentListData(getEquipmentParam)

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },

        searchEquipment(msg){
            console.log("将查询内容传到map",msg);
            this.detailMadalEquipmentListSearchData= msg;
            this.getEquipmentListData(msg,"refresh");
            
        },

        onSubmitSearchForm(data){
            console.log("data---",data);
            var param = data;
            this.getGroupByEquipmentInfo(param);

        },
        getGroupByEquipmentInfo(param){
            
            let _this = this;
            this.$http.get('getGroupByEquipmentDetailInfo', param).then((res)=>{
                
                this.myDiagram.clearHighlighteds();
                // _this.myDiagram.startTransaction();
                console.log("res",res.data.items);
                var isHighlightedNodeIdArr = [190,192];
                for(var i=0;i<isHighlightedNodeIdArr.length;i++){
                    var findNodeData = _this.myDiagram.findNodesByExample({id:isHighlightedNodeIdArr[i] }).first();
                    if (findNodeData) {
                        _this.myDiagram.model.setDataProperty(findNodeData, "isHighlighted",true);
                    }
                    _this.myDiagram.commitTransaction("changed highLight");
                }
                
                // _this.searchGroupIdsArr = isHighlightedNodeIdArr;
            
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },

        clearAll(){
            
        }

        
    }
 }
</script>
<style lang="less">
    .door-relationship{
        width:100%;
        height:100%;
        .right-part{
            float : right;
            .text-span{
                display: inline-block;
                height: 31px;
                color: #495060;
                line-height: 30px;
            }
        }
    }
    .delete-tip{
        text-align : center;
    }
    .displayNone{
        display:none;
    }
    .all-equipment-modal{
        .ivu-modal-footer{
            display : none;
        }
    }
    
</style>