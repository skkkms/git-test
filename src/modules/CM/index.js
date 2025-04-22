
import ComponentRegister from '~common/components/componentRegister';
import * as components from './components';

_.forEach(components, component => {
  ComponentRegister.registComponent(component);
});
