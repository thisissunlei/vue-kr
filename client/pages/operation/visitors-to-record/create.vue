<template>
    <div  id="create-book">
        
        <div>
            <Form ref="formItemDaily" :model="formItem" :rules="ruleDaily" label-position="top" >
                <Row>
                    <Col class="col">

                        <Form-item  class='daily-form' prop='name' label="姓名"> 
                            <i-input 
                                v-model="formItem.name" 
                                style="width: 150px;"
                                placeholder="姓名"
                            />
                        </Form-item>
                    </Col>
                    <Col class="col">
                        <Form-item  class='daily-form' prop="mobile" label="电话"> 
                            <i-input 
                                v-model="formItem.mobile" 
                                style="width: 150px;"
                                placeholder="电话"
                            />
                        </Form-item>
                    </Col>
                    <Col class="col">
                        <Form-item class='daily-form' prop="channelType" label="一级来源">
                            <Select 
                                v-model="formItem.channelType" 
                                placeholder="一级来源" 
                                style="width: 150px;"
                            >
                                <Option 
                                    v-for="item in firstList" 
                                    :value="item.value" 
                                    :key="item.value"
                                >
                                    {{ item.label }}
                                </Option>
                            </Select> 
                        </Form-item>
                    </Col>
                    <Col class="col">
                        <Form-item class='daily-form' prop="channelId" label="二级来源">
                            <Select 
                                v-model="formItem.channelId" 
                                placeholder="二级来源" 
                                style="width: 150px;"
                            >
                                <Option 
                                    v-for="item in secondList" 
                                    :value="''+item.value" 
                                    :key="item.value"
                                >
                                    {{ item.label }}
                                </Option>
                            </Select> 
                        </Form-item>
                     </Col>
                    <Col class="col">
                        <Form-item  class='daily-form' prop="promoCode" label="官网预约参数"> 
                            <i-input 
                                v-model="formItem.promoCode" 
                                style="width: 150px;"
                                placeholder="官网预约参数"
                            />
                        </Form-item>
                    </Col>
                    <Col class="col">
                        
                        <Form-item  class='daily-form' prop="cityId" label="预约城市">
                            <Select 
                                v-model="formItem.cityId" 
                                placeholder="预约城市" 
                                @on-change="cityChange"
                                style="width: 150px;"
                            >
                                <Option 
                                    v-for="item in cityList" 
                                    :value="''+item.cityId" 
                                    :key="item.cityId"
                                >
                                    {{ item.cityName }}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col class="col">
                        <Form-item  class='daily-form' prop="communityId" label="预约社区">
                            <Select 
                                v-model="formItem.communityId" 
                                placeholder="预约社区" 
                                style="width: 150px;"
                            >
                                <Option 
                                    v-for="item in communityList" 
                                    :value="''+item.id" 
                                    :key="item.id"
                                >
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col class="col">

                        <Form-item  class='daily-form' prop="appiontTime" label="参观日期"> 
                            <DatePicker type="date" placeholder="开始时间" v-model="formItem.appiontTime"  style="width: 150px;">
                            </DatePicker>
                        </Form-item>
                    </Col>
                    <Col class="col">
                        <Form-item  class='daily-form' label="推介人姓名"> 
                            <i-input 
                                v-model="formItem.refreeName" 
                                style="width: 150px;"
                                placeholder="推介人姓名"
                            />
                        </Form-item>
                    </Col>
                    <Col class="col">

                        <Form-item class='daily-form' label="推介人电话" prop="refreePhone"> 
                            <i-input 
                                v-model="formItem.refreePhone" 
                                style="width: 150px;"
                                placeholder="推介人电话"
                            />
                        </Form-item>
                    </Col>
                    <Col class="col">
                        <Form-item  class='daily-form' label="拜访数量"> 
                            <i-input 
                                v-model="formItem.visitNum" 
                                style="width: 150px;"
                                placeholder="拜访数量"
                            />
                        </Form-item>
                    </Col>
                    <Col>
                        <Form-item class='daily-form' label="备注"> 
                            <Input v-model="formItem.remake" type="textarea" :autosize="{minRows: 2,maxRows:5}" placeholder="备注"
                            style="width: 200px;"/>
                        </Form-item> 
                    </Col>
                </Row>  
                

            </Form>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';

export default {
    props:{
       identify:{
           type:String,
           default:''
       }
    },
    components:{
    },
    updated(){
            this.$emit('on-result-change',this.formItem);
    },
    data() {
            const validatephone = (rule, value, callback) => {
                let phone=/(^(\d{3,4}-)?\d{3,4}-?\d{3,4}$)|(^(\+86)?(1[356847]\d{9})$)/;
                if (value&&!phone.test(value)) {
                    callback(new Error('请填写正确的联系方式'));
                }else{
                    callback()

                }
            };
            const mobile = (rule, value, callback) => {
                let phone=/(^(\d{3,4}-)?\d{3,4}-?\d{3,4}$)|(^(\+86)?(1[356847]\d{9})$)/;
                if (!value) {
                    callback(new Error('请填写联系方式'));
                }else if (value&&!phone.test(value)) {
                    callback(new Error('请填写正确的联系方式'));
                }else{
                    callback()

                }
            };
            return { 
                width:120,
                cityList:[],
                params :{}, 
                formItem:{
                    channelType:'',
                    cityId:'',
                    channelId:'',
                    communityId:'',
                    mobile:'',
                },
                formItemOld:{},
                ruleDaily: {
                    mobile:[
                        { required: true,validator: mobile, trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' }
                    ],
                    channelType:[
                        {  message: '请选择一级来源', trigger: 'change'}
                    ],
                    channelId:[
                        {  message: '请选择二级来源', trigger: 'change'}
                    ],
                    promoCode:[
                        {  message: '请填写官网预约参数', trigger: 'blur'}
                    ],
                    cityId:[
                        {  message: '请选择预约城市', trigger: 'change'}
                    ],
                    communityId:[
                        {  message: '请选择预约社区', trigger: 'change'}
                    ],
                    appiontTime:[
                        {   required: true,type: 'date',message: '请选择参观时间', trigger: 'change'}
                    ],
                    refreeName:[
                        {  message: '请填写推介人姓名', trigger: 'blur'}
                    ],
                    refreePhone:[
                        { validator: validatephone,  trigger: 'blur'}
                    ],
                    visitNum:[
                        { message: '请填写拜访人数', trigger: 'blur'}
                    ],
                },
                firstList:[],
                secondList:[],
                visitStatus:[],
                communityList:[],
                cityList:[]
            }
    },
    mounted(){
        this.params=this.$route.query;
        this.getCityList();
        this.getFirstChannle()
        this.getSecondChannle()
        this.getVisitstatus()
        this.getCommunityList()
        this.$emit('initData',this.formItem);
    },
    methods:{
        //社区接口
        getCommunityList(id){
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
                this.communityList=res.data;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            let params =Object.assign({},this.params);
            this.$http.get('getDailyCity').then((res)=>{
                this.cityList=res.data;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //获取一级来源
        getFirstChannle(){
            this.$http.get('get-channleType-list').then((res)=>{
                this.firstList = res.data
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        getSecondChannle(){
            this.$http.get('get-csrsource-list').then((res)=>{
                this.secondList = res.data

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        getVisitstatus(){
            this.$http.get('get-visitstatus-list').then((res)=>{
                this.visitStatus = res.data

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //搜索
        searchClick(){
            this.$refs['formItemDaily'].validate((valid) => {
                if (valid) {
                    this.$emit('searchClick',this.formItem);
                }
            })
        },
        //清除
        clearClick(){
            this.formItem=Object.assign({},this.formItemOld);
            this.floorList = []
            this.$emit('clearClick',this.formItem);
        },
        //回车
        onKeyEnter(){
            this.searchClick();
        },
        //检查输入字符串字节长度
        fucCheckLength(strTemp) {
            var i,sum;
            sum=0;
            var length = strTemp.length ;
            for(i=0;i<length;i++) {
                if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255)) {
                    sum=sum+1;
                }else {
                    sum=sum+2;
                }
            }
            return sum;
        },
        cityChange(param){
            if(param){
                if(param !== this.formItem.cityId){
                  this.formItem.communityId = '' 
                }
                this.getCommunityList(param)  
            }

            
        },
        communityChange(param){
            if(param){
                this.params = {}
                this.getFloorList(param);
            }
            
        },
        
    }
}
</script>

<style lang='less'>
      #create-book{
        width:600px;
        margin-left:35px;
        .col{
            width:32%;
            display: inline-block;
        }
        .buttons{
            text-align:center;
        }
         .daily-header{
        }
     }
</style>
