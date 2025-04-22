import Axios from 'axios';
import systemConfig from '~config/config';
const dataServiceBaseUrl = systemConfig.dataService.baseURL;

class AuthManager {
  login() {
    return new Promise((resolve, reject) => {      
      const config = {
        method: 'post',
        baseURL: dataServiceBaseUrl,
        url: '/api/v1/security/login',
        headers: {
          'Authorization' : 'Bearer '+ (localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''),	
        },
      };
      Axios(config).then((response) => {
        if (response.data.errorType) {
          const error = response.data;
          if(error.errorType === 'R' || error.errorType === 'S') {
        	localStorage.setItem('accessToken', '');
            window.location.href = error.errorMessage;
          }
          reject('auth err');
        } else {
          resolve(response.data);
        }
      }).catch(error => {
        console.log(error.message);
        reject('auth err');
      })      
    });
  }
}

export default new AuthManager();
