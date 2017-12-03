<template>
	<div>
        <Button type="primary" @click="show">批量结算</Button>
    
    </div>
</template>
<script>
import axios from '../../plugins/api.js';

    export default {
        data () {
            return {
                
            }
        },
        methods: {
            show: function() {
                let params = {
                    communityId:4,
                    floor:this.floor,
                    mainBillId:3162,
                    startDate:'2017-11-27 00:00:00',
                    endDate:'2017-12-02 00:00:00',
                }
               axios.get('krspace-finance-web/cmt/floor-graph/select-info?', params, r => {
                    console.log('r', r);
                
                }, e => {
                    console.log('error',e)
                })
            }
        }
    }
</script>
