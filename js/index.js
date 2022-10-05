(async function () {
  const resp = await API.profile()
  const user = resp.data
  if (!user) {
    alert("未登录或登录状态已过期")
    location.href = './login.html'
    return
  }
  const doms = {
    aside: {
      loginId: $('#loginId'),
      nickname: $('#nickname')
    },
    close: $('.close'),
    chatContainer: $('.chat-container'),
    txtMsg: $('#txtMsg'),
    msgContainer: $('.msg-container')
  }


  setUserinfo()

  doms.close.onclick = function () {
    API.loginOut()
    location.href = './login.html'
  }

  loadHistroy()
  async function loadHistroy() {
    const resp = await API.getHistory()
    console.log(resp)
    for (const item of resp.data) {
      addChat(item)
    }
    scrollBottom()
  }


  function setUserinfo() {
    doms.aside.loginId.innerText = user.loginId
    doms.aside.nickname.innerText = user.nickname
  }

  function addChat(chatInfo) {
    const div = $$$('div')
    div.classList.add('chat-item')
    if(chatInfo.from) {
      div.classList.add('me')
    }
    const img = $$$('img')
    img.className = "chat-avatar"
    img.src = chatInfo.from ? './asset/avatar.png' : "./asset/robot-avatar.jpg"
    const content = $$$('div')
    content.className = "chat-content"
    content.innerText = chatInfo.content
    const date = $$$('div')
    date.className = "chat-date"
    date.innerText = formatDate(chatInfo.createdAt)
    div.appendChild(img)
    div.appendChild(content)
    div.appendChild(date)
    doms.chatContainer.appendChild(div)
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2,'0')
    const day = date.getDate().toString().padStart(2,'0')
    const hour = date.getHours().toString().padStart(2,'0')
    const minute = date.getMinutes().toString().padStart(2,'0')
    const second = date.getSeconds().toString().padStart(2,'0')
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
  /* 
  content: "你好啊"
  createdAt: 1664633765325
  from: "pangdeng"
  to: null
  */

  function scrollBottom() {
    console.log(doms.chatContainer.scrollHeight)
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
  }


  async function sendChat() {
    const content = doms.txtMsg.value.trim()
    if(!content) {
      return
    }

    addChat({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content
    })
    doms.txtMsg.value = ''
    scrollBottom()
    const resp = await API.sendChat(content)
    addChat({
      from: null,
      to: user.loginId,
      ...resp.data
    })
    scrollBottom()
  }

  doms.msgContainer.onsubmit = function(e) {
    e.preventDefault()
    sendChat()
  }
  

  addChat(
    {
      content: "你好啊",
      createdAt: 1664633765325,
      from: "pangdeng",
      to: null
    }
  )

})()