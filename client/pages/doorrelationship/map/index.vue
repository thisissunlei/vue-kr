<template>
    <div class="door-relationship">
        <Select
            v-model="communityId"
            style="width:150px"
            placeholder="请选择社区"
            filterable
            clearable
            on-change="onChangeCommunity"
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
            // editData : {},
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
            nodeDragged : false,
            refreshedMapData : false,
       }
   },
   components:{
    Drawer,
    GroupDetail,
   },
   mounted(){

       this.getCommunity();
       this.drawMap()
   },
  
   methods:{
       onChangeCommunity(option){
           console.log("option",option);
       },
        drawMap(){
            let _this =this;
            var $ = go.GraphObject.make;
            
            this.myDiagram = $(go.Diagram, "doorGroupRelationshipMap",
            {
                // initialContentAlignment: go.Spot.Center,
                // "undoManager.isEnabled": true, 
                "clickCreatingTool.archetypeNodeData": { "name": "新设备组" },
                "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
                "clickCreatingTool.insertPart": function(loc) {  // customize the data for the new node
                    console.log("loc",loc);
                    this.archetypeNodeData = {
                        // key: getNextKey(), // assign the key based on the number of nodes
                        name: "新设备组",
                        title: ""
                    };
                    
                    var newCreateNodeParams = Object.assign({},this.archetypeNodeData,{x:loc.x,y:loc.y,communityId : _this.communityId})
                    _this.addNewCreateDataReq(newCreateNodeParams);
                    return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                }
            });
            this.myDiagram.nodeTemplate =
           
            $(go.Node, "Auto",

                { 
                    doubleClick: function(e, node) {
                        console.log("node.data",node.data);
                        _this.openEquipmentDetailFun(node.data);
                    }
                },
                {
                    dragComputation: function(part, pt, gridpt){
                       var diagram = part.diagram;
                        if (diagram === null) return pt;
                        // compute the area inside the viewport
                        var v = diagram.viewportBounds.copy();
                        v.subtractMargin(diagram.padding);
                        // get the bounds of the part being dragged
                        var b = part.actualBounds;
                        var loc = part.location;
                        // now limit the location appropriately
                        var x = Math.max(v.x+1, Math.min(pt.x, v.right-b.width-2)) + (loc.x-b.x);
                        var y = Math.max(v.y+1, Math.min(pt.y, v.bottom-b.height-2)) + (loc.y-b.y);
                        _this.nodeDragged  = true;
                        return new go.Point(x, y);
                    },
                    isActionable : false,
                   
                    mouseLeave:function(e,node){
                        // console.log("e",e,"node",node);
                        var itemData = node.data;
                        var locationArr = itemData.loc.split(" ");
                       
                        if(_this.nodeDragged){
                            var param = {
                                id : itemData.id,
                                memo : itemData.memo,
                                name : itemData.name,
                                x : parseInt(locationArr[0]+0),
                                y : parseInt(locationArr[1]+0)
                            };
                            _this.editDataReq(param);
                            _this.nodeDragged = false;
                        }
                    },
                    linkConnected : function(node,link,obj){

                        console.log("连接obj",obj);
                        if(!link.data.id && link.data.from ==obj.part.data.id ){
                            
                            _this.newCreateConnect(link.data);
                        };
                    },
                    linkDisconnected : function(node,link,obj){

                        console.log("断开连接obj",obj);
                        
    
                        if(link.data.id && link.data.from ==obj.part.data.id ){
                           
                            _this.deleteLinkConnect(link.data);
                            
                        }
                       
                    },
                   
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
                new go.Binding("text","name").makeTwoWay())
            );

            this.myDiagram.linkTemplate =
            $(go.Link, 
                 {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5, toShortLength: 4,
                    // relinkableFrom: true,
                    // relinkableTo: true,
                    // reshapable: false,
                    resegmentable: true,
                    // mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
                },
            
            
            )
        
           
           

            // this.myDiagram.nodeTemplate.selectionAdornmentTemplate =
            
            //     $(go.Adornment, "Spot",
            //         $(go.Panel, "Auto",
            //         $(go.Shape, { fill: null, stroke: "#000", strokeWidth: 1 }),
            //         $(go.Placeholder)  
            //         ),
                     
            //         $("Button",
            //         {
            //             alignment: go.Spot.TopRight,
            //             click: _this.editItemData, 
                        
            //         },
            //         $(go.TextBlock, "编辑", 
            //             { font: "normal 10pt sans-serif" }),
            //         $(go.Shape, "PlusLine", { width: 6, height: 6 })
            //         ) 
            //     ); 

            var dateTemplate = this.dateTemplate;
            this.model = go.Model.fromJson(dateTemplate);
            this.myDiagram.model = this.model;
        },

        getMapData(params){
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
                var dateTemplate = this.dateTemplate;
                this.model = go.Model.fromJson(dateTemplate);
                this.myDiagram.model = this.model;
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },

       closeEquipmentDetail(){
           this.openEquipmentDetail = !this.openEquipmentDetail
       },
       
        // getEditForm(form){
        //     this.editData=form;
        // },

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
        addNewCreateDataReq(sendMsg){
            
            console.log("sendMsg",sendMsg);
            let _this =this;
            this.$http.post('newCreateDoorRelationship', sendMsg).then((res)=>{
                console.log("新增成功",res);
                var useData = res.data
                var locData = useData.x + " " + useData.y;
                var toData = {
                    id : useData.id,
                    name : useData.name,
                    loc : locData,
                    memo : useData.memo,
                }
                var model = _this.myDiagram.model;
                model.addNodeData(toData);
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
        },
        getCommunity(){
            
            this.$http.get('join-bill-community','').then((res)=>{

                this.communityList=res.data.items;
                this.communityId = res.data.items[1].id

                var params = {communityId : this.communityId}
                this.getMapData(params);
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        newCreateConnect(param){

            
            if(param.id){
                return;
            }
            let _this =this;
            var paramMapData = {communityId : _this.communityId}
            var newParams = {
                                communityId:_this.communityId,
                                preSetId:param.from,
                                setId:param.to,
                            };
            this.$http.post('newCreateDoorGroupConnect',newParams).then((res)=>{
                
                this.getMapData(paramMapData);
            }).catch((error)=>{
                
                this.getMapData(paramMapData);
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        deleteLinkConnect(param){

            
            let _this =this;
            console.log("param.id",param.id)
            if(!param.id){
                return;
            }
            var newParams = {
                                id : param.id
                            };
            this.$http.delete('deleteLinkConnect',newParams).then((res)=>{
                
                var param={communityId : _this.communityId};
                _this.getMapData(param);
                
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
</style>