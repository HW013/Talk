const loginIdValidator = new FieldValidate('txtLoginId', async function (val) {
  if (!val) {
    return '请填写账号'
  }
})

const LoginPwdValidator = new FieldValidate('txtLoginPwd', async function (val) {
  if (!val) {
    return '请输入密码'
  }
})

const userForm = $('.user-form')
userForm.onsubmit = async function(e) {
  e.preventDefault()
  const result = await FieldValidate.validate(
    loginIdValidator,
    LoginPwdValidator,

  )
  if(!result) {
    return
  }
  const formData = new FormData(userForm)
  const data = Object.fromEntries(formData.entries())
  const resp = await API.login(data)
  if(resp.code === 0) {
    alert("登录成功")
    location.href = './index.html'
  } else {
    loginIdValidator.p.innerText = "账号或密码错误"
    LoginPwdValidator.input.value = ''
  }
}