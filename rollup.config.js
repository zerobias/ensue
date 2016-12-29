import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'
// import uglify from 'rollup-plugin-uglify'
// import { minify } from 'uglify-js'

const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)

// const isUmd = process.env.BUILD === 'umd'

const builds = {
  cjs: pkg.main,
  es : pkg.module,
  umd: pkg.browser
}

const targets = {
  commonjs: {
    dest       : builds.cjs, //WARN~! Overwrite source file!
    format     : 'cjs',
    moduleName : 'ensue',
    sourceMap  : true,
    preferConst: true
  },
  umd: {
    dest      : builds.umd,
    format    : 'umd',
    moduleName: 'ensue',
    sourceMap : 'inline'
  }
}

const target = [ targets.umd ]
const plugins = [
  cleanup(),
  nodeResolve({
    jsnext        : true,
    main          : false,
    module        : true,
    skip          : true,
    preferBuiltins: false
  }),
  commonjs({
    include: ['src/index.js']
  })
]
export default {
  entry  : 'src/index.js',
  globals: {
    'array-flatten': 'flatten'
  },
  preferConst: true,
  plugins    : plugins,
  external   : external,
  targets    : target
}