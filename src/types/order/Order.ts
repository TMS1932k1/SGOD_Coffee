import {Product} from '../product';
import {Location} from './Location';
import {Store} from './Store';
import {Volume} from './Volume';

export type Order = {
  product: Product;
  amount: number;
  size?: Volume;
  store?: Store;
  shipTo?: Location;
  note?: string;
};
