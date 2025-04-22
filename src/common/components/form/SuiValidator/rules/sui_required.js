export default {

  getMessage: (field) => `The ${field} field is required.`,
  validate: function (v, o) {
    let tempVar = o || v

    if (tempVar && tempVar.length > 0) {
      for (var i = 0; i < tempVar.length; i++) {
        if (tempVar[i].length === 0) { return false }
      }
    }
    return true
  }
}
