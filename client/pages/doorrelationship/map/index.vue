<template>
    <div class="door-relationship">
        <Select
            v-model="communityId"
            style="width:150px"
            placeholder="请选择社区"
            filterable
            clearable
            @on-change="onChangeCommunity"
        >
            <Option  v-for="item in communityList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
        </Select>
       <!-- <Button  type="primary" @click="newCreateEquipmentGroup">新增设备组</Button> -->
       
       
        <div id="doorGroupRelationshipMap" style="width: 100%; height: 400px; background-color: #DAE4E4;">

        </div>
        <Drawer
            :openDrawer="openEquipmentDetail"
            iconType="view-icon"
            :close="closeEquipmentDetail"
            width="540"
        >

            <GroupDetail
                :editInitialDataProps="editInitailData"
                @closeGroupDetailModal="closeEquipmentDetail"
                :communityId ="communityId"
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
                <Button type="primary" @click="confirmDeleteGroup">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="openDeleteTipModel">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Drawer from '~/components/Drawer';
import GroupDetail from './groupDetail';

export default {
   name:'doorRelationship',
    head () {
        return {
            title: "门禁级联关系"
        }
    },
   data(){
       return {
            openEquipmentDetail : false,
            // openEditModal : false,
            newCreateData : {},
            selectedNodeData : {},
            callback:null,
            cancelCallback:null,
            myDiagram:null,
            model : null,
            editInitailData : {},
            addNewNode : 0 ,
            communityId : null,
            communityList :[],
            //图表数据
            dateTemplate :{},
            // nodeDragged : false,
            refreshedMapData : false,
            openDeleteTip :false
       }
   },
   components:{
    Drawer,
    GroupDetail,
   },
   mounted(){

       this.getCommunity(this.getMapData,this.drawMap);
    //    this.drawMap()
   },
  
   methods:{
       onChangeCommunity(option){
           this.communityId = option;
           console.log("option",option);
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
                        // "clickSelectingTool.standardMouseSelect": function(e) {
                        //     console.log("this.model===========",e)
                        //     var diagram = _this.myDiagram;
                        //     console.log("diagram",diagram)
                        //     // if (diagram.findPartAt(diagram.lastInput.documentPoint, false) === null) return;
                        //     // go.Tool.prototype.standardMouseSelect.call(this);
                        // },
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
                        _this.openEquipmentDetailFun(node.data);
                    },
                    selectionChanged: function(part) {
                        // console.log("part.data",part.data)
                        _this.selectedNodeData = part.data;
                    },
                    // mouseLeave:function(e,node){
                        // console.log("e",e,"node",node);
                        // var itemData = node.data;
                        // var locationArr = itemData.loc.split(" ");
                       
                        // if(_this.nodeDragged){
                        //     var param = {
                        //         id : itemData.id,
                        //         memo : itemData.memo,
                        //         name : itemData.name,
                        //         x : parseInt(locationArr[1]+0),
                        //         y : parseInt(locationArr[0]+0)
                        //     };
                            // _this.editDataReq(param);
                            // _this.nodeDragged = false;
                        // }
                    // },
                    
                }, 
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "RoundedRectangle",
                    {
                        parameter1: 10,  
                        fill: $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
                        stroke: null,
                        portId: "",  
                        fromLinkable: true, fromLinkableDuplicates: true,
                        toLinkable: true,toLinkableDuplicates: true,
                        cursor: "pointer",
                        
                    }),
                
               
                $(go.TextBlock, "name",
                
                { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text","name").makeTwoWay()),
                
            );

            this.myDiagram.linkTemplate =
            $(go.Link,  // the whole link panel
                
                {
                // routing: go.Link.AvoidsNodes ,
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
                for(var i = 0 ;i< reponseData.setList.length;i++){
                    nodeDataArrayNew[i] = {
                        "id": reponseData.setList[i].id,
                        "loc": reponseData.setList[i].x + " "+ reponseData.setList[i].y,
                        "name" : reponseData.setList[i].name,
                        "memo" : reponseData.setList[i].memo,
                        "communityId " : reponseData.setList[i].communityId,
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
            this.closeEquipmentDetail()

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
        confirmDeleteGroup(){
            
            var param = this.selectedNodeData
            console.log(param,"param");
            if(param.from){
                console.log("dsklfkfdlkfd");
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
                // var connectedLinks = deletedNode.findLinksConnected();
                // connectedLinks.each(function(link){
                //     console.log("link",link.data)
                // })

                // console.log("deletedNode.linksConnected",deletedNode.linksConnected)
                
                _this.myDiagram.startTransaction('removing links');
                _this.myDiagram.removeParts(new go.Set().addAll(deletedNode.linksConnected));
                _this.myDiagram.commitTransaction('removing links');


                _this.myDiagram.model.removeNodeData(param);
                

                this.openDeleteTipModel();
                

			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        getCommunity(getMapDataCallback,drawMapCallback){
            
            this.$http.get('join-bill-community','').then((res)=>{

                this.communityList=res.data.items;
                this.communityId = res.data.items[2].id

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
        
    }
 }
</script>
<style lang="less">
    .door-relationship{
        width:100%;
        height:100%;
    }
    .delete-tip{
        text-align : center;
    }
</style>