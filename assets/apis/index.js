
import OrderApi from './order.js';
import OrderManageApi from './orderManage.js';
import ContractCenter from './contractCenter'
import apiPublic from './apiPublic'
import BillApi from './bill.js';

export default {
  ...OrderApi,
  ...OrderManageApi,
  ...ContractCenter,
  ...apiPublic,
  ...BillApi
}
