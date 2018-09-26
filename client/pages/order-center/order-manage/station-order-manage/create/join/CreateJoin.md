{
    //基本信息
    "basicInfo": {
        "customerId": "customerId",
        "communityId": "communityId",
        "salerId": "salerId",
        "opportunityId": "saleChanceId"
    },
    //客户主管理员信息
    "managerId": "managerId",
    //租赁信息
    "rentInfo": {
        "startDate": "",
        "endDate": "",
        "signDate": "",
        "timeRange": ""
    },
    //金额信息
    "amountInfo": {
        //选择的工位数组
        "seats": [
            {
                "amount": 236999.93,
                "originalPrice": 10000,
                "endDate": 1598889600000,
                "capacity": 1,
                "seatType": "OPEN",
                "discountedPrice": 10000,
                "originalAmount": 236999.93,
                "price": 9987.35,
                "name": "a1",
                "guidePrice": 1,
                "seatId": 12595,
                "id": 12595,
                "floor": 5,
                "startDate": 1536595200000
            }
        ]
    },
    //优惠信息
    "discountInfo": {
        "saleList": [
            {
                "value": "",
                "index": 2,
                "status": 1,
                "show": true,
                "discount": "9",
                "validStart": "2018-09-11 00:00:00",
                "startDate": "",
                "validEnd": "2020-09-01 00:00:00",
                "type": "1/0/折扣（6.5折）/496",
                "tacticsType": "1",
                "tacticsName": "折扣（6.5折）",
                "tacticsId": "496"
            }
        ]
    },

    "payInfo": {
        //优惠后服务费总额
        "rentAmount": "",
        //履约保证金(月数)
        "deposit": "depositAmount",
        //首付款日期
        "firstPayTime": "",
        //付款方式
        "installmentType": ""
    },
    //当前登陆人信息 用作给销售员赋初值 为何还要提交？
    "ssoInfo":{
        "ssoId":"",
        "ssoName":""
    }
}
