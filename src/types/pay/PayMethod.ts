import {PayMethodType} from './PayMethodType';

export type PayMethod = {
  id: string;
  title: string;
  type: PayMethodType;
  image: string;
};
