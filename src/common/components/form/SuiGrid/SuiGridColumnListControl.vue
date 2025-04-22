<template>
  <div class="btn_wrapR">
    <button
      type="button"
      class="comm_btn_gridTop"
      @click="onOpenColumnSelect"
    >
      columns
    </button>
  </div>
</template>

<script>
import Vue from 'vue';
import MultiSelect from '~common/components/form/SuiMultiSelect/SuiMultiSelect';

const WIDTH = '150';
export default {  
  name: 'SuiGridColumnListControl',
  data() {
    return {      
      selected: [],
      options: [],
      grid: null,
      jqxGrid: null,
      columns: [],
    };
  },
  mounted() {
    this.grid = this.$parent.$parent;
    if (this.grid) {
      this.jqxGrid = this.grid.getJqxGrid();
      this.columns = this.grid.columns;
    }
  },
  methods: {
    /**
     * @public
     */
    onOpenColumnSelect() {
      this.activate();
    },
    activate() {
      this.activatePortal();
    },
    deactivate() {
      this.portal.deactivate();
    },
    updateSearch(event) {
      this.portal.updateSearch(event);
    },
    getPortalComponent() {
      if (!this.portal) {
        const componentClass = Vue.extend(MultiSelect);
        const propsData = {
          options: this.options,
          value: this.selected,
          multiple: true,
          closeOnSelect: false,
          hideInput: true,
          placeholder: '',
        };
        const componentInstance = new componentClass({
          propsData,
        });
        componentInstance.$mount();
        const parentElement = utils.getComponentPortalContainer();
        parentElement.appendChild(componentInstance.$el);
        componentInstance.$el.style.position = 'fixed';
        this.portal = componentInstance;
        componentInstance.$on('input', (selected) => {
          this.selected.splice(0, this.selected.length);
          selected.forEach(select => {
            this.selected.push(select);
          });
        });
        componentInstance.$on('close', (values) => {
          this.deactivatePortal();
        });
      }
      return this.portal;
    },
    onEventBlockerMouseDown() {
      this.getPortalComponent().deactivate();
    },
    initOptions() {
      this.options.splice(0, this.options.length);
      this.selected.splice(0, this.selected.length);

      this.columns.forEach(column => {
        const option = {
          key: column.datafield,
          label: column.text,
        }
        this.options.push(option);
        if (this.jqxGrid.iscolumnvisible(column.datafield)) {          
          this.selected.push(option);
        }
      });
    },
    activatePortal() {
      this.$emit('activate');
      this.initOptions();
      const portal = this.getPortalComponent();
      const bound = this.$el.getBoundingClientRect();
      portal.$el.style.left = `${bound.right - WIDTH}px`;
      portal.$el.style.top = `${bound.bottom}px`;
      portal.$el.style.width = `${WIDTH}px`;
      portal.$el.style.display = 'block';      
      portal.activate();
      // const blocker = utils.showEventBlocker();      
      // blocker.addEventListener('mousedown', this.onEventBlockerMouseDown);      
    },
    deactivatePortal() {
      this.$emit('deactivate');
      this.portal.$el.style.display = 'none';      
      const newSelectedKeys = [];
      this.selected.forEach(select => {
        newSelectedKeys.push(select.key);
      });
      this.grid.setShowedColumns(newSelectedKeys);      
      // const blocker = utils.hideEventBlocker();
      // blocker.removeEventListener('mousedown', this.onEventBlockerMouseDown);
    },
  },
  beforeDestroy() {
    // console.log(`beforeDestroy: ${this.$options.name}`);
    if (this.portal) {
      if (this.portal.$el.parentNode) {
        this.portal.$el.parentNode.removeChild(this.portal.$el);
      }
      this.portal.$destroy();
      this.portal = null;
    }
  },
}
</script>

<style scoped>
</style>
