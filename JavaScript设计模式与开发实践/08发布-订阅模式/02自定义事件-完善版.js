/**
 * 使用简单版，每个订阅者都收到了所有消息，应该根据订阅者的订阅消息进行推送
 */

// 1.定义一个售楼处(发布者)
let salesOffices = {}
// 2.缓存对象
salesOffices.clientList = {}
// 3.增加订阅者 增加一个key
salesOffices.listen = function(key, fn){
  if(!this.clientList[key]) {
    this.clientList[key] = []
  }
  this.clientList[key].push(fn)
}
// 4.发布消息
salesOffices.trigger = function(){

  // 获取第一个参数
  let key = Array.prototype.shift.call(arguments)
  let msg = this.clientList[key]
  if(!msg){
    return
  }

  for(let i=0; i<msg.length; i++) {
    let fn = msg[i]
    fn.apply(this,arguments)
  }
}

// 测试
salesOffices.listen('90', function(price) {
  console.log("售价：" + price)
})
salesOffices.listen('110', function(price) {
  console.log("售价：" + price)
})

salesOffices.trigger('110', 2000000)
salesOffices.trigger('90', 1800000)