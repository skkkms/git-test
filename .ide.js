// import AppInitializer from './src/apps/AppInitializer';
// import App from './src/apps/site/App';
//
// const appInitializer = new AppInitializer();
//
// window.$ide.beforeVueInit = () => {
//  appInitializer.createVueApp(App);
//
//  window.$ide.vueOptions.store = appInitializer.store;
//  window.$ide.vueOptions.i18n = appInitializer.i18n;
//  window.$ide.vueOptions.router = appInitializer.router;
// };
//
// window.$ide.afterVueInit = () => {
//  appInitializer.setVueApp(window.$ide.vueInstance);
// }


import Vue from 'vue';
import AppInitializer from './src/apps/AppInitializer';
import App from './src/apps/site/App';


const appInitializer = new AppInitializer();

function beforeVueInit(vueOptions) {
 appInitializer.createVueApp(App);

 vueOptions.store = appInitializer.store;
 
 vueOptions.i18n = appInitializer.i18n;
 vueOptions.router = appInitializer.router;
};

function afterVueInit(vueInstance) {
 appInitializer.setVueApp(vueInstance);
}



function autoRouteHook(routeOptions) {
  routeOptions.forEach(r => {
    console.log(r)
    const splittedPath = r.path.split('/');
    r.path = `/${splittedPath[splittedPath.length - 1]}`;
  });
}

export default {
  Vue,
    
  beforeVueInit,
  afterVueInit,
  // autoRouteHook,
}
