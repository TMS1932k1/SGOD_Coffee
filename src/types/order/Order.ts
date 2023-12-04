import {Product} from '../product';
import {Location} from './Location';
import {Store} from './Store';
import {Volume} from './Volume';

export type Order = {
  id: string;
  product: Product;
  amount: number;
  volume?: Volume;
  store: Store;
  shipTo?: Location;
  note?: string;
  total: number;
};
