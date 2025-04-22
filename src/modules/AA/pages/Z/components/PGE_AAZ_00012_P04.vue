<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        파도풀 관리
      </div>
    </template>
    <template>
      <div class="modal-body">
        <div class="comm_title_wrap mt35">
          <h4>
            실외 파도풀
          </h4>
        </div>
        <ur-data-grid
          ref="grid01"
          :headers="columnsP1T1"
          :data-source="listP1T1"
          :options="options"
          :data-set-options="{id: 'id'}"
        />
        <ur-data-grid
          ref="grid02"
          :headers="columnsP1T2"
          :data-source="listP1T2"
          :options="options"
          :data-set-options="{id: 'id'}"
        />
        <ur-data-grid
          ref="grid03"
          :headers="columnsP1T3"
          :data-source="listP1T3"
          :options="options"
          :data-set-options="{id: 'id'}"
        />
        <div class="comm_title_wrap mt35">
          <h4>
            실내 파도풀
          </h4>
        </div>
        <ur-data-grid
          ref="grid04"
          :headers="columnsP1T4"
          :data-source="listP1T4"
          :options="options"
          :data-set-options="{id: 'id'}"
        />
        <ur-data-grid
          ref="grid05"
          :headers="columnsP1T5"
          :data-source="listP1T5"
          :options="options"
          :data-set-options="{id: 'id'}"
        />
        <ur-data-grid
          ref="grid06"
          :headers="columnsP1T6"
          :data-source="listP1T6"
          :options="options"
          :data-set-options="{id: 'id'}"
        />

        <div class="comm_btn_wrap bt1">
          <div class="right_box mt10">
            <ur-button>
              닫기
            </ur-button>
            <ur-button
              color="violet"
            >
              저장
            </ur-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PGE_AAZ_00012_P04', // eslint-disable-line vue/name-property-casing
  // components: {
  // },
  data() {
    return {
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      columnsP1T1: [
        {
          value: 'str1',
          text: '정각~10분',
          component: {
            template: '<div><ur-radio v-model="R1" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },
        {
          value: 'str2',
          text: '10~20분',
          component: {
            template: '<div><ur-radio v-model="R2" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },
        {
          value: 'str3',
          text: '20~30분',
          component: {
            template: '<div><ur-radio v-model="R3" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },
        {
          value: 'str4',
          text: '30~40분',
          component: {
            template: '<div><ur-radio v-model="R4" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },
        {
          value: 'str5',
          text: '40~50분',
          component: {
            template: '<div><ur-radio v-model="R5" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },
        {
          value: 'str6',
          text: '50~정각',
          component: {
            template: '<div><ur-radio v-model="R6" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },

      ],

      listP1T1: [
        {
          str1: '', str2: '', str3: '', str4: '', str5: '', str6: '',
        },

      ],
      columnsP1T2: [
        {
          value: 'str1',
          text: '정각~10분',
          component: {
            template: '<div><ur-radio v-model="R1" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },
        {
          value: 'str2',
          text: '10~20분',
          component: {
            template: '<div><ur-radio v-model="R2" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },
        {
          value: 'str3',
          text: '20~30분',
          component: {
            template: '<div><ur-radio v-model="R3" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },
        {
          value: 'str4',
          text: '30~40분',
          component: {
            template: '<div><ur-radio v-model="R4" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },
        {
          value: 'str5',
          text: '40~50분',
          component: {
            template: '<div><ur-radio v-model="R5" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },
        {
          value: 'str6',
          text: '50~정각',
          component: {
            template: '<div><ur-radio v-model="R6" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },

      ],

      listP1T2: [
        {
          str1: '', str2: '', str3: '', str4: '', str5: '', str6: '',
        },

      ],
      columnsP1T3: [
        {
          value: 'str1',
          text: '정각~10분',
          component: {
            template: '<div><ur-radio v-model="R1" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },
        {
          value: 'str2',
          text: '10~20분',
          component: {
            template: '<div><ur-radio v-model="R2" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },
        {
          value: 'str3',
          text: '20~30분',
          component: {
            template: '<div><ur-radio v-model="R3" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },
        {
          value: 'str4',
          text: '30~40분',
          component: {
            template: '<div><ur-radio v-model="R4" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },
        {
          value: 'str5',
          text: '40~50분',
          component: {
            template: '<div><ur-radio v-model="R5" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },
        {
          value: 'str6',
          text: '50~정각',
          component: {
            template: '<div><ur-radio v-model="R6" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },

      ],

      listP1T3: [
        {
          str1: '', str2: '', str3: '', str4: '', str5: '', str6: '',
        },

      ],
      columnsP1T4: [
        {
          value: 'str1',
          text: '정각~10분',
          component: {
            template: '<div><ur-radio v-model="R1" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },
        {
          value: 'str2',
          text: '10~20분',
          component: {
            template: '<div><ur-radio v-model="R2" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },
        {
          value: 'str3',
          text: '20~30분',
          component: {
            template: '<div><ur-radio v-model="R3" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },
        {
          value: 'str4',
          text: '30~40분',
          component: {
            template: '<div><ur-radio v-model="R4" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },
        {
          value: 'str5',
          text: '40~50분',
          component: {
            template: '<div><ur-radio v-model="R5" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },
        {
          value: 'str6',
          text: '50~정각',
          component: {
            template: '<div><ur-radio v-model="R6" value="Radio 01" sm> 높음 </ur-radio></div>',
          },
        },

      ],

      listP1T4: [
        {
          str1: '', str2: '', str3: '', str4: '', str5: '', str6: '',
        },

      ],
      columnsP1T5: [
        {
          value: 'str1',
          text: '정각~10분',
          component: {
            template: '<div><ur-radio v-model="R1" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },
        {
          value: 'str2',
          text: '10~20분',
          component: {
            template: '<div><ur-radio v-model="R2" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },
        {
          value: 'str3',
          text: '20~30분',
          component: {
            template: '<div><ur-radio v-model="R3" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },
        {
          value: 'str4',
          text: '30~40분',
          component: {
            template: '<div><ur-radio v-model="R4" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },
        {
          value: 'str5',
          text: '40~50분',
          component: {
            template: '<div><ur-radio v-model="R5" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },
        {
          value: 'str6',
          text: '50~정각',
          component: {
            template: '<div><ur-radio v-model="R6" value="Radio 02" sm> 낮음 </ur-radio></div>',
          },
        },

      ],

      listP1T5: [
        {
          str1: '', str2: '', str3: '', str4: '', str5: '', str6: '',
        },

      ],
      columnsP1T6: [
        {
          value: 'str1',
          text: '정각~10분',
          component: {
            template: '<div><ur-radio v-model="R1" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },
        {
          value: 'str2',
          text: '10~20분',
          component: {
            template: '<div><ur-radio v-model="R2" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },
        {
          value: 'str3',
          text: '20~30분',
          component: {
            template: '<div><ur-radio v-model="R3" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },
        {
          value: 'str4',
          text: '30~40분',
          component: {
            template: '<div><ur-radio v-model="R4" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },
        {
          value: 'str5',
          text: '40~50분',
          component: {
            template: '<div><ur-radio v-model="R5" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },
        {
          value: 'str6',
          text: '50~정각',
          component: {
            template: '<div><ur-radio v-model="R6" value="Radio 03" sm> 휴식 </ur-radio></div>',
          },
        },

      ],

      listP1T6: [
        {
          str1: '', str2: '', str3: '', str4: '', str5: '', str6: '',
        },

      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능


  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
}
</script>
<style scoped>
</style>
