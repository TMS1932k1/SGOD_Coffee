import {Category} from './Category';

export type CategoriesResponse = {
  categories: Category[];
  error?: string;
};
