 <template>
  <Form  :model="seatCouponParams" :rules="seatCouponParamsRules" ref="addCouformValidate" label-position="left" :label-width="130" style="padding:20px 20px 0 20px;">
            <Row>
                <Col style="text-align:left" span="24">
                    1 只有 <span style="color:red;">从砍价渠道来源的新客户</span>允许添加优惠码，其他渠道（如中介等）以及老客户请勿添加
                </Col>
            </Row>    
            <Row>
                <Col style="text-align:left" span="24">
                    2 只有<span style="color:red;">部分社区</span>适用优惠码，请勿滥用
                </Col>
            </Row> 
            <Row>
                <Col style="text-align:left" span="24">
                    3 添加后，请联系<span style="color:red;">王超群</span>核销此优惠码，核销前优惠码的折扣不会生效
                </Col>
            </Row> 
            <Row>
                <Col style="text-align:left" span="24">
                    4 添加优惠码，此订单的其他信息<span style="color:red;">不能编辑</span>，直到优惠码被核销或移除
                </Col>
            </Row> 
            <Row style="margin-top:20px;">
                <Col span="24">
                    <FormItem label="活 动 优 惠 码" prop="code" >
                        <Input v-model="seatCouponParams.code"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row >
                <Col span="24">
                    <FormItem label="参加活动的手机号" prop="phone" >
                        <Input v-model="seatCouponParams.phone" ></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col style="text-align:center;">
                    <Button  size="large" style="width:100px;" @click="cancel">取消</Button>
                    <Button  @click="postOrderSeatCouponCheck" type="primary" size="large" style="width:100px;margin-left: 40px;">添加</Button>
                </Col>
            </Row>
        </Form>
</template>


<script>
export default {
  props: {
    mask: String,
    keys: String,
    params: {}
  },
  data() {
    return {
      seatCouponParams:{
            code:'',//   券编码
            phone:'',// 手机号
        },
        seatCouponParamsRules:{
            code: [
                    { required: true, message: '优惠码不能为空', trigger: 'change' }
                ],
            phone:[
                    { required: true, message: '手机号不能为空', trigger: 'change' }
            ]    
        }
    };
  },
  methods: {
    //  添加优惠券
    postOrderSeatCouponCheck() {
      this.$refs['addCouformValidate'].validate((valid) => {
          if(valid){
                this.$http.post('orderSeatCouponCheck', this.seatCouponParams).then(r => {
                    if (r.code === 1) {
                        this.$emit('submit',r.data);
                    }
                }).catch(e => {
                    this.$Notice.error({
                        title: e.message
                    })
                })
          }
      })
    },
    cancel(){
        this.$emit('cancel');
    }
  }
};
</script>