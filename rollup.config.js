import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'
// import uglify from 'rollup-plugin-uglify'
// import { minify } from 'uglify-js'

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)

const isUmd = process.env.BUILD === 'umd'

const builds = {
  cmj : pkg.main,
  es  : pkg.module,
  umd : pkg.browser
}

const target = [{
  dest: isUmd?builds.umd:builds.cmj,
  format: isUmd?'umd':'cjs',
  moduleName: 'ensue',
  sourceMap: true
}]
const plugins = [
  cleanup(),
  nodeResolve({
    jsnext: true,
    main: false,
    module: true,
    skip: true,
    preferBuiltins: false
  }),
  commonjs({
    include: ['src/index.js']
  })
]
export default {
  entry:'es/index.js',
  globals: {
    "ramda": "R"
  },
  plugins: plugins,
  external: external,
  targets: target
}