/**
 * This file is for asset installation. Do not delete this file.
 * If you delete it, the newly installed component will not work properly in WYSIWYG editor.
 * If you want to set the asset installation to a different file, please modify the .iderc.json file and the main.js file.
 */

import Vue from 'vue';

import uidevComponent from 'uidev-component/index';
import { uidevGrid } from 'uidev-component/index';

import urDataGrid from 'uidev-component/grid/urDataGrid/urDataGrid';
import urGlobalSnackbar from 'uidev-component/components/element/urSnackbar/urGlobalSnackbar';

import uidevContainers from './containers';
import uidevElements from './elements';

Vue.use(uidevComponent);
Vue.use(uidevGrid);

Vue.component('ur-global-snackbar', urGlobalSnackbar);
Vue.component('ur-grid', urDataGrid);

Vue.use(uidevContainers);
Vue.use(uidevElements);