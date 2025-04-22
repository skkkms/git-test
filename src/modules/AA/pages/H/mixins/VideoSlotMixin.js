const VideoSlotMixin = {
  methods: {
    /**
     * @function getTimeSlotAndCapaComponentList
     * @param {VueComponent} that
     * @description 타임슬롯, CAPA 컴포넌트 목록을 return한다.
     * [컴포넌트 인식 범위]
     * 1. 타임슬롯: timeSlot, timeSlot1 ~ timeSlot10
     * 2. CAPA: timeCapa, timeCapa1 ~ timeCapa10
     */
    isValidTimeSlotAndCapa(that) {
      const componentList = this.getTimeSlotAndCapaComponentList(that)
      for (let i = 0; i < componentList.length; i += 1) {
        if (!this.$rules.validate(componentList.at(i))) {
          return false
        }
      }
      return true
    },
    /**
     * @function getTimeSlotAndCapaComponentList
     * @param {VueComponent} component
     * @description 타임슬롯, CAPA 컴포넌트 목록을 return한다.
     * [컴포넌트 인식 범위]
     * 1. ref
     *  - 타임슬롯: timeSlot, timeSlot1 ~ timeSlot10
     *  - CAPA: timeCapa, timeCapa1 ~ timeCapa10
     * 2. type
     *  - VueComponent, [...VueComponent]
     */
    getTimeSlotAndCapaComponentList(component) {
      return Object.entries(component.$refs)
        .filter(item => {
          const isValidRef = objName => /^(timeSlot|timeCapa){1}([1-9]{1}|10)?$/.test(objName)
          const isValidType = obj => {
            // 1. Empty check
            if (utils.isEmpty(obj)) {
              return false
            }

            // 2. Type check: local 에서만 검사(build 후에는 체크 불가)
            if (process.env.VUE_APP_WAS_ENV === 'local') {
              if (obj instanceof Array) {
                for (let i = 0; i < obj.length; i += 1) {
                  if (obj[i].constructor.name !== 'VueComponent') {
                    return false
                  }
                }
              } else if (obj.constructor.name !== 'VueComponent') {
                return false
              }
            }

            return true
          }
          return isValidRef(item.at(0)) && isValidType(item.at(1))
        })
        .map(item => item.at(1))
    },
  },
}

export default VideoSlotMixin
