import {Coffee} from './Coffee';

export type CoffeesCategoryResponse = {
  page: number;
  totals: number;
  coffees: Coffee[];
  error?: string;
};
