import {TypeProduct} from './TypeProduct';

export type Product = {
  id: string;
  category: string;
  name: string;
  price: number;
  rate?: number;
  rateCount: number;
  image: string;
  type: TypeProduct;
};
