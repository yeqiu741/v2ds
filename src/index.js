import { debounce } from './modules/debounce'
import { throttle } from './modules/throttle'
const obj = {
  debounce,
  throttle
}
/**
 * @description 给Vue抛出的install方法，当通过Vue.use(<本插件>)使用本插件的时候被调用
 * @param { Vue } Vue实例
 * @param { Array } opt 配置数组。 如果不想将所有的指令都注册到全局，则可在此按需配置需要全局配置的增强指令
 */
function install(vue, opt=[]) {
  if (!vue) return
  if (!opt instanceof Array) return
  Object.keys(obj).forEach((key) => {
    if (opt.length !== 0) {
      if (opt.indexOf(key) === -1) {
        vue.directive(key, obj[key])
      }
    } else {
      vue.directive(key, obj[key])
    }
  })
}
export {
  install,
  debounce,
  throttle
}
