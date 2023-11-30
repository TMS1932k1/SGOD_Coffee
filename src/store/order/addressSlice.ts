import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {District, Province, Ward} from '../../types/address';

interface addressState {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  address?: string;
  province?: Province;
  district?: District;
  ward?: Ward;
  isLoadingProvinces: boolean;
  isLoadingDistricts: boolean;
  isLoadingWards: boolean;
  errorMes?: string;
}

const initialState: addressState = {
  provinces: [],
  districts: [],
  wards: [],
  isLoadingProvinces: true,
  isLoadingDistricts: true,
  isLoadingWards: true,
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setInit: state => {
      state.provinces =
        require('../../assets/data/provinces.json') as Province[];
      state.districts = [];
      state.wards = [];
      state.address = undefined;
      state.province = undefined;
      state.district = undefined;
      state.ward = undefined;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setProvince: (state, action: PayloadAction<Province>) => {
      state.province = action.payload;
      state.districts = (
        require('../../assets/data/districts.json') as District[]
      ).filter(district => district.province_code === action.payload.code);
      state.wards = [];
      state.district = undefined;
      state.ward = undefined;
    },
    setDistrict: (state, action: PayloadAction<District>) => {
      state.district = action.payload;
      state.wards = (require('../../assets/data/wards.json') as Ward[]).filter(
        ward => ward.district_code === action.payload.code,
      );
      state.ward = undefined;
    },
    setWard: (state, action: PayloadAction<Ward>) => {
      state.ward = action.payload;
    },
  },
});

export const {setProvince, setDistrict, setWard, setInit, setAddress} =
  addressSlice.actions;
export default addressSlice.reducer;
