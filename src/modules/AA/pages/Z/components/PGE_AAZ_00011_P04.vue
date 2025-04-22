<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        대기 시간 이력 조회
      </div>
    </template>
    <template>
      <div class="modal-body">
        <ur-form-box toggleable>
          <ur-form-item
            label="영업일자"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            2022-10-13
          </ur-form-item>
          <ur-form-item
            label="시설명"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            T익스프레스
          </ur-form-item>
        </ur-form-box>
        <ur-tree-grid
          ref="grid"
          :headers="columns"
          :options="options"
          :data-source="list"
          :data-set-options="{id: 'id'}"
          class="mt45"
        >
          <template #summary="{data}">
            <div class="my-summary">
              <div class="my-summary__value">
                <div><label>일 평균 대기시간 (분)</label> : {{ getAvg(data) }}</div>
              </div>
            </div>
          </template>
        </ur-tree-grid>
        <div class="comm_btn_wrap bt1">
          <div class="right_box mt10">
            <ur-button>
              닫기
            </ur-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PGE_AAZ_00011_P04', // eslint-disable-line vue/name-property-casing
  // components: {
  // },
  data() {
    return {
      size: 10,
      dataSet: new this.$ur.grid.DataSet(),
      options: {
        resizableColumn: false,
        infinityScroll: true,
        height: 300,
      },
      columns: [
        {
          value: 'str1', text: '대기시간(분)', width: 120,
        },
        {
          value: 'str2', text: '운영상태', width: 475, align: 'center',
        },
        {
          value: 'str3', text: '등록일시', width: 200,
        },
        {
          value: 'str4', text: '등록자',
        },

      ],

      list: [
        {
          str1: '10', str2: '예약마감', str3: '2022-10-13:16:48:31', str4: 'BJ123',
        },
        {
          str1: '20', str2: '예약마감', str3: '2022-10-13:16:48:31', str4: 'BJ123',
        },
        {
          str1: '30', str2: '예약가능', str3: '2022-10-13:16:48:31', str4: 'BJ123',
        },
        {
          str1: '30', str2: '예약가능', str3: '2022-10-13:16:48:31', str4: 'BJ123',
        },
        {
          str1: '30', str2: '금일종료', str3: '2022-10-13:16:48:31', str4: 'BJ123',
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
    this.buildData()
  },
  methods: {
    // buildData() {
    //   this.$refs.grid.setData(makeTreeData(this.size, 3, 'rows'), 'rows')
    // },


    getAvg(arr) {
      // ////////////////////2023-02-17 : 커스텀 script 작성 : 주석 풀면 평균 값 작동//////////// //

      // let sum = 0
      // for (let i = 0; i < arr.length; i += 1) {
      //   // console.log(arr[i].str1)
      //   const str = arr[i].str1
      //   const time = Number(str)
      //   sum += time
      //   // return arr[i].str1
      //   // const time = []
      //   // time.push(arr[i].str1)
      //   // return time
      // }
      // console.log(sum / arr.length)
      // return sum / arr.length

      // /////////////////2023-02-17 : 커스텀 script 작성 : 주석 풀면 평균 값 작동///////////// //
    },


    // 모달
    // closeModal() {},
  },
}
</script>
<style scoped>
</style>
