import {Location, Order} from '../order';
import {PayMethod} from '../pay/PayMethod';
import {User} from '../auth';
import {Store} from '../store';
import {StatusBill} from './StatusBill';

export type Bill = {
  id: string;
  user?: User;
  orders: Order[];
  shipTo?: Location;
  phone?: string;
  store: Store;
  payMetthod: PayMethod;
  total: number;
  addPoint: number;
  status: StatusBill;
  createAt: number;
};
