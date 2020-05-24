// JQuery.extend() 作用：用域拓展现有的对象

// 浅复制的实现
// $ = {
//   extend: function(target, options) {
//     for(name in options) {
//       target(name) = options[name]
//     }
//     return target
//   }
// }

// 深复制的实现,当复制的对象是数组或者对象时
let $ = {
  extend: function(deep, target, options) {
    for(name in options) {
      let value = options[name]
      let type = typeof value
      if(deep && value instanceof Array) {
        target[name] = this.extend(value)
      }else if(deep && value instanceof Object){
        target[name] = this.extend(value)
      }
      else{
        target[name] = value
      }
    }

    return target
  }
}

module.exports = {
  $: $
}
// export var firstName = 'Michael';
// export var lastName = 'Jackson';
// export var year = 1958;
// // export {$}