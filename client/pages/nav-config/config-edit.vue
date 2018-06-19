<template>
  <div >
            <div>
                <Form :model="formTop" label-position="top">
                    <Row>
                        <Col span="24">
                            <FormItem label="名称">
                                <Input v-model="formTop.name" />
                            </FormItem> 
                        </Col>
                        <Col span="24">
                            <FormItem label="编码">
                                <Input v-bind:disabled="title=='编辑权限'" v-model="formTop.code" />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div>
                数据权限：
            </div>
            <div>
                <table class="table">
                    <tbody v-for="data in roleEditS" :key="data.code">
                        <tr>
                            <td>
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td >{{data.label}}</td>
                                            <td ></td>
                                            <td ></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <table class="table">
                                    <tbody>
                                        <tr v-for="(line,index) in  data.children" :key="index">
                                            <td >{{index ==0? line.groupName:""}}</td>
                                            <td >{{line.subGroupName}}</td>
                                            <td >
                                                <RadioGroup v-model="line.subGroupRightType" >
                                                    <Radio label="NONE" >无</Radio>
                                                    <Radio label="READONLY" >读取</Radio>
                                                    <Radio label="READWRITE" >写入</Radio>
                                                </RadioGroup>
                                            </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
