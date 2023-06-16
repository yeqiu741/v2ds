/**
 * @description 节流自定义指令
 * @author 叶秋
 * @return { Object }
 */
export const throttle = Object.seal({
  name: 'throttle',
  bind(el, bindding, vnode) {
    const event = bindding.arg // 事件名称
    const fn = bindding.value // 事件的方法
    const isEmit = bindding.modifiers?.emit
    let _this = null
    if (Object.hasOwn(el, '__vue__'))  _this = el.__vue__
    let { wait, immediate } = el.dataset
    if (!wait) wait = 1000
    else wait = parseInt(wait)
    let timer = null
    const _fn = e => {
      if (timer) return
      if (immediate) fn()
      timer = setTimeout(() => {
        if (!immediate) fn()
        clearTimeout(timer)
        timer = null
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