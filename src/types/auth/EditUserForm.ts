import {District, Province, Ward} from '../address';

export type EditUserForm = {
  email: string;
  name: string;
  phone: string;
  address?: string;
  province?: Province;
  district?: District;
  ward?: Ward;
};
