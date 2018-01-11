
import OrderApi from './order.js';
import OrderManageApi from './orderManage.js';
import ContractCenter from './contractCenter'
import apiPublic from './apiPublic'
import BillApi from './bill.js';
import MemberApi from './member.js';
import Settlement from './settlement.js';

export default {
  ...OrderApi,
  ...OrderManageApi,
  ...ContractCenter,
  ...apiPublic,
  ...BillApi,
  ...MemberApi,
  ...Settlement,
}
