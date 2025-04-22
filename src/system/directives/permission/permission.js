import Vue from 'vue'
import _ from 'lodash';
import store from '~system/vuex';

export default {
  install() {
    Vue.directive('permission', {
      bind(el, binding, vnode) {
        const pageId = binding.value;
        const permission = binding.arg;

        const pageMeta = store.getters.getPageMeta(pageId);
        let permissions = [];

        if (pageMeta) {
          permissions = pageMeta.permissionsList
        }

        // console.log(permissions)

        if (permissions.indexOf(permission) === -1 && !vnode.isComment) {
        // if (false) {
          // replace HTMLElement with comment node

          // 각 버튼에서 key를 넣기에는 수정할 부분이 많아서 공통처리
          if (vnode.componentOptions && vnode.componentOptions.tag === 'ui-button') {
            vnode.isRemove = true;
            return;
          }

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
