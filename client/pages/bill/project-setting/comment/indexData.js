export default function(){
        return {
                heightDiv:300,
                isClick:true,
                propertyData:[],
                productData:[],
                name: this.$route.query.name,
                city: this.$route.query.city,
                eyeIndex:1,
                imgData:[],
                isPhotoAlbum:false,
                memberDetail:[],
                memberDetailView:false,
                modalProject:false,
                coreinfoBusiness: [],
                coreinfoFinance: [],
                typeCodeInfo: [],
                modal2ImgUrl: '',
                modlalTitle: '回复评论',
                placeholder: '回复  ',
                getuploadData: {},
                getupfileurl: "",
                page: 1,
                data: {},
                imgUplaodId: [],
                pageSize: 10,
                comments: [],
                totalCount: 0,
                modal1: false,
                modal2: false,
                projectId: this.$route.query.id,
                photos: "",
                replyId: null,
                formItem: {
                    comment: ''
                },
                defaultList: [

                ],
                imgName: '',
                uploadList: [],
                ruleValidate: {
                    comment: [{
                        required: true,
                        message: '备注不能为空',
                        trigger: 'blur'
                    }]
                }
            }
}
