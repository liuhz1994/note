let $ = require('./03-延伸JQuery[extend].js')
// import {$} from './03-延伸JQuery[extend].js'
// import { firstName, lastName, year } from './03-延伸JQuery[extend].js';
// ORM 对象关系映射

// 原型继承 
if(typeof Object.create != "function"){
  Object.create = function(o){
    function F(){}
    F.prototype = o;
    return new F()
  }
}

// 构建Model对象，用域创建新模型和实例
let Model = {
  inherited: function(){}, // 继承
  created: function(){},
  prototype: {
    init: function(){}
  },
  // 返回一个新对象
  create: function(){
    let object = Object.create(this)
    object.parent = this;
    object.prototype = object.fn = Object.create(this.prototype)
    object.created()
    this.inherited(object)
    return object
  },
  init: function() {
    let instance = Object.create(this.prototype)
    instance.parent = this;
    instance.init.apply(instance, arguments)
    return instance
  }
}

let User = Model.create()
let user = User.init()

console.log(firstName)