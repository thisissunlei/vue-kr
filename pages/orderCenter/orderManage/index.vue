<template>
    <div class='bill-list'>
        <Tabs active-key="key1">
            <Tab-pane label="入驻订单" key="key1">   
                <JoinList></JoinList>
            </Tab-pane>

            <Tab-pane label="减租订单" key="key2">
                <ReduceList></ReduceList>
            </Tab-pane>

        </Tabs>    
    </div>
</template>

<script>

import JoinList from './joinList';
import ReduceList from './reduceList';
export default {
   name:'list',
   components:{
       JoinList,
       ReduceList
   },
 }
</script>