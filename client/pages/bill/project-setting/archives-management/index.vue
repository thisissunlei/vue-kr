<template>
  <div class="archives-management">
        <div class="content">
            <div :id="collapseId" class="collapse" ref="collapse">
                <KrCollapse 
                    v-if="collapseData && collapseData.length" 
                    :openIndex="openIndex" 
                    :data="collapseData" 
                    @onChange="onChange"
                    :activeIndex="activeIndex"
                />
            </div>
            <div :id="archivesBoxId" class="archives-box" ref="archivesBox">
                <ArchivesDetail :code="code" @krScroll="boxScroll" :archivesBoxId="archivesBoxId" :projectId="queryData.id" v-if="fileDetailData.items"  :data ="fileDetailData" />
            </div>
        </div>
  </div>
</template>


<script>
import KrCollapse from '~/components/KrCollapse';
import ArchivesDetail from '../archives-detail';
var wHeight = 0;
export default {
    components:{
        KrCollapse,
        ArchivesDetail
    },
    props:{
        code:{
          type:String,
        }
    },
   
    data(){
       return {
            openIndex:0,
            collapseData:[],
            fileDetailData:{},
            queryData:{},
            collapseId:'collapse'+this._uid,
            archivesBoxId:'archivesBox'+this._uid,
             activeIndex:0,
       }
    },
    created(){
        this.queryData=this.$route.query;
    },
    mounted(){
        wHeight = document.body.clientHeight;
        this.setContentHeight();
        window.addEventListener('resize',this.setContentHeight.bind(this));
        this.getArchivesTree({code:this.code});
    },
    methods:{
        boxScroll(index){
            this.activeIndex = index;
        },
        //获取项目档案左边bai
        getArchivesTree(data){
          this.$http.get('project－archives-tree',data).then((response)=>{
                this.collapseData = [].concat(response.data);
                this.getArchivesDetail({code:response.data[this.openIndex].t_id})
            }).catch((error)=>{
                this.$Notice.error({
                   title: error.message,
                });
            })
        },
        //获取档案详情
        getArchivesDetail(data){
            data.projectId = this.queryData.id;
            this.fileDetailData = {};
            this.$http.get('project－archives-file-detail',data).then((response)=>{
             
            //    this.collapseData = [].concat(response.data);
            this.fileDetailData = Object.assign({},response.data);
            }).catch((error)=>{
                this.$Notice.error({
                   title: error.message,
                });
            })
        },
        setContentHeight(){
           
          var newHeight = document.body.clientHeight-255;
         
          if(newHeight !== wHeight){
            
            var collapseDom = document.getElementById(this.collapseId);
            var archivesBoxDom = document.getElementById(this.archivesBoxId);
             console.log(newHeight,"pppp---========")
            collapseDom.style.height = newHeight+'px';
            archivesBoxDom.style.height = newHeight+'px';
            wHeight = newHeight;
          }
          
        },
        onChange(index,data){

            this.openIndex = index;
            this.getArchivesDetail({code: this.collapseData[this.openIndex].t_id})
        },
       
    }
}

</script>

<style lang="less" >
   .archives-management{

        background: #f5f7f9 ;

        
       .content{
           width: 100%;
        //    height:500px;
           padding-top:20px;
           padding-left: 285px; 
           background: #F6F6F6 ;
           position: relative;
           transition: all 0.3s;
           box-sizing: border-box;
           .collapse{
                position: absolute;
                top: 20px;
                left: 0px;
                width: 265px;
                // height: 500px;
                background: #ffffff;
                overflow: auto;
                padding-bottom: 50px;

           }
           .archives-box{
               background: #ffffff;
            //    min-height: 500px;
               right: 0px;
               overflow: auto;
            //    height: 500px;
           }
       }
   }
</style>
