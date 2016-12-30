# ensue

[![NPM version][npm-image]][npm-url]
[![Unix Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

**Ensue** performs left-to-right function composition and works like the pipe operator, more common in functional programming languages.

Ensue turns
> const seo = data => c(b(a(data)))

into linear form
>seq=P( a, b, c )

>seq( data )

or even array for steps
>seq=[ a, b, c ]

>ensue( seq )( data )

Also lib supports nested array of pipes, so you can describe your sequences as simple function lists

## Install

    npm install --save ensue

## Usage

Let's write some short sequences

```js
import E from 'ensue'
import R from 'ramda'

//Simple validation
const hasStringId = [
  R.propOr(null,'id'),
  R.is(String)
]
//Another sequence: selector
const getUsers = [
  R.prop('users'),
  R.values,
  R.reject( R.has('inactive') )
]
```

Now we can use composition to get new sequences

```js
const checkLastId = [
  getUsers,
  R.last,
  hasStringId
]

//Make native function with ensue
const validator = E(checkLastId)

function stateToProps(state) {
  return {
    flag: validator(store)
  }
}
```

## License

MIT © [Zero Bias](https://github.com/zerobias)

[npm-url]: https://npmjs.org/package/ensue
[npm-image]: https://img.shields.io/npm/v/ensue.svg?style=flat-square

[travis-url]: https://travis-ci.org/zerobias/ensue
[travis-image]: https://img.shields.io/travis/zerobias/ensue.svg?style=flat-square&label=unix

[appveyor-url]: https://ci.appveyor.com/project/zerobias/ensue
[appveyor-image]: https://img.shields.io/appveyor/ci/zerobias/ensue.svg?style=flat-square&label=windows

[coveralls-url]: https://coveralls.io/r/zerobias/ensue
[coveralls-image]: https://img.shields.io/coveralls/zerobias/ensue.svg?style=flat-square

[depstat-url]: https://david-dm.org/zerobias/ensue
[depstat-image]: https://david-dm.org/zerobias/ensue.svg?style=flat-square
