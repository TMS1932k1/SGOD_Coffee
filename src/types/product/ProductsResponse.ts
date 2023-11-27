import {Product} from './Product';

export type ProductsResponse = {
  page: number;
  totalPage: number;
  products: Product[];
  error?: string;
};
