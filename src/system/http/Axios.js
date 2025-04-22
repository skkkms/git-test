import Axios from 'axios';
import systemConfig from '../../config/config';

const axios = new Axios.create({
  baseURL: systemConfig.dataService.baseURL,
});

