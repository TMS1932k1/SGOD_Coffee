import {District, Province, Ward} from '../address';

export type Location = {
  lat: number;
  long: number;
  province: Province;
  district: District;
  ward: Ward;
  address: string;
};
