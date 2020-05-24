// 给不同对象添加 发布订阅模式
// 同时添加取消订阅事件
let event = {
  clientList: {},
  listen: function(key, fn) {
    if(!this.clientList[key]){
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function() {
    let key = Array.prototype.shift.call(arguments)
    let fns = this.clientList[key]
    if(!fns) {
      return
    }
    // console.log(fns)
    for(let i=0, fn; fn = fns[i++]; ){
      fn.apply(this, arguments)
    }
  },
  unListen: function(key, fn) {
    let fns = this.clientList[key]

    // 当不存在时 则返回
    if(!fns){
      return
    }

    // 如果没有传入具体回调函数 则清空所有
    if(!fn) {
      fns.length = 0
    }

    // 获取到需要删除的回调函数的索引
    let index = fns.findIndex((clientFn) => clientFn === fn)
    fns.splice(index, 1)
  },
}

event.initEvent = function (obj) {
  for(var key in event) {

    if(key === "initEvent") {
      continue
    }

    obj[key] = event[key]
  }
}

// 测试
let salesOffice = {}
event.initEvent(salesOffice);

// 小明
let xmFn = function(price){
  // console.log("小明售价：" + price)
}
salesOffice.listen("80", xmFn)

// 小红
salesOffice.listen("80", function(price){
  // console.log("小红售价：" + price)
})

salesOffice.unListen("80", xmFn)
// 发布
salesOffice.trigger("80", "100w")

module.exports = {event}