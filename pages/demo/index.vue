<template>
	<div>
        <Button type="primary" @click="show">批量结算</Button>
    
    </div>
</template>
<script>
import axios from '../../plugins/http.js';

    export default {
        data () {
            return {
                
            }
        },
        head(){
            return {
                title:'vue-------bad'
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
               axios.get('getplanmap', params, r => {
                    console.log('r', r);
                
                }, e => {
                    console.log('error',e)
                })
            }
        }
    }
</script>
