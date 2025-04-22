import Constants from '~system/Constants'

const VideoEventMixin = {
  methods: {
    getVideoEventSource(pageId, partcpSeq, fileSeq) {
      const dataServiceId = 'DTS_AAH_00024'

      const { service, state } = http.getServiceAndState(pageId, dataServiceId)
      if (state === Constants.STATE_DATA_SERVICE_NO_AUTH
        || state === Constants.STATE_DATA_SERVICE_BLOCK) {
        utils.toast(`${dataServiceId} - ${utils.getMessageById('MSG_ALT_NOT_ALLOWED_REQ')}`)
        return null
      }

      let source = service[Constants.KEY_DATA_SERVICE_URL]
      source += `?pageId=${pageId}&dataServiceId=${dataServiceId}`
      source += `&partcpSeq=${partcpSeq}&fileSeq=${fileSeq}`
      source += `&Authorization=${localStorage.getItem('accessToken')}`

      return source
    },
    downloadVideoEventFile(pageId, partcpSeq, fileSeq) {
      const dataServiceId = 'DTS_AAH_00023'

      const { service, state } = http.getServiceAndState(pageId, dataServiceId)
      if (state === Constants.STATE_DATA_SERVICE_NO_AUTH
        || state === Constants.STATE_DATA_SERVICE_BLOCK) {
        utils.toast(`${dataServiceId} - ${utils.getMessageById('MSG_ALT_NOT_ALLOWED_REQ')}`)
        return false
      }

      let action = service[Constants.KEY_DATA_SERVICE_URL]
      action = `${action}?pageId=${pageId}&dataServiceId=${dataServiceId}`

      // form
      const form = document.createElement('form')
      form.setAttribute('method', 'post')
      form.setAttribute('action', action)
      document.body.appendChild(form)

      // input : Authorization
      const inputAuth = document.createElement('input')
      inputAuth.setAttribute('type', 'hidden')
      inputAuth.setAttribute('name', 'Authorization')
      inputAuth.setAttribute('value', localStorage.getItem('accessToken'))
      form.appendChild(inputAuth)

      // input : partcpSeq
      const inputPartcpSeq = document.createElement('input')
      inputPartcpSeq.setAttribute('type', 'hidden')
      inputPartcpSeq.setAttribute('name', 'partcpSeq')
      inputPartcpSeq.setAttribute('value', partcpSeq)
      form.appendChild(inputPartcpSeq)

      // input : fileSeq
      const inputFileSeq = document.createElement('input')
      inputFileSeq.setAttribute('type', 'hidden')
      inputFileSeq.setAttribute('name', 'fileSeq')
      inputFileSeq.setAttribute('value', fileSeq)
      form.appendChild(inputFileSeq)

      form.submit()

      inputFileSeq.remove()
      inputPartcpSeq.remove()
      inputAuth.remove()
      form.remove()

      return true
    },
  },
}

export default VideoEventMixin
