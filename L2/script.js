const fn0 = () => new Promise(resolve => {
  console.log('fn0');
  setTimeout(() => resolve(2), 0);
});
const fn1 = () => {
  console.log('fn1');
  return Promise.resolve(1);
};

const fn2 = () => new Promise(resolve => {
  console.log('fn2');
  setTimeout(() => resolve(2), 1000);
});

const fn3 = () => new Promise(resolve => {
  console.log('fn3');
  setTimeout(() => resolve(2), 4000);
});

async function promiseReduce(asyncFunctions, reduce, initialValue) {
  let temp = initialValue;
  asyncFunctions.forEach(item => {
    let res = item();
    let  result = res.then(res => res);
console.log(111);
    console.log(res);
    console.log(initialValue);
    temp += reduce(result, initialValue);
  });
  return temp;
}

promiseReduce(
  [fn0, fn1, fn2, fn3],
  function(memo, value) {
    console.log('reduce');
    console.log(memo);
    console.log(memo * value);
    return memo * value;
  },
  1,
).then(res => console.log('done', res));
