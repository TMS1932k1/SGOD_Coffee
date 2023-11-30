import axios from 'axios';

const PROVINCES_BASE_URL = 'https://provinces.open-api.vn/api/';

const axiosProvinces = axios.create({
  baseURL: PROVINCES_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

export default {axiosProvinces};
