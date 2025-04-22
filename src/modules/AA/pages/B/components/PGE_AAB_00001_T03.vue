<template>
  <div>
    <div class="mrB20" />
    <div class="comm_scr_wrap">
      <div class="row">
        <!-- [검색조건] 시설카테고리 -->
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('시설카테고리')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="selectFacilKind"
            :selected="frame0.selectData.COD_IA_EL_FACIL_KIND"
            codeId="COD_IA_EL_FACIL_KIND"
            defaultOption="all"
            :initialSelectedIndex="0"
            class="width60"
          />
        </div>
        <!-- [검색조건] Zone 구분 -->
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('Zone 구분')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="selectZone"
            :selected="frame0.selectData.COD_IA_EL_ZONE_TYPE"
            codeId="COD_IA_EL_ZONE_TYPE"
            defaultOption="all"
            :initialSelectedIndex="0"
            class="width60"
          />
        </div>
      </div>
      <div class="row">
        <!-- [검색조건] 시설 -->
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('시설')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="frame0.searchText"
            maxlength="50"
            @keyup="onKeyUpInput"
            @keyup.enter="onClickSearch"
          />
        </div>
      </div>
      <div class="btn_wrap">
        <!-- [검색조건: 버튼] 초기화 -->
        <sui-button
          type="button"
          class="comm_btn_Reset"
          @click="onClickReset"
        >
          {{ $t("초기화") }}
        </sui-button>
        <!-- [검색조건: 버튼] 검색 -->
        <sui-button
          type="button"
          class="comm_btn_Scr"
          @click="onClickSearch"
        >
          {{ $t("검색") }}
        </sui-button>
      </div>
    </div>

    <!-- 데이터 그리드 -->
    <sui-s-grid
      ref="mainGrid"
      :headers="defaultGridData.columns"
      :data-source="dsDataEL"
      :options="options"
      :showRowsPerPageControl="false"
      @grid:selected="onSelectRow"
    >
    </sui-s-grid>
    <div class="comm_btn_wrap">
      <!-- [하단: 버튼] 삭제 -->
      <sui-button
        v-permission:delete="this.$options.name"
        type="button"
        class="comm_btn_border"
        @click="onClickDelete"
      > {{ $t("MSG_BTN_DEL") }}
      </sui-button>
      <!-- [하단: 버튼] 신규 등록 -->
      <sui-button
        v-permission:create="this.$options.name"
        type="button"
        class="comm_btn_solid"
        @click="onClickRegist"
      > {{ $t("신규 등록") }}
      </sui-button>
    </div>
  </div>
</div>
</template>

<script>
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_AAB_00001', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      frame0: {
        selectData: {
          COD_IA_EL_FACIL_KIND: {
            label: '',
            key: '',
          },
          COD_IA_EL_ZONE_TYPE: {
            label: '',
            key: '',
          },
        },
        searchText: '',
      },
      gridList: [],
      localdata0: [],
      dsDataEL: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
        multiSelect: true,
      },
      defaultGridData: {
        dataSource: {
          localdata: [],
          datatype: 'json',
          editable: false,
          selectionmode: 'singlecell',
          editmode: 'click',
        },
        altrows: true,
        showcolumnlines: false,
        showcolumnheaderlines: false,
      },
    };
  },
  created() {
    this.defaultGridData.columns = [
      {
        text: this.$t("시설ID"),
        value: 'facilId',
        width: 100,
      },
      {
        text: this.$t("시설명"),
        value: 'facilName',
        width: 200,
      },
      {
        text: this.$t("시설 카테고리"),
        value: 'facilKindNms',
        width: 300,
      },
      {
        text: this.$t("Zone 구분"),
        value: 'zoneNm',
        width: 150,
      },
      {
        text: this.$t("조회순서"),
        value: 'viewSeq',
        width: 100,
      },
      {
        text: this.$t("APP 노출여부"),
        value: 'appViewYn',
        width: 100,
      },
      {
        text: this.$t("PC 노출여부"),
        value: 'pcViewYn',
        width: 100,
      },
      {
        text: this.$t("Mobile 노출여부"),
        value: 'mobileViewYn',
        width: 110,
      },
      {
        text: this.$t("D/S 노출여부"),
        value: 'dsViewYn',
        width: 100,
      },
      {
        text: this.$t("삭제여부"),
        value: 'delYn',
        width: 100,
      },
      {
        text: this.$t("가상대기 여부"),
        value: 'vlineWaitYn',
        width: 100,
      },
      {
        text: this.$t("대기시간 POPS시설"),
        value: 'waitTimeFacil2Nm',
        width: 150,
      },
      {
        text: this.$t("Q-PASS 전광판시설"),
        value: 'qpassFacilNm',
        width: 150,
      },
      {
        text: this.$t("입장유효분(시작)"),
        value: 'enterValidFromMinute',
        width: 120,
      },
      {
        text: this.$t("입장유효분(종료)"),
        value: 'enterValidToMinute',
        width: 120,
      },
      {
        text: this.$t("입장유효분(종료)"),
        value: 'enterValidToMinute',
        width: 120,
      },
      {
        text: this.$t("가상대기 탑승간격"),
        value: 'vlineIntervalTime',
        width: 130,
      },
      {
        text: this.$t("가상대기 OHRC"),
        value: 'vlineOhrcVal',
        width: 100,
      },
    ];
  },
  mounted() {
  },
  methods: {
    /**
     * 초기화 버튼 클릭시
     */
    onClickReset() {
      this.$refs.selectFacilKind.reset();
      this.$refs.selectZone.reset();
      this.frame0.searchText = '';
    },
    /**
     * 검색 버튼 클릭시
     */
    onClickSearch() {
      const codeValue = this.frame0.selectData;

      const queryParams = {
      };
      http.request(this.$options.name, 'DTS_AAB_00001', {
        query: queryParams,
      }).then(res => {
        this.dsDataEL.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
  },
};
</script>
<style scoped>
</style>
