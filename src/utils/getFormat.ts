import moment from 'moment';
import {Location} from '../types/order';

export const getFormatDateWithString = (date: string) => {
  return moment(date).format('DD/MM/YYYY');
};

export const getFormatDate = (date: Date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const getFullAddressString = (location: Location) => {
  return [
    location.address,
    location.ward.name,
    location.district.name,
    location.province.name,
  ].join(', ');
};
