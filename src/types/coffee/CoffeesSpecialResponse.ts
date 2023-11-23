import {Coffee} from './Coffee';

export type CoffeesSpecialResponse = {
  specialText?: string;
  coffees: Coffee[];
  error?: string;
};
