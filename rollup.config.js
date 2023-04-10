import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'
export default {
  input: 'index.js',
  output: {
    file: 'dist/directives.umd.js', // 要打包的文件资源路径也是应用程序的主入口
    format: 'umd', // 文件的输出格式
    name: 'directive', // 包的全局变量名称
    sourcemap: false // 生成.map文件，方便调试
  },
  external: [/@babel\/runtime/], // 告诉rollup不要将该模块打包进输出文件里,视其为外部依赖
  global: {}, // 别名，全局替换。比如{ 'jquery': '$' }的意思就是代码中所有的jquery代表的都是$  // 另外该属性也可设置在output中
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // 排除node_modules文件夹下，只编译我们的源代码
      babelHelpers: "runtime"
    }),
    visualizer(),
    terser()
  ] // 插件
}