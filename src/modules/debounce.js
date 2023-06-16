/**
 * @description 防抖自定义指令
 * @author 叶秋
 * @return { Object }
 */
export const debounce = Object.seal({
  name: 'debounce',
  bind(el, bindding, vnode) {
    const event = bindding.arg // 事件名称
    const fn = bindding.value // 事件的方法
    const isEmit = bindding.modifiers?.emit
    let _this = null
    if (Object.hasOwn(el, '__vue__'))  _this = el.__vue__
    let { wait } = el.dataset
    if (!wait) wait = 1000
    else wait = parseInt(wait)
    let time = null
    const _fn = e => {
      if (time) {
        clearTimeout(time)
        time = null
      }
      time = setTimeout(() => {
        fn(e)
        clearTimeout(time)
        time = null
      }, wait)
    }
    isEmit ? (_this ? _this.$on(event, _fn) : '') : el.addEventListener(event, _fn)
    el._addEvent_ = _fn
    el.type = isEmit ? 'emit' : 'native'
  },
  unbind(el, bindding) {
    const event = bindding.arg
    let _this = null
    if (Object.hasOwn(el, '_isVue'))  _this = el.__vue__
    el.type === 'emit' ? (_this ? _this.$off(event, el._addEvent_) : '') : el.removeEventListener(event, el._addEvent_)
    delete el._addEvent_
    delete el.type
  }
})