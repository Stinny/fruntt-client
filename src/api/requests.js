import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8008/api/';
const currentUser = Cookies.get('currentUser')
  ? JSON.parse(Cookies.get('currentUser'))
  : null;

export const apiRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${currentUser?.accessToken}` },
});

export const uploadImageRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${currentUser?.accessToken}`,
    'Content-Type':
      'multipart/form-data; boundary=----WebKitFormBoundaryyEmKNDsBKjB7QEqu',
  },
});
