
import OrderApi from './order';
import OrderManageApi from './orderManage';
import ContractCenter from './contractCenter'
import apiPublic from './apiPublic'
import BillApi from './bill';
import MemberApi from './member.js'
import Settlement from './settlement.js';
import operationsCenter from './operationsCenter'
import OperationApi from './operation.js';
import NewMain from './newMain.js';
import Basic from './basic.js';
import projectSetting from './projectSetting';
import Inventory from './inventory.js';
import Calculator from './calculator.js';
import Smarthardware from './smarthardware.js';
import Krmeeting from './krmeeting.js';
import DoorRelationship from './doorRelationship.js';
import KrmeetingRoom from './krmeetingRoom.js';

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
  ...Calculator,
  ...projectSetting,
  ...Inventory,
  ...Smarthardware,
  ...Krmeeting,
  ...DoorRelationship,
  ...KrmeetingRoom,
}
