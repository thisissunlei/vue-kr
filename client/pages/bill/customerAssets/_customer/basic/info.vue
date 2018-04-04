

<template>  
    <div class="assets-manage">
        <Form ref="basicInfo" :model="basicInfo" :rules="ruleValidate" class="basic-form">
             <Row>  
                <Col class="col">
                   <KrField 
                        :readOrEdit="false" 
                        type="text"  
                        label="客户id：" 
                        :value="form.customerId" 
                        name='customerId'
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                
                <Col class="col">
                    <!--唯一性校验-->
                     <KrField 
                        :readOrEdit="true" 
                        type="text"  
                        label="客户名称：" 
                        :value="form.customerName" 
                        name='customerName'
                        placeholder="客户名称" 
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                <Col class="col">
                     <KrField 
                        :readOrEdit="true" 
                        type="text"  
                        label="客户联系人：" 
                        :value="form.person" 
                        name='person'
                        placeholder="客户联系人" 
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                <Col class="col">
                     <KrField 
                        :readOrEdit="true" 
                        type="text"  
                        label="联系人电话：" 
                        :value="form.person" 
                        name='person'
                        placeholder="联系人电话" 
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                <Col class="col">
                     <KrField 
                        :readOrEdit="true" 
                        type="text"  
                        label="公司规模：" 
                        :value="form.person" 
                        name='person'
                        placeholder="公司规模" 
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                <Col class="col">
                     <KrField 
                        :readOrEdit="true" 
                        type="text"  
                        label="行业分类：" 
                        :value="form.person" 
                        name='person'
                        placeholder="客户联系人" 
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                <Col class="col">
                     <KrField 
                        :readOrEdit="true" 
                        type="text"  
                        label="融资伦次：" 
                        :value="form.person" 
                        name='person'
                        placeholder="客户联系人" 
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                <Col class="col">
                     <KrField 
                        :readOrEdit="true" 
                        type="text"  
                        label="运营状态：" 
                        :value="form.person" 
                        name='person'
                        placeholder="客户联系人" 
                        :maxLength="200"
                        @okClick="okClick"
                    />
                </Col>
                
            </Row>
            
           
            
        </Form>
    </div>
    

</template>

<script>
    import utils from '~/plugins/utils';
    import KrField from '~/components/KrField';


    export default {
        components:{
            KrField
        },
        data (){
            return{
                ruleValidate:{},
                basicInfo:{},
                selectData:[]
            }
        },
        methods:{
            selectTab(name){
                this.selectedTab = name;
            },
            okClick(value){
                console.log('okClick',value)
            }
        },
        mounted(){
            GLOBALSIDESWITCH('false');
        }
    
    }
</script>
<style lang="less" scoped>
    .basic-form{
        width: 794px;
    }
    .col{
        display: inline-block;
        width: 50%;
        max-width: 400px;
        padding-right: 10px;
        vertical-align:top;
    }
</style>