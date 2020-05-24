let Event = (function(){

  let clientList = {};
  let listen = function(key, fn){
    if(!clientList[key]) {
      clientList[key] = []
    }
    clientList[key].push(fn)
  }

  let trigger = function() {
    let key = Array.prototype.shift.call(arguments)
    let fns = clientList[key]
    if(!fns || fns.length === 0){
      return false
    }

    for(let i = 0, fn; fn = fns[i++]; ){
      fn.apply(this, arguments)
    }
  }

  let remove = function(key, fn) {
    let fns = clientList[key]
    if(!fns) {
      return false;
    }
    if(!fn) {
      fns && (fns.length = 0)
      return
    }

    let index = fns.findIndex((_fn) => _fn === fn);
    fns.splice(index, 1)
  }

  return{
    listen: listen,
    trigger: trigger,
    remove: remove
  }
})()
Event.listen("80", function(data){
  console.log("80: " + data)
})
Event.trigger("80", "100W")