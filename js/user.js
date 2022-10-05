class FieldValidate {
  constructor(txtId, validateFn) {
    this.input = $('#' + txtId)
    this.p = this.input.nextElementSibling
    this.validateFn = validateFn
    this.input.onblur = () => {
      this.validate()
    }
  }

  async validate() {
    const err = await this.validateFn(this.input.value)
    if (err) {
      this.p.innerText = err
      return false
    }
    else {
      this.p.innerText = ''
      return true
    }
  }

  static async validate(...validators) {
    const proms = validators.map(v => v.validate())
    const results = await Promise.all(proms)
    return results.every(r => r)
  }
}
