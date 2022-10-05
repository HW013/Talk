const loginIdValidator = new FieldValidate('txtLoginId', async function (val) {
  if (!val) {
    return '请填写账号'
  }
  const resp = await API.exists(val)
  if (resp.data) {
    return "该账号已被占用"
  }
})

const nicknameValidator = new FieldValidate('txtNickname', async function (val) {
  if (!val) {
    return '请填写昵称'
  }
})
const LoginPwdValidator = new FieldValidate('txtLoginPwd', async function (val) {
  if (!val) {
    return '请输入密码'
  }
})

const LoginPwdConfirmValidator = new FieldValidate('txtLoginPwdConfirm', async function (val) {
  if (!val) {
    return '请输入确认密码'
  }
  if (val !== LoginPwdValidator.input.value) {
    return '两次密码不一致'
  }
})

const userForm = $('.user-form')
userForm.onsubmit = async function(e) {
  e.preventDefault()
  const result = await FieldValidate.validate(
    loginIdValidator,
    nicknameValidator,
    LoginPwdValidator,
    LoginPwdConfirmValidator
  )
  if(!result) {
    return
  }
  const formData = new FormData(userForm)
  const data = Object.fromEntries(formData.entries())
  const resp = await API.reg(data)
  if(resp.code === 0) {
    alert("注册成功")
    location.href = './login.html'
  }
}