import _ from 'lodash'

export default {
  findPageId : (component) => {
    let currentComponent = component;
    while (currentComponent) {
      const name = currentComponent.$options.name;
      if (typeof name === 'string' && name.length === 13) {
        const splittedStr = name.split('_');
        if (splittedStr.length === 3 && splittedStr[0] === 'PGE') {
           return name;
        }
      }
      currentComponent = currentComponent.$parent;
    }
    return null;
  },
};
