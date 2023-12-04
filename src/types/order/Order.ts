import {Product} from '../product';
import {Volume} from './Volume';

export type Order = {
  id: string;
  product: Product;
  amount: number;
  volume?: Volume;
  note?: string;
  total: number;
};
