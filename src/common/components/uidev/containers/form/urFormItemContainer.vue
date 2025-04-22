<template>
  <div class="ur-form-item" :class="itemClass" :style="itemStyle">
    <div
      class="ur-form-item__label ellipsis"
      :class="labelClass"
      :style="labelStyle"
    >
      <!--
        $ver: v0.1.0
        label은 props를 통해 문자열을 넣을수도 있지만 label slot을 활용하여 더 자유도 높은 구현을 할 수 있습니다.
        #Labels can be stringed via props, but label slots allow for more freedom of implementation.
      -->
      <slot name="label">
        <span>{{ label }}</span>
      </slot>
      <span><ur-icon :id="`${_uid}-tooltip`" v-if="tooltip" :icon="tooltipIcon" :type="tooltipIconType" full class="ml-1"/></span>
    </div>
    <div
      class="ur-form-item__compo"
      :class="[
        { 'ur-form-item__compo--no-flex': noFlex },
        'ur-form-item__compo--' + contentAlign,
      ]"
    >
      <!--
            $ver: v0.1.0
            content영역을 채우는 default slot입니다.
            #The default slot that fills the content area.
            -->
      <slot />
    </div>
    <ur-tooltip v-if="tooltip" :target-id="`${_uid}-tooltip`" bottom mouse-over>
      <pre v-html="tooltip" />
    </ur-tooltip>
  </div>
</template>

<script>
import { MAX_COLUMN } from '../constant';

// ur-form-item은 ur-form-box로 폼 입력 영역을 구성함에 있어 하나의 입력 정보의 영역을 담당합니다.
// 입력 정보의 명칭을 나타내는 label 과 정보의 입력을 위한 component가 위치합니다.
// #The ur-form-item is an ur-form-box, which is responsible for the area of ​​input information in constructing the form input area.
// #The label for the name of input data and the component for input of data are located.
export default {
  name: 'urItem',
  props: {
    // $ver: v0.1.0
    // label영역에 표시될 문자열을 설정합니다.
    // #Set the text to be displayed in the label area.
    label: String,
    labelWidth: {
      type: [Number, String],
      default: 144,
    },
    // $ver: v0.1.0
    // 필수 입력영역이라는 것을 표기하기 위하여 빨간색 * 표시를 label에 부여합니다.
    // left 정렬인 경우 label의 오른쪽에, right 정렬인 경우 label의 왼쪽에 표시됩니다.
    // #Label the red * to indicate that it is a required field.
    // #If it is a left alignment, it is displayed to the right of the label; if it is a right alignment, it is displayed to the left of the label.
    required: Boolean,
    // $ver: v0.1.0
    // label없이 content영역만 사용합니다.
    // #Use only content area without label.
    noLabel: Boolean,
    // $ver: v0.1.0
    // label영역의 좌-우 정렬을 설정합니다.
    // 'left', 'right' 값을 사용할 수 있습니다.
    // #Set left and right alignment of label area.
    // #You can use the values ​​'left' and 'right'.
    labelAlign: {
      type: String,
      validator: val => {
        let lowerVal = val.toLowerCase();
        return ['left', 'center', 'right'].indexOf(lowerVal) !== -1;
      },
      default: 'left',
    },
    contentAlign: {
      type: String,
      validator: val => {
        let lowerVal = val.toLowerCase();
        return ['left', 'center', 'right'].indexOf(lowerVal) !== -1;
      },
      default: 'left',
    },
    labelPosition: {
      type: String,
      validator: val => {
        let lowerVal = val.toLowerCase();
        return ['left', 'top'].indexOf(lowerVal) !== -1;
      },
      default: 'left',
    },
    // $ver: v0.1.0
    // small크기의 <em>ur-form-item</em>을 사용합니다.
    // content영역에 오는 <em>ur-input</em>계열 모든 컴포넌트 크기에도 영향을 줍니다.
    // 해당 컴포넌트들이 각각의 크기설정을 가진 경우 그 값을 우선으로 합니다.
    // #Use small <em> ur-form-item </ em>.
    // #This also affects the size of all components in the <em> ur-input </ em> series that come into the content area.
    // #If each component has its own size setting, the value takes precedence.
    small: Boolean,
    // $ver: v0.1.0
    // $abbr: small
    sm: Boolean,
    // $ver: v0.1.0
    // medium크기의 <em>ur-form-item</em>을 사용합니다.
    // content영역에 오는 <em>ur-input</em>계열 모든 컴포넌트 크기에도 영향을 줍니다.
    // 해당 컴포넌트들이 각각의 크기설정을 가진 경우 그 값을 우선으로 합니다.
    // #Use medium size <em> ur-form-item </ em>.
    // #This also affects the size of all components in the <em> ur-input </ em> series that come into the content area.
    // #If each component has its own size setting, the value takes precedence.
    medium: Boolean,
    // $ver: v0.1.0
    // $abbr: medium
    md: Boolean,
    // $ver: v0.1.2
    // <em>ur-form-item</em>의 content영역인 default slot 및 toggle slot은 내부 세로정렬을 위하여 display:flex가
    // 적용되어 있습니다. 해당 설정은 단순한 세로 정렬을 맞추는데 유용하지만 떄로는 원치않는 동작을 유발하기도 합니다.
    // no-flex 옵션을 통해 display:flex 설정을 없앨 수 있습니다.
    // #The default and toggle slots in the content area of ​​the <em> ur-form-item </ em> have display: flex for internal vertical alignment.
    // #This setting is useful for simple vertical alignment, but it can also cause unwanted behavior.
    // #The no-flex option can be used to eliminate the display: flex setting.
    noFlex: Boolean,

    tooltip: String,
    tooltipIcon: {
      type: String,
      default: 'information'
    },
    tooltipIconType: {
      type: String,
      default: 'line'
    }
    
  },
  data() {
    return {
      default: {
        size: 'medium',
        labelAlign: 'left',
      },
    };
  },
  computed: {
    $_size() {
      if (this.small || this.sm) return 'small';
      if (this.medium || this.md) return 'medium';
      return this.default.size;
    },
    // $_column() {
    //   return parseInt(this.column) || MAX_COLUMN;
    // },
    // itemFlex() {
    //   const itemWidth = (100 / MAX_COLUMN) * this.$_column;
    //   return '0 0 ' + itemWidth + '%';
    // },
    itemStyle() {
      let style = {};
      // style["flex"] = this.itemFlex;
      style['flex-grow'] = '0';
      style['flex-shrink'] = '0';
      // style['width'] = (100 / MAX_COLUMN) * this.$_column + '%';
      // style['height'] = 'auto';

      return style;
    },
    itemClass() {
      let clazz = [];
      if (this.noLabel) clazz.push('ur-form-item--no-label');
      clazz.push('ur-form-item--no-height');
      if (this.required) clazz.push('ur-form-item--required');
      // clazz.push('ur-form-item--' + this.$_size);

      // const [columnLg, columnMd, columnSm] = [parseInt(this.columnLg), parseInt(this.columnMd), parseInt(this.columnSm)];

      // if (columnLg) clazz.push(this.getAdaptiveSizeClassName('lg', columnLg));
      // if (columnMd) clazz.push(this.getAdaptiveSizeClassName('md', columnMd));
      // if (columnSm) clazz.push(this.getAdaptiveSizeClassName('sm', columnSm));

      clazz.push(`ur-form-item__label-pos--${this.labelPosition}`);

      return clazz.join(' ');
    },
    labelStyle() {
      let style = {};
      if (this.labelWidth && this.labelPosition === 'left') {
        style['flex'] = '0 0 auto';
        style['width'] = parseInt(this.labelWidth) + 'px';
      }
      if (this.noLabel) style['display'] = 'none';
      return style;
    },
    labelClass() {
      let clazz = [];
      if (this.labelAlign) {
        clazz.push('ur-form-item__label--' + this.labelAlign);
      }
      return clazz.join(' ');
    },
  },
  methods: {
    getAdaptiveSizeClassName(size, column) {
      return `w-${size}-${column}/${MAX_COLUMN}`;
    }
  },
};
</script>
