import {Coffee} from './Coffee';

export type CoffeesPageResponse = {
  page: number;
  totals: number;
  coffees: Coffee[];
  error?: string;
};
