import {Location} from '../../types/order/Location';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {District, Province, Ward} from '../../types/address';

interface addressState {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
}

const initialState: addressState = {
  provinces: [],
  districts: [],
  wards: [],
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<Location | undefined>) => {
      state.provinces =
        require('../../assets/data/provinces.json') as Province[];
      if (action.payload) {
        state.districts = (
          require('../../assets/data/districts.json') as District[]
        ).filter(
          district => district.province_code === action.payload!.province.code,
        );
        state.wards = (
          require('../../assets/data/wards.json') as Ward[]
        ).filter(ward => ward.district_code === action.payload!.district.code);
      } else {
        state.districts = [];
        state.wards = [];
      }
    },
    setProvince: (state, action: PayloadAction<Province>) => {
      state.districts = (
        require('../../assets/data/districts.json') as District[]
      ).filter(district => district.province_code === action.payload.code);
      state.wards = [];
    },
    setDistrict: (state, action: PayloadAction<District>) => {
      state.wards = (require('../../assets/data/wards.json') as Ward[]).filter(
        ward => ward.district_code === action.payload.code,
      );
    },
  },
});

export const {setProvince, setDistrict, setInit} = addressSlice.actions;
export default addressSlice.reducer;
