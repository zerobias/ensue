'use strict'

const flatten = require('array-flatten')
const cReducer = (res, func) => func(res)

const subSwitch = (funcs, args) => {
  let res
  switch (args.length) {
    case 0: res = funcs[0](); break
    case 1: res = funcs[0](args[0]); break
    case 2: res = funcs[0](args[0], args[1]); break
    case 3: res = funcs[0](args[0], args[1], args[2]); break
    case 4: res = funcs[0](args[0], args[1], args[2], args[3]); break
    case 5: res = funcs[0](args[0], args[1], args[2], args[3], args[4]); break
    case 6: res = funcs[0](args[0], args[1], args[2], args[3], args[4], args[5]); break
    case 7: res = funcs[0](args[0], args[1], args[2], args[3], args[4], args[5], args[6]); break
    case 8: res = funcs[0](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]); break
    case 9: res = funcs[0](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]); break
    default: res = funcs[0](...args)
  }
  switch (funcs.length) {
    case 1: return res
    case 2: return funcs[1](res)
    case 3: return funcs[2](funcs[1](res))
    case 4: return funcs[3](funcs[2](funcs[1](res)))
    case 5: return funcs[4](funcs[3](funcs[2](funcs[1](res))))
    case 6: return funcs[5](funcs[4](funcs[3](funcs[2](funcs[1](res)))))
    case 7: return funcs[6](funcs[5](funcs[4](funcs[3](funcs[2](funcs[1](res))))))
    case 8: return funcs[7](funcs[6](funcs[5](funcs[4](funcs[3](funcs[2](funcs[1](res)))))))
    case 9: return funcs[8](funcs[7](funcs[6](funcs[5](funcs[4](funcs[3](funcs[2](funcs[1](res))))))))
    default: return funcs.reduce(cReducer, res)
  }
}

const split = list => {
  const groups = Math.ceil(list.length / 10)
  const pack = Array(groups)
  for (let i = 0, bias = 0; i < groups; i++, bias = i * 10)
    pack[i] = list.slice(bias, bias + 10)
  return pack
}

const pipe = (...funcs) => {
  const flat = flatten(funcs)
  return (...args) => subSwitch(flat, args)
}

const compose = (...funcs) => {
  const flat = flatten(funcs).reverse()
  return (...args) => subSwitch(flat, args)
}

exports.pipe = pipe
exports.compose = compose
module.exports = pipe
