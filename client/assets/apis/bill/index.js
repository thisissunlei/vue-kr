
import bill from './bill';
import makeInvoice from './makeInvoice';
import financialInvoice from './financialInvoice';

export default {
  ...bill,
  ...makeInvoice,
  ...financialInvoice
 
}
