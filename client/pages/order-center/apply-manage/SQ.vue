<template>

</template>

<script>
export default {
    methods: {
        getInfo() {
            let { params } = this.$route;
            let from = {
                id: params.watchView
            };
            this.$http.get('join-bill-detail', from).then((response) => {
                this.basicInfo = response.data;
                if (response.data.installments.length > 10) {
                    this.showButton = true;
                    this.showAll = false;
                    this.installments = response.data.installments.slice(0, 10)
                } else {
                    this.installments = response.data.installments || [];
                }
                this.installmentAll = response.data.installments || []

                this.capitalTreatment = response.data.tactiscAmount ? utils.smalltoBIG(response.data.tactiscAmount) : '';
                this.capitalService = response.data.seatRentAmount ? utils.smalltoBIG(response.data.seatRentAmount) : '';
                this.serviceData = response.data.orderSeatDetailVo || [];
                this.treatmentData = response.data.contractTactics || [];
                this.contractData = response.data.orderContractInfo ? response.data.orderContractInfo : [];
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        }
    }
}
</script>


<style>
</style>
