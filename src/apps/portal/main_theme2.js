import AppInitializer from '../AppInitializerTheme2';
import AuthManager from '~system/auth/AuthManager';
import App from './App';

AuthManager.login().then(loginData => {
  const appInitializer = new AppInitializer();
  appInitializer.createVueApp(App, loginData);
}).catch(err => {
  console.log(err);
});

// appInitializer.createVueApp(App);
