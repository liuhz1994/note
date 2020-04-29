
// 1.工厂模式
function createPerson(name, age) {
  let person = new Object()
  person.name = name
  person.age = age

  return person
}

// let person = createPerson('tom', 26)
// 不足：无法知道对象类型
// console.log('person', person)

// 2.构造函数模式
function Person(name, age) {
  this.name = name
  this.age = age

  this.sayHi = function(){
    console.log('hello i am ' + this.name)
  }
} 

/**
 * 经历步骤：
 * 1. 创建一个新对象
 * 2. 将构造函数的作用域赋给新对象
 * 3. 执行构造函数内的代码
 * 4. 没有其他return 返回该对象
 */
// 不足： 相同的函数在不同的实例中创建多次，内存浪费
// let person = new Person('tom', 26)
// person.sayHi()
// console.log(person instanceof Person)
// console.log(person.constructor === Person)

// 3.原型模式
function Person() {

}
Person.prototype.name = 'tom'
Person.prototype.age = '26'
Person.prototype.sayHi = function() {
  console.log('hello i am '+ this.name)
}

// 不足： 共享引用类型容易被其他实例修改
// let person = new Person()
// console.log(person.sayHi())
// console.log(Person.prototype.constructor)
// console.log(person.__proto__)

// 4.组合使用构造函数模型和原型模式
function Person(name, age, friends) {
  this.name = name
  this.age = age
  this.friends = friends
}

Person.prototype = {
  constructor: Person,
  sayHi: function() {
    console.log('hello i am '+ this.name + ', myfriends: '+ this.friends)
  }
}

// let person1 = new Person('tom', 26, ['jake', 'lili'])
// let person2 = new Person('ben', 26, ['jake', 'david'])

// person1.sayHi()
// person2.sayHi()

// person1.friends = ['tom']

// person1.sayHi()
// person2.sayHi()

// 5.动态原型模式
function Person(name, age, friends) {
  console.log(this,Person)
  debugger
  this.name = name
  this.age = age
  this.friends = friends

  console.log(this)

  if(typeof this.sayHi !== "function"){

    console.log('构建person.prototype')

    
    Person.prototype.sayHi = function() {
      console.log('hello i am '+ this.name + ', myfriends: '+ this.friends)
    }

    // 不能使用字面量形式
    // Person.prototype = {
    //   constructor: Person,
    //   sayHi: function() {
    //     console.log('hello i am '+ this.name + ', myfriends: '+ this.friends)
    //   }
    // }
  }
}

// let person1 = new Person('tom', 26, ['jake', 'lili'])
// let person2 = new Person('ben', 26, ['jake', 'lili'])

// person1.sayHi()
// person2.sayHi()

// 6.寄生构造函数模式
function Person(name, age) {
  let p = new Object()
  p.name = name
  p.age = age
  p.sayHi = function() {
    console.log('i am' + this.nme)
  }
  return p
}

// 应用： 为数组创建额外方法
function ArrayEnhance() {
  let array = new Array()
  array.push.apply(array, arguments)
  array.toPipedString = function(){
    return array.join("|")
  }
  return array
}

// let arrayEnhance = new ArrayEnhance(1,2,3)
// console.log(arrayEnhance.toPipedString())

// // 不足：无法用 instanceof 判断类型
// console.log(arrayEnhance instanceof ArrayEnhance)

// 7 稳妥构造函数模式 安全
function Person(name, age) {
  let p = new Object()
  // p.name = name
  // p.age = age
  
  p.showName = function() {
    console.log(name)
  }

  return p
}

let person = new Person('tom', 26)
person.showName()
console.log(person)