
import OrderApi from './order';
import OrderManageApi from './orderManage';
import ContractCenter from './contractCenter'
import apiPublic from './apiPublic'
import BillApi from './bill.js';
import MemberApi from './member.js'
import Settlement from './settlement.js';
import operationsCenter from './operationsCenter'
import OperationApi from './operation.js';
import NewMain from './newMain.js';
import Basic from './basic.js';
import projectSetting from './projectSetting'

export default {
  ...OrderApi,
  ...OrderManageApi,
  ...ContractCenter,
  ...apiPublic,
  ...BillApi,
  ...MemberApi,
  ...Settlement,
  ...operationsCenter,
  ...OperationApi,
  ...NewMain,
  ...Basic,
  ...projectSetting
}
