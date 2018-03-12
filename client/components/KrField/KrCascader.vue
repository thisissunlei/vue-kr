<template>
    <Cascader
        :data="propsCity"
        v-model="value"
        @on-change="change"
        @on-visible-change="visibleChange"
    ></Cascader>
</template>

<script>
    import cityData from './data/cityData.json';
    // import {dataType} from '~/plugins/utils';
    export default {
        methods:{
            change(event){
                this.$emit('change',event)
            },
            visibleChange(event){
                this.$emit('visibleChange',event)
            },
            getData(){
                if(!this.propsCity || !this.propsCity.length){
                    this.propsCity =  cityData;
                }
                return cityData;
            },
        },
        props:{
            propsCity:{
                default:()=>cityData,
                type:Array
            }
        },

        data () {
            return {
                value: [],
               
            }
        },
        mounted(){
            
          
        }
    }
</script>
