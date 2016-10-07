# ensue

Ensue performs left-to-right function composition and works like the pipe operator more common in functional programming languages.
This lib supports nested array of pipes

## Install

    npm install --save ensue

## Usage

```js
import E from 'ensue'
import R from 'ramda'

const pipes = {
  //lazy pipeline, will render only when needed
  action: [
    R.pluck('payload'),
    R.reject(R.isNil)
  ],
  selectYear: R.when(
    R.all(R.has('year')),
    R.pluck('year'))
  object: [
    R.filter(R.is(Number))
    R.map(R.defaultTo(0))
  ]
}

//typical pipeline, immediately render
const userFilter = E(R.filter(e=>e===18),R.length)

//transparent combination of pipelines
const getFullAction = pipe=>E([
  pipes.action,
  pipes.selectYear,
  pipes.object,
  pipe])
let fullAction = getFullAction(userFilter)
// => R.pipe([
//      R.pluck('payload'),
//      R.reject(R.isNil),
//      R.when(
//        R.all(R.has('year')),
//        R.pluck('year')),
//      R.filter(R.is(Number)),
//      R.map(R.defaultTo(0)),
//      R.filter(e=>e===18),
//      R.length
//  ]
```

## License

MIT © [Zero Bias](https://github.com/zerobias)