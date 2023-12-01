import {District} from './District';
import {Province} from './Province';
import {Ward} from './Ward';

export type FormShipTo = {
  phone?: string;
  address?: string;
  province?: Province;
  district?: District;
  ward?: Ward;
};
