# @ylzq/v2ds
vue自定义指令增强库

### 使用方式: 
- 安装：`npm i @ylzq/v2ds -S`
- 全局导入(main.js)：
  ```js
  import v2ds from '@ylzq/v2ds'
  Vue.use(v2ds)
  ```
- 按需全局导入：
  ```js
  Vue.use(v2ds, [ 'debounce', ... ])
  ```
- 按需导入(具体vue组件实例)
  ```js
  import { debounce, throttle } from '@ylzq/v2ds'
  export default {
    directives: {
      debounce,
      throttle
    }
  }
  ```
### 当前封装的自定义指令
- **debounce**
  - 描述：防抖
  - 使用方式：`v-debounce:<event>.<sync>="<callback>"`
    - event: 所需要代理的事件，比如：click。
    - sync: 修饰符。当前仅支持`emit`，**此为兼容在vue自定义组件中使用，为了代理@\<event\>=“\<callback\>”的方式**
    - callback: 回调方法
- **throttle**
  - 描述：节流
  - 使用方式：`v-throttle:<event>.<sync>="<callback>"`
    - event: 所需要代理的事件，比如：click。
    - sync: 修饰符。当前仅支持`emit`，**此为兼容在vue自定义组件中使用，为了代理@\<event\>=“\<callback\>”的方式**
    - callback: 回调方法
