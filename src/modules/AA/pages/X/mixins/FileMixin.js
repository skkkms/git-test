const FileMixin = {
  methods: {
    /**
     * 파일 여부 확인
     * @function isFile
     * @param {File} file
     * @description 파일 여부를 확인한다.
     */
    isFile(file = null) {
      if (!file) return false
      if (typeof (file.type) !== 'string') return false
      return true
    },
    /**
     * 이미지 파일 여부 확인
     * @function isImageFile
     * @param {File} file
     * @description 이미지 파일 여부를 확인한다.
     */
    isImageFile(file = null) {
      if (!this.isFile(file)) return false
      return file.type.toLowerCase().startsWith('image')
    },
    /**
     * 비디오 파일 여부 확인
     * @function isVideoFile
     * @param {File} file
     * @description 비디오 파일 여부를 확인한다.
     */
    isVideoFile(file = null) {
      if (!this.isFile(file)) return false
      return file.type.toLowerCase().startsWith('video')
    },
    /**
     * 이미지 너비 및 높이 획득
     * @function getImageWidthAndHeight
     * @param {File} file
     * @description 이미지 너비 및 높이를 획득한다.(호출시 async-await 필요)
     */
    getImageWidthAndHeight(file = null) {
      const reader = new FileReader()
      return new Promise(resolve => {
        reader.onload = frevt => {
          const img = new Image()
          img.src = frevt.target.result
          img.onload = () => {
            const result = { width: img.width, height: img.height }
            resolve(result)
          }
          img.onerror = () => {
            const result = { width: -1, height: -1 }
            resolve(result)
          }
        }
        reader.readAsDataURL(file)
      })
    },
    /**
     * 비디오 너비 및 높이 획득
     * @function getVideoWidthAndHeight
     * @param {File} file
     * @description 비디오 너비 및 높이를 획득한다.(호출시 async-await 필요)
     */
    getVideoWidthAndHeight(file = null) {
      const reader = new FileReader()
      return new Promise(resolve => {
        reader.onload = frevt => {
          const dataUrl = frevt.target.result
          const video = document.createElement('video')
          document.body.appendChild(video)
          video.setAttribute('src', dataUrl)

          video.onloadedmetadata = vdevt => {
            const result = {
              width: vdevt.target.videoWidth,
              height: vdevt.target.videoHeight,
            }
            resolve(result)
          }
          video.onerror = () => {
            const result = { width: -1, height: -1 }
            resolve(result)
          }
        }
        reader.readAsDataURL(file)
      })
    },
    /**
     * 서명된 URL 획득
     * @function getSignedUrl
     * @param {String} pageId
     * @param {String} fileUrl
     * @description 서명된 URL을 획득한다.(호출시 async-await 필요)
     */
    getSignedUrl(pageId, fileUrl) {
      return new Promise(resolve => {
        const formData = new FormData()
        formData.append('fileUrl', fileUrl)
        http.request(pageId, 'DTS_AAX_00015', {
          data: formData,
        }).then(res => {
          resolve(res.data.signedUrl || null)
        })
      })
    },
  },
}

export default FileMixin
