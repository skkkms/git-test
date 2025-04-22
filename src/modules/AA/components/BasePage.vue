<script>
export default {
  computed: {
    contextPageId() {
      if (this._props){
        if (this._props._params && this._props._params.routerOriginPageId) {
          return this._props._params.routerOriginPageId;
        }      
      }
      if(this.$options.name.length > 13) {
        return this.$options.name.substr(0,13);
      }
      return this.$options.name;
    },
  },
  methods: {
    // page 에서 구현
    makeSnapshot() {
      return '';
    },

    getChildStateMap() {
      if (!this.__childStateMap) {
        this.__childStateMap = {};
      }
      return this.__childStateMap;
    },

    getActivatedChild() {
      if (this.__activatedChild) {
        return this.__activatedChild;
      }
      return null;
    },

    setActivatedChild(child) {
      if (this.__activatedChild !== child) {
        this.__activatedChild = child;
        return true;
      }
      return false;
    },

    // page container 컴포넌트에서 호출 @page-deactivate="handleChildDeactivated"
    handleChildDeactivated(data) {
      const stateMap = this.getChildStateMap();
      stateMap[data.pageId] = data.isDirty;
    },

    // page container 컴포넌트에서 호출 @page-activate="handleChildActivated"
    handleChildActivated(data) {
      const stateMap = this.getChildStateMap();
      this.setActivatedChild(data);
      delete stateMap[data.contextPageId];
    },

    // snapshot을 저장
    saveSnapshot(snapshot) {
      this.__currentSnapshot = snapshot;
    },

    // snapshot 여부상관없이 리턴하고 싶은경우
    clearSnapshot() {
      this.__currentSnapshot = undefined;
    },
    
    isDatasetChanged() {
      if (this.datasets) {
        const changed = _.some(this.datasets, ds => ds.isChanged());
        return changed;
      }
      return false;
    },

    isSnapshotChanged() {
      const changed = this.__currentSnapshot !== undefined && !utils.isEqual(this.__currentSnapshot, this.makeSnapshot());
      return changed;
    },

    // 데이터 변경여부 상관없이 직접 컨트롤하고 싶은경우 페이지에서 구현
    isDataChanged() {
      return (this.isDatasetChanged()
        || this.isSnapshotChanged() 
        || this.isChildTabChanged() 
        || (this.getActivatedChild() && this.getActivatedChild().isDataChanged())) ? true : false;
    },
    
    isChildTabChanged() {
      const stateMap = this.getChildStateMap();
      return _.some(stateMap, changed => changed);
    },

    isKeepAlive() {
      // return this.$options.name === 'PGE_CMU_00003';
      return false;
    },
  },
  // tab이 비활성 화 되는 시점에 호출
  deactivated() {
    this.$emit('page-deactivate', {
      pageId: this.contextPageId,
      isDirty: this.isDataChanged(),
    });
    if (this.$deactivated) {
      this.$deactivated();
    }
  },

  activated() {
    this.$emit('page-activate', this);
    if (this.$activated) {
      this.$activated();
    }
  },

  beforeRouteLeave(to, from, next) {
    // const devConf = 'Y';
    // const isChanged = this.isDataChanged();
    // if (isChanged) {
    //   utils.messageBox('confirm', this.$t('MSG_ALT_NOT_SAVE_DATA'), '',
    //     () => {
    //       if (devConf === 'Y') {
    //         if (!this.isKeepAlive()) {
    //           this.$clearDatasets();
    //         }
    //         next(true);
    //       } else {
    //         next(true);
    //       }
    //     },
    //     () => {
    //       next(false);
    //     });
    // } else if (devConf === 'Y') {
    //   if (!this.isKeepAlive()) {
    //     this.$clearDatasets();
    //   }
    //   next(true);
    // } else {
    //   next(true);
    // }
    next(true);
  },
};
</script>
