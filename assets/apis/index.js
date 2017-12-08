
import OrderApi from './order.js';
import OrderManageApi from './orderManage.js';
import ContractCenter from './contractCenter'


export default {
  ...OrderApi,
  ...OrderManageApi,
  ...ContractCenter
}
