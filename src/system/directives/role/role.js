import Vue from 'vue'
import _ from 'lodash';
import store from '~system/vuex';

export default {
  install() {
    Vue.directive('role', {
      bind(el, binding, vnode) {
        const role = binding.value;
        const roles = store.getters.userInfo.roleList;
        if (roles && roles.indexOf(role) === -1 && !vnode.isComment) {
          // replace HTMLElement with comment node
          const comment = document.createComment(' ');
          Object.defineProperty(comment, 'setAttribute', {
            value: () => undefined,
          });
          vnode.elm = comment;
          vnode.text = ' ';
          vnode.isComment = true;
          vnode.context = undefined;
          vnode.tag = undefined;
          vnode.data.directives = undefined;

          if (vnode.componentInstance) {
            vnode.componentInstance.$el = comment;
          }

          if (el.parentNode) {
            el.parentNode.replaceChild(comment, el);
          }
        }
      }
    });
  }
};
