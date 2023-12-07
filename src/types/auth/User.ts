import {Location} from '../order';

export type User = {
  email: string;
  id: string;
  name: string;
  phone: string;
  refreshToken: string;
  role: string;
  point: number;
  idFavorites: string[];
  location?: Location;
};
