import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'
export default {
  input: './src/index.js',
  output: {
    file: 'dist/v2ds.js', // 要打包的文件资源路径也是应用程序的主入口
    format: 'es', // 文件的输出格式
    name: 'v2ds', // 包的全局变量名称
    sourcemap: false // 生成.map文件，方便调试
  },
  external: [/@babel\/runtime/], // 告诉rollup不要将该模块打包进输出文件里,视其为外部依赖
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // 排除node_modules文件夹下，只编译我们的源代码
      babelHelpers: 'runtime',
      plugins: [
        '@babel/plugin-transform-runtime'
      ],
      presets: [
        "@babel/preset-env"
      ]
    }),
    visualizer(),
    terser()
  ]
}