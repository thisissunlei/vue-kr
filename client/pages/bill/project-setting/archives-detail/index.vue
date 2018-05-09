<template>
    <div class="archives-detail" >
        <div
            v-if="code"
            style="font-size:14px;color:#333;margin-bottom:30px;"
        >{{(code=="property"?"物业档案-":"产品档案-") +collapseData.label}}</div>
        <div class="archivesDetailDom"  v-for="(item ,index) in collapseData.items" :key="index">
            <ClassificationBox  
                :value="item.index" 
                :title="item.label" 
                :isBorder="true" 
                type="num"
                :isEnd="item.isEnd"
                v-if="item.data && item.data.length"
            >
                <div slot="content"  >
                    <div v-for="everyData in item.data" :key="everyData.id" style="min-height:40px;margin:20px 0px;line-height:1.5;">
                        <span class="field-title" >{{everyData.displayName+':'}}</span>
                        <KrField 
                            :name="everyData.fieldName"
                            style="display:inline-block;"
                            :readOrEdit="true" 
                            :type="getTypeToField(everyData.fieldType)" 
                            label="含税" 
                            :selectParam="everyData.param"
                            :value="getValue(everyData)"
                            placeholder="请输入..." 
                            @recordClick="recordClick"
                            @okClick="okClick"
                            :isOk="getIsOk(errorName,everyData.fieldName)"
                            @change="(event)=>{
                                change(event,everyData)
                            }"
                        />
                        <div v-if="everyData.fieldName == errorName" style="color:red;padding-left:100px;"> 不得超过100</div>
                    </div>
                    
                </div>
            </ClassificationBox>    
        </div>
           
        <Drawer 
            :openDrawer="openRecord"
            iconType="view-icon"
            :close="cancelRecord"
            width="735"
        >   
            <div class="record-title" slot="title">
                <div class="big-text">编辑记录</div>
                <div class="small-text">{{recordData.title}}</div>
            </div>
            <RecordDetail :data="recordData.items"/>
        </Drawer>
    </div>
</template>


<script>
import KrField from '~/components/KrField';
import ClassificationBox from '~/components/ClassificationBox';
import Drawer from '~/components/Drawer'
import RecordDetail from './record-detail'

export default {
    components:{
        ClassificationBox,
        KrField,
        Drawer,
        RecordDetail
    },
    props:{
        data:{
            type:Object,
        },
        projectId:{
            type:[String,Number]
        },
        archivesBoxId:{
            type:String,

        },
        code:{
            type:String
        }
    },
    data(){
       return {
           openRecord:false,
           imgs:[],
           queryData:{},
           openIndex:0,
           endIndex:0,
           //查看编辑记录数据
           recordData:[],
           // 物业基信息
           collapseData:this.dataFarmat(this.data),
           archivesDetailId:'archivesDetail'+this._uid,
           errorName:'-1'

       }
    },
    created(){
        this.queryData=this.$route.query;
    },
    mounted(){
        var archivesBoxDom = document.getElementById(this.archivesBoxId);
        if(archivesBoxDom){
            archivesBoxDom.addEventListener('scroll',this.getTreeActive)
        }
         

    },
    methods:{
        getIsOk(str1,str2){
           
            return str1 != str2;
        },
        change(event,param){
            if(param.fieldType == 'TEXT'){
                var value = event.target.value;

                if(value.length>100){
                    this.errorName = param.fieldName;
                }else{
                    this.errorName ='-1';
                }
            }else{
                return;
            }
         
        },
        getTreeActive(){
            var groupDoms = document.querySelectorAll('.archivesDetailDom');
            for(let i=0;i<groupDoms.length;i++){
                let everyDom = groupDoms[i];
                let everyDetail = everyDom.getBoundingClientRect();
                if(everyDetail.top<300 && 300<everyDetail.height+everyDetail.top){
                    this.$emit('krScroll',i);
                }
            }
        },
        getTypeToField(type){
            if(type=="TEXT"){
                return 'text'
            }else if(type=="SELECT"){
                return 'select'
            }else if(type=="CITY"){
                return 'city'
            }else if(type=="FILE"){
                return 'upFiles'
            }else if(type=="DATE"){
                return 'date'
            }else{
                return 'text'
            }
        }, 
        getValue(everyData){
            if(everyData.fieldType=="FILE"){
             
               return eval(everyData.fieldValue) || [];
            }else {
                return everyData.fieldValue||'';
            }
        },
        dataFarmat(data){
            if(!data.items){
                return {};
            }
            var group = [].concat(data.items);

            var index = 1;
            var endIndex = 0;
            for(var i=0;i<group.length;i++) {
                // if(group[i].type=="GROUP"){
                    group[i].index = index;
                    group[i].isEnd = false;
                    endIndex = index;
                    index++;
                   
                // }
            }
            if(group.length){
                group[endIndex-1].isEnd = true;
            }
            data.items = [].concat(group);
            this.endIndex = endIndex;
            return Object.assign({},data);
        },
 
        okClick(params,callback){
          
            let data = Object.assign({projectId:this.projectId},params)
            data.fieldName = data.name;
            data.fieldType = this.getFieldToType(data.type);
            data.fieldValue = data.value;
            data.groupCode = "property";
            this.$http.post('project－field-edit',data).then((response)=>{
                callback();
                this.$emit('okClick');
                // this.selectData = [].concat(this.selectFormat(response.data))
                // callback();
            }).catch((error)=>{
                // this.MessageType="error";
                // this.openMessage=true;
                // this.warn=error.message;
            })

        },
        recordClick(value,name){
            console.log("value",value)
            var data = {fieldName:name,projectId:this.projectId,groupCode:this.collapseData.code};
            this.$http.get('project－field-record',data).then((response)=>{
                // console.log(response,"lllllllll")
                this.recordData = Object.assign({},response.data)
            }).catch((error)=>{
                // this.MessageType="error";
                // this.openMessage=true;
                // this.warn=error.message;
            })
            
            this.cancelRecord();
        },
        cancelRecord(){
            this.openRecord = !this.openRecord;
        },
        getFieldToType(type){
             if(type=="text"){
                return 'TEXT'
            }else if(type=="select"){
                return 'SELECT'
            }else if(type=="city"){
                return 'CITY'
            }else if(type=="file"){
                return 'FILE'
            }else if(type=="city"){
                return 'DATE'
            }else{
                return 'TEXT'
            }
        }
    }
}

</script>

<style lang="less" >
   .archives-detail{
        background: #ffffff;
        padding:20px;
        padding-bottom:50px;
        .field-title{
            display:inline-block;
            width:120px;
            vertical-align: top;
            padding-right: 20px;
            font-size: 14px;
            color: #333333;

        }
        .ui-kr-select .ivu-select-dropdown{
           position: fixed !important;
        }
        .record-title{
            display: inline-block;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            vertical-align: middle;
            .big-text{
                height: 22px;
                line-height: 22px;
                font-size: 16px;
                color: #333333;
            }
            .small-text{
                line-height: 20px;
                height: 20px;
                font-size: 14px;
                color: #666666;
            }
        }
   }
</style>
