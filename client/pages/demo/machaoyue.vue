<template>
    <Form ref="formDynamic" :model="formDynamic" style="width:990px">
        <Row class="price-row row-header">
            <Col span="3" class="parice-col">
              日期
            </Col>
            <Col span="3" class="parice-col">
               开放数量 (个)
            </Col>
            <Col span="3" class="parice-col">
               可预订数量 (个)
            </Col>
            <Col span="3" class="parice-col">
               会员价 (个·天)
            </Col>
            <Col span="4" class="parice-col">
               会员优惠价 (个·天)
            </Col>
            <Col span="4" class="parice-col">
               游客价 (个·天)
            </Col>
            <Col span="4" class="parice-col">
               游客优惠价 (个·天)
            </Col>
        </Row>
        <Row v-for="(item,index) in formDynamic.goods" :key="item.id" class="price-row">
            <Col span="3" class="parice-col">
              <span class="date">日期</span>
            </Col>
            <Col span="3" class="parice-col">
               <FormItem style="width:120px" 
                :prop="'goods.' + index + '.guestPriceDecimal'"
                :key="item.id"
                :rules="{validator: validateNumber, trigger: 'blur'}"
                >
                  <Input 
                      v-model="item.guestPriceDecimal" 
                      placeholder=""
                      :maxlength="max"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col span="3" class="parice-col">
               <FormItem style="width:120px" 
               :prop="'goods.' + index + '.guestPromotionPriceDecimal'"
                :key="item.id"
                :rules="{validator: validateNumber, trigger: 'blur'}"
               >
                  <Input 
                      v-model="item.openQuantity" 
                      placeholder=""
                      :maxlength="max"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col  span="3" class="parice-col">
               <FormItem style="width:120px" 
               :prop="'goods.' + index + '.guestPromotionPriceDecimal'"
                :key="item.id"
                :rules="{validator: validateNumber, trigger: 'blur'}"
               >
                  <Input 
                      v-model="item.priceDecimal" 
                      placeholder=""
                      :maxlength="max"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col  span="4" class="parice-col">
               <FormItem style="width:120px" 
               :prop="'goods.' + index + '.guestPromotionPriceDecimal'"
                :key="item.id"
                :rules="{validator: validateNumber, trigger: 'blur'}"
               >
                  <Input 
                      v-model="item.promotionPriceDecimal" 
                      placeholder=""
                      :maxlength="maxPrice"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col  span="4" class="parice-col">
               <FormItem style="width:120px" 
               :prop="'goods.' + index + '.guestPromotionPriceDecimal'"
                :key="item.id"
                :rules="{validator: validateNumber, trigger: 'blur'}"
               >
                  <Input 
                      v-model="item.guestPriceDecimal" 
                      placeholder=""
                      :maxlength="maxPrice"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
            <Col span="4" class="parice-col">
               <FormItem style="width:120px" 
                :prop="'goods.' + index + '.guestPromotionPriceDecimal'"
                :key="item.id"
                :rules="{validator: validateNumber, trigger: 'blur'}">
                  <Input 
                      v-model="item.guestPromotionPriceDecimal" 
                      placeholder=""
                      :maxlength="maxPrice"
                      style="width:100px"
                  />
               </FormItem>
            </Col>
        </Row>
    </Form>
</template>
<script>
    export default {
        data () {
            const validateNumber = (rule, value, callback) => {
                if (value && isNaN(value)) {
                    callback(new Error('请填写数字'));
                } else {
                    callback();
                }
            };
            return {
                validateNumber:validateNumber,
                maxPrice:10,
                max:5,
                index: 1,
                formDynamic: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1
                        }
                    ],
               
                    goods:[
                        {"communityId":1,
                         "ctime":1531389303000,
                         "enableDate":1531929600000,
                         "guestPrice":100,
                         "guestPriceDecimal":1,
                         "guestPromotionPrice":100,
                         "guestPromotionPriceDecimal":'-',
                         "id":1,"mobileSeatId":1,
                         "price":100,"priceDecimal":1,
                         "promotionPrice":100,"promotionPriceDecimal":1,
                         "quantity":1,"remainQuantity":1},{
                        "communityId":1,"ctime":1531389303000,"enableDate":1532016000000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":2,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
                        "communityId":1,"ctime":1531389303000,"enableDate":1532102400000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":3,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1},{
                        "communityId":1,"ctime":1531389303000,"enableDate":1532188800000,"guestPrice":100,"guestPriceDecimal":1,"guestPromotionPrice":100,"guestPromotionPriceDecimal":1,"id":4,"mobileSeatId":1,"price":100,"priceDecimal":1,"promotionPrice":100,"promotionPriceDecimal":1,"quantity":1,"remainQuantity":1}
                        ],
                },
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            }
        }
    }
</script>
<style lang="less">
    .price-row{
        border:1px solid  #E1E6EB;
        border-top:none;
        &:first-child{
           border-top:1px solid  #E1E6EB; 
        }
        .date{
            display: inline-block;
            height: 33px;
            line-height: 33px;
            margin:15px 0;
        }
        .ivu-form-item{
            margin: 15px 0;
        }
        .ivu-form-item-error-tip{
            padding-top: 3px;
            padding-left: 10px;
            position: relative;
            text-align:left;
        }
        .parice-col{
            text-align:center;
            border-right:1px solid  #E1E6EB;
            &:last-child{
                border-right: none;
            }
        }
    }
    .row-header{
        height: 50px;
        line-height: 50px;
        background-color: #F5F6FA;
        font-size: 16px;
        color:#333;
    }
</style>
