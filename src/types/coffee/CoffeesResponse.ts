import {Coffee} from './Coffee';

export type CoffeeResponse = {
  page: number;
  totals: number;
  coffees: Coffee[];
  error?: string;
};
