// 网站登录成功后，会刷新 header头部、nav导航、购物车等信息。
let {event} = require("./03发布订阅模式通用实现")

let loginOperation = function() {
  setTimeout(() => {
    login.trigger("success", {user: 'lhz'})
    login.trigger("80", {user: 'lhz'})
    console.log("获取到数据")
  }, 1000);
}

let login = function(){
  return {
  
  }
}()

event.initEvent(login)

let header = function() {

  login.listen('success', function(data){
    header.setHeader(data)
  })

  return {
    setHeader(data) {
      console.log('header: ' + data.user)
    }
  }
}()

event.initEvent(header)

console.log("login", login)
console.log("header", header)

let nav = function() {

}()



loginOperation()