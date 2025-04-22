<script>
import SuiCustomSelectBase from '../SuiCustomSelectBase/SuiCustomSelectBase';
import selectUtil from '../SuiSelectBase/select-util';

export default {
  extends: SuiCustomSelectBase,
  props: {
    customOpitonList: {
      type: Array,
      default() {
        return [];
      },
    }, // 사용자 추가 옵션 목록
    useDefault: {
      type: Boolean,
      default: true,
    },
    initialSelectedIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      optionList: [
        {
          key: 'Y',
          label: 'Yes',
        }, {
          key: 'N',
          label: 'No',
        },
      ],
    };
  },
  methods: {
    initOptionList() {
      if (!this.useDefault) this.optionList = [];

      this.optionList = selectUtil.mergeOptionList(this.optionList, selectUtil.mergeDefaultOption(this.customOpitonList, this.defaultOption));

      if (this.selected.key) {
        this.select(this.selected.key);
      } else if (this.initialSelectedIndex >= 0 && this.optionList.length > 0) {
        this.select(this.optionList[this.initialSelectedIndex].key);
      }
    },
  },
};
</script>
<style scoped>
</style>
