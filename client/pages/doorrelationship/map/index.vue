<template>
    <div class="door-relationship">
        <div class="top">
            <Select
                v-model="communityId"
                style="width:150px"
                placeholder="请选择社区"
                filterable
                @on-change="onChangeCommunity"
            >
                <Option  v-for="item in communityList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
            </Select>
            <Tooltip placement="bottom">
                <span  class="text-span margin-left">
                    <Icon type="ios-bell-outline"></Icon>
                    <span style="margin-left:5px">操作说明</span>
                </span>
                <div slot="content" class="tool-tip-box">
                    <p>创建设备组：双击空白区域</p>
                    <p>查看设备组详情：双击设备组</p>
                    <p>删除设备组：选中设备组，敲击delete键</p>
                    <p>删除关系：选中关系，敲击delete键</p>
                </div>
            </Tooltip>
            <div class="right-part">   
                <span class="text-span">输入内容查找设备所在的组：</span>
                <SearchForm
                    :searchFilter="searchFilter"
                    :onSubmit="onSubmitSearchForm"
                    :openSearch = true
                />
                
            </div>
        </div>
       <div class="canvas-box">
            <div id="myOverviewDiv"></div>
            <div id="doorGroupRelationshipMap" style="width: 100%; height:100%; background-color: #fff;border-top:'solid 1px #000';padding-bottom:70px;">
            
            </div>
        </div>
        <Drawer
            :openDrawer="openEquipmentDetail"
            iconType="view-icon"
            :close="closeEquipmentDetail"
            width="570"
        >

            <GroupDetail
                :editInitialDataProps="editInitailData"
                @deleteEquipmentGroup="deleteEquipmentGroup"
                :groupDetailDoorListData="groupDetailDoorListData"
                :communityId ="communityId"
                @editNodeDataInDetail = "editNodeDataInDetail"
                @openAddEquipmentModalFun = "openAddEquipmentModalFun"
                @deleteEquipmentSendReq = "deleteEquipmentSendReq"
                @searchEquipment ="searchEquipment"
                :doorTypeOptions = "doorTypeOptions"
                @changeDetailEquipmentListPage="changeDetailEquipmentListPage"
                @closeDetailPage = "closeDetailPage"
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
                :doorTypeOptions = "doorTypeOptions"
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
            title: "门禁级联关系-氪空间后台管理系统"
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
                        value:'serialNo'
                    }
            ],
            doorTypeOptions :[],
            searchGroupId : -1,
            searchGroupIdsArr : [],
            scale : '',
            detailMadalEquipmentListSearchData :{}
       }
   },
   components:{
    Drawer,
    GroupDetail,
    AllEquipmentList,SearchForm
   },
   mounted(){
       var doorTypeParam = {enmuKey : "com.krspace.iot.platform.api.enums.door.DoorType"}
       this.getBasicDataDoorType(doorTypeParam);
       this.getCommunity(this.getMapData,this.drawMap);
       
   },
  
   methods:{
       closeDetailPage(){
           this.openEquipmentDetail = false;
       },
       onChangeCommunity(option){
            let _this =this;
            this.communityId = option;
            this.getMapData({communityId :this.communityId },this.refreshMap)
            
       },
       refreshMap(){

           var dateTemplate =this.dateTemplate;
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
                        initialAutoScale : go.Diagram.Uniform,
                        // start everything in the middle of the viewport
                        initialContentAlignment: go.Spot.Center,
                        // have mouse wheel events zoom in and out instead of scroll up and down
                        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
                        // support double-click in background creating a new node
                        "clickCreatingTool.archetypeNodeData": { text: "new node" },
                        // enable undo & redo
                        "undoManager.isEnabled": true,
                        "clickCreatingTool.insertPart": function(loc,) {  // customize the data for the new node
                            this.archetypeNodeData = {
                                // key: getNextKey(), // assign the key based on the number of nodes
                                titleText: "新设备组（0）",
                                name: "新设备组",
                                memo: "",
                                equipmentCount : 0

                            };
                            var x = loc.x;
                            var y = loc.y;
                            var newCreateNodeParams = Object.assign({},this.archetypeNodeData,{x:parseInt(x),y:parseInt(y),communityId : _this.communityId})
                            var oldcopies =  _this.myDiagram.model;
                            _this.selectedNodeData = this;
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
                { isPanelMain: true,strokeWidth: 1.5 }),
                $(go.Shape,  // a thick transparent link shape
                { isPanelMain: true, strokeWidth: 40, stroke: "transparent" }),
                $(go.Shape,  // the arrowhead
                { toArrow: "standard", stroke: null }),
                
                
               
            );

            this.myDiagram.addModelChangedListener(function(evt) {
                // ignore unimportant Transaction events
               
                if (!evt.isTransactionFinished) return;
                var txn = evt.object;  // a Transaction
                if (txn === null) return;
                txn.changes.each(function(e) {
                    
                     if (e.change === go.ChangedEvent.Insert ) {
                         if(e.modelChange === "linkDataArray"){
                            var linkData = e.newValue;
                            var param = {
                                            preSetId :linkData.to,
                                            setId :linkData.from,
                                            communityId : _this.communityId
                                        }
                            if(linkData.points){
                                _this.newCreateConnect(param,linkData);
                            }
                         }
                        
                    } 
                });
            });

            
            _this.myDiagram.commandHandler.deleteSelection = function(e){
                
                _this.openDeleteTipModel();

            }
            // _this.myDiagram.commandHandler.undo = function(e){
                // console.log("e-------->",e)
            // }
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
                    if(!partData.loc){
                        return;
                    }
                    var location  = partData.loc.split(" ");
                    var x = location[0];
                    var y = location[1];
                    var params = {
                        id : partData.id,
                        memo :partData.memo,
                        name : partData.name,
                        x : parseInt(x),
                        y : parseInt(y),
                    }
                    _this.editDataReq(params);
                }
            );
        
            var dateTemplate =this.dateTemplate;
            this.model = go.Model.fromJson(dateTemplate);
            this.myDiagram.model = this.model;

            // create the Overview and initialize it to show the main Diagram
  var myOverview =
    $(go.Overview, "myOverviewDiv",
      { observed: _this.myDiagram});

            
        },

        getMapData(params,drawMapCallback){
            this.refreshedMapData = true;
            this.$http.get('getDoorRelationshipData', params).then((res)=>{
                var reponseData = res.data;
                var nodeDataArrayNew = [],linkConnectArr = [];
                var setListData = reponseData.setList || [];
                for(var i = 0 ;i< setListData.length;i++){
                    var countNum = setListData[i].elementCount || "0"
                    nodeDataArrayNew[i] = {
                        "id": setListData[i].id,
                        "loc": setListData[i].x + " "+ setListData[i].y,
                        "name" :setListData[i].name,
                        "memo" : setListData[i].memo,
                        "communityId " : setListData[i].communityId,
                        "titleText" : setListData[i].name + "（"+ countNum + ")",
                        "equipmentCount" :countNum
                    }
                }
                for(var i = 0 ;i< reponseData.setRelationList.length;i++){
                    linkConnectArr[i] = {
                        "from": reponseData.setRelationList[i].setId,
                        "to": reponseData.setRelationList[i].preSetId,
                        "id" : reponseData.setRelationList[i].id,
                    }
                }
                
                this.dateTemplate = { "nodeKeyProperty": "id",
                                "nodeDataArray":nodeDataArrayNew,
                                "linkDataArray":linkConnectArr
                                }
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
               
                

			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        addNewCreateDataReq(sendMsg){

            let _this =this;
            this.$http.post('newCreateDoorRelationship', sendMsg).then((res)=>{
                var nodeDataArrayNew = _this.myDiagram.model.nodeDataArray;
                var nowGohashid = nodeDataArrayNew[nodeDataArrayNew.length-1].id
                //修改node的id
                _this.myDiagram.startTransaction();
                var findNodeData = _this.myDiagram.findNodesByExample({id: nowGohashid }).first();
                if (findNodeData) {
                    _this.myDiagram.model.setDataProperty(findNodeData.data, "id",res.data.id);
                }
                _this.myDiagram.commitTransaction("changed id");
                this.$Message.success('新增成功');
                _this.selectedNodeData = findNodeData.data;

			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        confirmDelete(){
            
            var param = this.selectedNodeData
            if(param.from){
                this.deleteLinkConnectFun(param);
            }else{
                
                this.deleteEquipmentGroup(param);
            }
            
        },
        deleteEquipmentGroup(param){

            var sendParam = {id : param.id}
            let _this =this;
            this.$http.delete('deleteDoorGroupInRelation', sendParam).then((res)=>{
                
               
                this.$Message.success('删除组成功');


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

                var params = {communityId : this.communityId}
                getMapDataCallback && getMapDataCallback(params,drawMapCallback)
                
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        newCreateConnect(param,linkData){
            var newCreateLinkData = linkData;
            let _this =this;
            this.$http.post('newCreateDoorGroupConnect',param).then((res)=>{
                
                this.$Message.success('创建联系成功');
                if(linkData){
                    
                    var link = _this.myDiagram.findLinksByExample({ __gohashid: linkData.__gohashid }).first();
                    if (link !== null) _this.myDiagram.model.setDataProperty(link.data, "id",res.data.id);
                    
               }
               var formToObj = {
                   from : res.data.setId,
                   to : res.data.preSetId,
               }
               var newObj = Object.assign({},res.data,formToObj)
               _this.selectedNodeData = newObj;

            }).catch((error)=>{
                
                
                var sendParam = {__gohashid: linkData.__gohashid}
                var myDiagram = _this.myDiagram;
                var linkDataToDelete = myDiagram.findLinksByExample(sendParam);
                myDiagram.startTransaction('removing links');
                myDiagram.removeParts(linkDataToDelete,false);
                myDiagram.commitTransaction('removing links');
                
                    
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        deleteLinkConnectFun(param){

            var sendParam = {id : param.id}
            this.$http.delete('deleteLinkConnect',sendParam).then((res)=>{
                
                this.openDeleteTipModel();
                
                this.$Message.success('删除关系成功');

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


        editNodeDataInDetail(sendMsg,res){
           
            let _this =this;
            
            
            var newObj = Object.assign({},sendMsg);
            var varEquipmentNum = _this.editInitailData.equipmentCount || 0;
            var textTitleRes = sendMsg.name +"（"+ _this.editInitailData.equipmentCount +"）"
            //修改node的id
            _this.myDiagram.startTransaction();
            var selectedNodeData = _this.selectedNodeData;
            var findNodeData = _this.myDiagram.findNodesByExample({id: sendMsg.id}).first();
            if (findNodeData) {
                
                _this.myDiagram.model.setDataProperty(findNodeData.data, "titleText",textTitleRes);
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

                let _this =this;
                this.$Message.success('添加成功');
                var getEquipmentParam = {setId : this.selectedNodeData.id}
                this.getEquipmentListData(getEquipmentParam);



                var textTitleRes = this.selectedNodeData.name + "("+ res.data.count+")"
                _this.myDiagram.startTransaction();
                var selectedNodeData = _this.selectedNodeData;
                var findNodeData = _this.myDiagram.findNodesByExample({id : _this.selectedNodeData.id}).first();
                if (findNodeData) {
                    _this.myDiagram.model.setDataProperty(findNodeData.data, "titleText",textTitleRes);
                    _this.myDiagram.model.setDataProperty(findNodeData.data, "equipmentCount",res.data.count);
                }
                _this.myDiagram.commitTransaction("changed name show");


			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        getEquipmentListData(param,strParam){


            this.$http.get('getDoorListByGroup', param).then((res)=>{

                var quipmentNewList = res.data.items;
                for(var i=0;i<quipmentNewList.length;i++){
                    quipmentNewList[i].showData = quipmentNewList[i].serialNo+"~"+ quipmentNewList[i].title+"~"+quipmentNewList[i].doorCode
                }
                this.groupDetailDoorListData = {
                    items : quipmentNewList,
                    page : res.data.page,
                    pageSize : res.data.pageSize,
                    totalCount : res.data.totalCount,
                    totalPages : res.data.totalPages,
                }


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
            let _this = this;
            var doorIdsArr = params.doorIds.split(",");
            this.$http.delete('deleteEquipmentFromGroup', params).then((res)=>{


                var getEquipmentParam = {setId : this.selectedNodeData.id}
                this.getEquipmentListData(getEquipmentParam)
                
                _this.myDiagram.startTransaction();
                var findNodeData = _this.myDiagram.findNodesByExample({id : params.setId}).first();
                var newtextTitle =findNodeData.data.name+"（"+res.data.count+"）"

                if (findNodeData) {
                    _this.myDiagram.model.setDataProperty(findNodeData.data, "titleText",newtextTitle);
                    _this.myDiagram.model.setDataProperty(findNodeData.data, "equipmentCount",res.data.count);
                }
                _this.myDiagram.commitTransaction("changed name and memo");

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },

        searchEquipment(msg){
            let _this = this;
            var idparam = {setId : _this.selectedNodeData.id}
            var newObj = Object.assign({},_this.detailMadalEquipmentListSearchData,msg,idparam)
            this.getEquipmentListData(newObj,"refresh");
            
        },

        onSubmitSearchForm(data){
            
            var param = data;
            this.getGroupByEquipmentInfo(param);

        },
        getGroupByEquipmentInfo(param){
            
            let _this = this;
            this.$http.get('getGroupByEquipmentDetailInfo', param).then((res)=>{
                
                this.myDiagram.clearHighlighteds();
                _this.myDiagram.startTransaction();
                var isHighlightedNodeIdArr = res.data.items ||[];
                var containInThisPage = 0;
                for(var i=0;i<isHighlightedNodeIdArr.length;i++){
                    var findNodeData = _this.myDiagram.findNodesByExample({id:isHighlightedNodeIdArr[i] }).first();
                    if (findNodeData) {
                        containInThisPage++
                        _this.myDiagram.model.setDataProperty(findNodeData, "isHighlighted",true);
                    }
                    
                }
                _this.myDiagram.commitTransaction("changed highLight");
                if(containInThisPage==0){
                    this.$Notice.open({
                        title: '查找的设备不在当前社区的设备组中',
                        desc: true ? '' : ''
                    });
                }
            
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },

        clearAll(){
            this.myDiagram.clearHighlighteds();
        },
        getBasicDataDoorType(param){
            
            let _this =this;
            this.$http.get('getBasicDataDoorType', param).then((res)=>{
               
                var resData = res.data;
                
                var newArr = [];
                for(var i=0;i<resData.length;i++){
                    var objNew = {
                        label:resData[i].desc,
                        value:resData[i].value,
                    }
                    newArr.push(objNew);
                }
                _this.doorTypeOptions = newArr;

			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})

        },
        changeDetailEquipmentListPage(page){
            let _this =this;
            var idparam = {setId : _this.selectedNodeData.id}
            var newObj = Object.assign({},_this.detailMadalEquipmentListSearchData,{page:page},idparam)
            this.getEquipmentListData(newObj,"refresh");
        }

        
    }
 }
</script>
<style lang="less">
    .door-relationship{
        width:100%;
        height:90%;
        .margin-left{
            margin-left: 10px;
            color: #495060;
            display: inline-block;
            border: solid 1px #dddee1;
            padding: 6px;
            border-radius: 2px;
        }
        .right-part{
            float : right;
            .text-span{
                display: inline-block;
                height: 31px;
                color: #495060;
                line-height: 30px;
            }
            
        }
        .top{
            padding: 10px;
            border-bottom: 1px solid #e8e9e9;
        }
        .doorGroupRelationshipMap{
                width: 100%;
                height: 100%;
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
    #myOverviewDiv{
        position: absolute;
        width:170px;
        height:100px;
        bottom: 10px;
        right: 10px;
        background-color: aliceblue;
        z-index: 300; /* make sure its in front */
        border: solid 1px blue;

    }
    .canvas-box{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .tool-tip-box{
        width:220px;
       
    }
    
</style>