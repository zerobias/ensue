import R from 'ramda'

function P(...data) {
  return R.apply(R.pipe,R.flatten(data))
}

export default P