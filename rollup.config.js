import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-js'

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)

const isES5Build = process.env.BUILD === 'es5'

const targets = {
  es5:[{
    dest: pkg['main'],
    format: 'umd',
    moduleName: 'ensue',
    sourceMap: true
  }],
  esnext:[{
    dest: pkg['jsnext:main'],
    format: 'umd',
    moduleName: 'ensue',
    sourceMap: true
  }]
}

export default {
  entry:isES5Build
        ? 'ensue.es5.js'
        : 'ensue.js',
  globals: {
    "ramda": "R"
  },
  plugins: [
    cleanup(),
    nodeResolve({
      jsnext: true,
      main: false,
      module: true,
      skip: true,
      preferBuiltins: false
    }),
    commonjs({
      include: [isES5Build
        ? 'ensue.es5.js'
        : 'ensue.js']
    }),
    isES5Build
      ? uglify({}, minify)
      :''
  ],
  external: external,
  targets: isES5Build
    ? targets.es5
    : targets.esnext
}