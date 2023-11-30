import {Store} from './Store';

export type StoreResponse = {
  error?: string;
  stores?: Store[];
};
