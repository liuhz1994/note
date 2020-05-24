// 1.定义一个售楼处(发布者)
let salesOffices = {}
// 2.缓存列表
salesOffices.clientList = []
// 3.增加订阅者
salesOffices.listen = function(fn){
  this.clientList.push(fn)
}
// 4.发布消息
salesOffices.trigger = function(){
  for(let i=0; i<this.clientList.length; i++) {
    let fn = this.clientList[i]
    fn.apply(this,arguments)
  }
}

// 测试
salesOffices.listen(function(price, squareMeter) {
  console.log("售价：" + price, "面积：" + squareMeter)
})
salesOffices.listen(function(price, squareMeter) {
  console.log("售价：" + price, "面积：" + squareMeter)
})

salesOffices.trigger(2000000, 110)
salesOffices.trigger(1800000, 90)