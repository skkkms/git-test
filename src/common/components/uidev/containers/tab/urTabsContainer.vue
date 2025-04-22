<script>
export default {
  name: 'urTabsContainer',
  props: {
    tabId: {
      type: String,
      required: true,
    },
    hideTab: {
      type: Boolean,
      default: false,
    },
    tabWidth: {
      type: [String, Number],
    },
  },
  data() {
    return {
      tabIds: [],
      selectedTabId: '',
      labelOverflow: false,
      watchLabelOverflowInterval: null,
    };
  },
  computed: {
    labelStyle() {
      let style = {};
      if (parseInt(this.tabWidth)) {
        style['width'] = parseInt(this.tabWidth) + 'px';
      }

      return style;
    },
    selectedTabIndex() {
      const index = this.tabIds.findIndex(
        tabId => tabId === this.selectedTabId,
      );
      return index;
    },
  },
  created() {
    // TabID 목록 생성
    const slots = this.$slots['default'];
    if (!!slots) {
      slots.forEach(vNode => {
        if (
          vNode.componentOptions &&
          vNode.componentOptions.tag === 'ur-tab-item-container'
        ) {
          const tabId = vNode.componentOptions.propsData.tabId;
          this.tabIds.push(tabId);
        }
      });
    }
  },
  mounted() {
    this.watchLabelOverflowInterval = setInterval(
      () => this.updateLabelOverflow(),
      300,
    );

    // When mounted, toggle tab for setting initial handle position
    if (this.tabId) {
      this.$nextTick(() => {
        this.updateLabelOverflow().then(() => {
          this.toggleTab(this.tabId);
        });
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.watchLabelOverflowInterval);
  },
  methods: {
    async updateLabelOverflow() {
      const box = this.$refs['tab-header'];
      const boxRect = box.getBoundingClientRect();

      const labelBox = this.$refs['tab-label'];
      const firstRect = labelBox.firstChild.getBoundingClientRect();
      const lastRect = labelBox.lastChild.getBoundingClientRect();

      this.labelOverflow =
        lastRect.right > boxRect.right || firstRect.left < boxRect.left;
    },
    toggleTab(tabId) {
      if (this.selectedTabId != tabId) this.$emit('tab-changed', tabId);
      this.selectedTabId = tabId;

      const boxRect = this.$refs['tab-label'].getBoundingClientRect();
      const labelRect = this.$refs[
        `tab-label-${this.selectedTabId}`
      ].getBoundingClientRect();

      if (labelRect.right > boxRect.right) {
        this.$refs['tab-label'].scrollLeft +=
          labelRect.right - boxRect.right + 30;
      } else if (labelRect.left < boxRect.left) {
        this.$refs['tab-label'].scrollLeft +=
          labelRect.left - boxRect.left - 30;
      }
    },
    movePrevTab() {
      if (this.selectedTabIndex) {
        this.toggleTab(this.tabIds[this.selectedTabIndex - 1]);
      }
    },
    moveNextTab() {
      if (this.selectedTabIndex < this.tabIds.length - 1) {
        this.toggleTab(this.tabIds[this.selectedTabIndex + 1]);
      }
    },
  },
  render(h) {
    const labels = [];
    const handles = [];
    const contents = [];

    //Icon Render Function
    const renderIcon = (icon, iconType) => {
      return h('ur-icon', {
        props: {
          icon: icon,
          iconType: iconType,
          full: true,
        },
      });
    };

    // Slot 내 ur-tab-item-container 컴포넌트에 따라 라벨 생성
    const slots = this.$slots['default'];
    if (!!slots) {
      slots.forEach(vNode => {
        if (
          vNode.componentOptions &&
          vNode.componentOptions.tag === 'ur-tab-item-container'
        ) {
          const tabId = vNode.componentOptions.propsData.tabId;
          const title = vNode.componentOptions.propsData.title;
          const titleIcon = vNode.componentOptions.propsData.titleIcon;
          const titleIconType = vNode.componentOptions.propsData.titleIconType;

          const labelDoms = [];

          //라벨 아이콘 DOM 추가
          if (titleIcon) {
            labelDoms.push(renderIcon(titleIcon, titleIconType || 'line'));
          }

          //라벨 타이틀 텍스트 DOM 추가
          if (title) {
            labelDoms.push(
              h('span', {
                domProps: {
                  innerHTML: title,
                },
              }),
            );
          }

          //라벨 DOM 추가
          labels.push(
            h(
              'div',
              {
                ref: `tab-label-${tabId}`,
                class: [
                  'ur-tab-label',
                  { 'ur-tab-label__selected': tabId === this.selectedTabId },
                ],
                style: this.labelStyle,
                on: {
                  click: () => this.toggleTab(tabId),
                },
              },
              labelDoms,
            ),
          );

          //컨텐츠 DOM 추가
          const styleObj =
            tabId != this.selectedTabId ? { display: 'none' } : {};
          contents.push(
            h(
              'div',
              {
                class: [
                  'ur-tabs-item__container',
                  {
                    'ur-tabs-item__container--no-height': !parseInt(
                      this.height,
                    ),
                  },
                ],
                style: styleObj,
              },
              [vNode],
            ),
          );
        }
      });

      // //라벨 Handle DOM 추가
      // handles.push(
      //   h(
      //     'div',
      //     {
      //       class: 'ur-tabs-label__handle',
      //       style: !this.labelOverflow ? { display: 'none' } : {},
      //     },
      //     [
      //       h(
      //         'div',
      //         {
      //           class: [
      //             'ur-tabs-label__handle-item',
      //             'ur-tabs-label__handle-item-prev',
      //             {
      //               'ur-tabs-label__handle-item--disabled':
      //                 this.selectedTabIndex == 0,
      //             },
      //           ],
      //           on: {
      //             click: () => this.movePrevTab(),
      //           },
      //         },
      //         [renderIcon('collapse_menu', 'picto')],
      //       ),
      //       h(
      //         'div',
      //         {
      //           class: [
      //             'ur-tabs-label__handle-item',
      //             'ur-tabs-label__handle-item-next',
      //             {
      //               'ur-tabs-label__handle-item--disabled':
      //                 this.selectedTabIndex == this.tabIds.length - 1,
      //             },
      //           ],
      //           on: {
      //             click: () => this.moveNextTab(),
      //           },
      //         },
      //         [renderIcon('collapse_menu', 'picto')],
      //       ),
      //     ],
      //   ),
      // );
    }

    return h(
      'div',
      { class: ['ur-tabs__container'] },
      [
        h(
          'div',
          {
            ref: 'tab-header',
            class: [
              'ur-tabs-header',
              { 'ur-tabs-header--overflow': this.labelOverflow },
            ],
            style: this.hideTab ? { display: 'none' } : {},
          },
          [
            h(
              'div',
              {
                ref: 'tab-label',
                class: 'ur-tabs-label__container',
              },
              labels,
            ),
            ...handles,
          ],
        ),
        contents,
      ],
    );
  },
};
</script>
