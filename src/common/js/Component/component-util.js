import Vue from 'vue';
import SuiToast from '~common/components/form/SuiToast/SuiToast';

const createComponent = (component, propsData = {}, element = null) => {
  const sourceComponent = component.constructor.name === 'String'? utils.getComponentByName(component) : component;
  if (!sourceComponent) {
    return null;
  }
  const componentClass = Vue.extend(sourceComponent);
  const componentInstance = new componentClass({    
    propsData,
  });
  componentInstance.$mount();
  if (element) {
    element.appendChild(componentInstance.$el);  
  }  
  return componentInstance;
};

const toast = (message) => {
  const propsData = {
    message,
  };
  return createComponent(SuiToast, propsData);
};

export default {
  toast,
  createComponent,
}
