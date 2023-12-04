import {Volume} from '../types/order';
import {PayMethod} from '../types/pay';

export const MyApp = {
  maxPoint: 10000,
};

export const volumes: Volume[] = [
  {ml: '250', size: 22, priceAdd: 0},
  {ml: '350', size: 28, priceAdd: 10000},
  {ml: '450', size: 34, priceAdd: 20000},
];

export const priceShip = 18000;

export const payMethods: PayMethod[] = [
  {
    id: '1',
    image:
      'https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1225-3kb6axel.png',
    title: 'MasterCard',
    type: 'mastercard',
  },
  {
    id: '2',
    image:
      'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png',
    title: 'Momo',
    type: 'momo',
  },
];
