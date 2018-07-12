<template>
    <div class="public-title">
        <div class='title-right'>
            <Button  type="default" v-if="isDeletePermission" style="color:#4F9EED;border:1px solid #4F9EED;background-color:#fff;margin-left:10px"  @click="switchDelete">终止该项目</Button>
            <Button  type="default" style="color:#4F9EED;border:1px solid #4F9EED;background-color:#fff;margin-left:10px" @click="openProject" >项目成员</Button>
            <Button  type="default" style="color:#4F9EED;border:1px solid #4F9EED;background-color:#fff;margin-left:10px" @click="watchTask">查看编辑纪录</Button>
            <Button type="primary" style="margin-left:10px;margin-right:20px" @click="goProjectDetail" v-if="isComment && isshowButton">编辑档案</Button>
        </div>

        <div class='title-left'>
            <div class='title-name-line'>
                <span class='title-name'  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项目档案&nbsp;|</span>

                <span style="color:#499DF1;font-size:14px;cursor:pointer;"  @click="gobackIndex" >首页</span> >
                <span  style="color:#499DF1;font-size:14px;cursor:pointer;" @click="goback" > {{name}}</span>
            </div>
        </div>

        <!-- 项目成员弹窗 -->
        <Modal v-model="modalProject" title="项目成员" width=700>
            <div slot='footer'>
                <!-- <Button type="default" @click='cancelproject'>取消</Button>
                <Button type="info" @click='okproject'>确定</Button> -->
            </div>
            <div>
                <Row>
                    <Col
                        span="12"
                        v-if="memberDetailView"
                        v-for="(item,index) in  memberDetail"
                        :key="index"
                    >
                        <label
                            style="width:100px;display:inline-block;text-align:right;padding-right:3px;"
                        >
                            {{item.displayName}}
                        </label>
                        <KrInput
                            :readOrEdit="true"
                            :value="item.memberName"
                            style="width:160px"
                            @okClick="okClick($event,item)"
                        />
                    </Col>
                </Row>
            </div>
        </Modal>

        <Modal

            v-model="openWatch"
            title="查看记录"
            width="660"
        >
                <WatchRecord
                    v-if="openWatch"
                    :id="queryData.id"
                    :watchRecord="watchRecord"
                    @searchClick="searchClick"
                    :watchTotalCount="watchTotalCount"
                    :watchPage = "watchPage"
                />
            <div slot="footer"></div>
        </Modal>


        <Message
            :type="MessageType"
            :openMessage="openMessage"
            :warn="warn"
            @changeOpen="onChangeOpen"
        />
         <Modal
            v-model="openDelete"
            title="提示"
            width="440"
            >
            <div class='sure-sign'>确认终止项目?</div>

            <div slot="footer">
                <Button type="primary" @click="deleteProject">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="switchDelete">取消</Button>
            </div>
        </Modal>

    </div>

</template>

<script>

    import KrInput from '../comment/KrInput.vue'
    import WatchRecord from "../project-detail/watch-record";
    import Message from '~/components/Message';
    export default {
        props:{
          name:{
            type:String
          },
          city:{
            type:String
          },
          isComment:{
            type:Boolean,
            default:false,
          }
        },
        components:{
            KrInput,
            WatchRecord,
            Message
        },
        data(){
            return {
                //编辑记录开关
                isshowButton:true,
                productShow:true,
                propertyShow:true,
                isDeletePermission:false,
                openWatch:false,
                modalProject:false,
                openDelete:false,
                memberDetail:[],
                memberDetailView:false,
                modalProject:false,
                openMessage:false,
                projectId:this.$route.query.id,
                watchRecord:[],
                watchTotalCount:0,
                watchPage:1,
                queryData:{},
                watchParams:{
                    endTime:'',
                    id:0,
                    startTime:'',
                    updator:'',
                    page:1,
                    pageSize:10,
                    totalPages:1,
                },
                MessageType:'',
                warn:'',

            };
        },
        created(){
            this.queryData=this.$route.query;



        },
        mounted() {
            //  this.memberDetailList();
               this.actioncheck();
             this.getDeletePermission();
        },
        methods:{
          gobackIndex(){
            this.$router.push({path:'/bill/project-setting'})
            // this.$router.push({path:'/'})
          },
          getDeletePermission(){
              this.$http.get('get-delete-permission',{id:this.projectId}).then((res)=>{
                  this.isDeletePermission= res.data
                  // console.log(this.isDeletePermission)
              }).catch((e)=>{

              })
          },
             actioncheck(){
              this.$http.get('roleActionCheck').then((res)=>{
                  this.isshowButton= res.data.ifShow
                  // this.productShow= res.data.productShow
                  // this.propertyShow= res.data.propertyShow
                  this.$route.query.productShow =res.data.productShow+''
                  this.$route.query.propertyShow =res.data.productShow+''
                  // console.log(this.isshowButton,'actioncheck')
              }).catch((e)=>{
                console.log(e,"actioncheck")

              })
          },
            goback(){
                this.$emit("goback")
            },
            //打开项目成员
            openProject(){
                this.memberDetailList('openProject')
                this.modalProject = true;

            },
            goProjectDetail(){

                // this.$route.query.productShow =this.productShow+''
                // this.$route.query.propertyShow =this.propertyShow+''
                // this.$route.query.propertyShow ="false"
                this.$router.push({path:'/bill/project-setting/project-detail',query:this.$route.query})
            },
            //获取项目成员
            memberDetailList(val){
                this.$http.get('member-detail-list',{projectId:this.projectId}).then(res=>{
                    this.memberDetail = res.data;
                    this.memberDetailView = this.modalProject;
                }).catch((e)=>{
                });
            },
            //项目成员取消按钮点击
             cancelproject(){
                this.modalProject=false;
                setTimeout(()=>{
                    this.memberDetailView=false;
                },500)
            },
            //项目成员确定按钮点击
            okproject(){
                this.modalProject=false;
                setTimeout(()=>{
                    this.memberDetailView=false;
                },500)
            },
            //对号被点击
            okClick(val,item){

                let param = {
                    code:item.code,
                    memberName:val.value,
                    projectId:this.projectId,
                }
                this.$http.post('member-actions-edit',param).then(res=>{
                    console.log(res)
                }).catch(e=>{
                    this.$Notice.warning({
                        title: "系统错误"
                    });
                })
            },
            //编辑记录开关

            cancelWatch(){
                this.openWatch=!this.openWatch;
            },
            //获取查看编辑记录
            getWatchData(params){
                var data = Object.assign({},this.startAndEndSame(params));
                this.$http.get('watch-edit-record',data).then((response)=>{
                    this.watchRecord=response.data.items;
                    this.watchPage = response.data.page;
                    this.watchTotalCount = response.data.totalCount;
                }).catch((error)=>{
                    this.$Notice.error({
                         title: error.message,
                    });
                })
            },

             //打开查看任务
            watchTask(){
                this.watchParams.id = this.queryData.id;
                this.watchParams.endTime = '';
                this.watchParams.startTime = '';
                this.watchParams.updator = '';
                this.watchParams.page = 1;
                this.getWatchData(this.watchParams);
                this.cancelWatch();
            },
            //开始日期格式化
            startAndEndSame(data){
                if(!data.startTime || !data.endTime){
                    return data;
                }

                data.endTime = data.endTime.split(' ')[0] + ' 23:59:59';
                return data;
            },

            //查看记录页面搜索被点击
            searchClick(params){

                this.watchParams = Object.assign({},params);
                this.getWatchData(this.watchParams);

            },
            //终止项目开关
            switchDelete(){
                this.openDelete = !this.openDelete;
            },
            //终止项目
            deleteProject(){
                this.$http.delete('delete-project-setting',{
                    id:this.$route.query.id
                }).then((response)=>{

                this.switchDelete();
                    window.close();
                    window.opener.location.reload();
                }).catch((error)=>{
                    this.MessageType="error";
                    this.openMessage=true;
                    this.warn=error.message;
                })
            },
             onChangeOpen(data){
                this.openMessage=data;
            },

        }


    }
</script>
<style lang="less" scoped>
.public-title{
    height: 90px;
    line-height: 90px;
    background-color: #FFF;

    .title-left{
        text-align: left;
        .title-name{
            font-size: 14px;
            color: #666;
        }
    }
    .title-right{
        float: right;
    }
}


</style>
