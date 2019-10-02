let currentSum = 0;
const infiniteCurry = (fn, accum) => {
    const next = (...args) => {
        return x => {
            if (x) {
                currentSum = 0
            } else {
                return args.reduce((acc, a) => {
                    currentSum += a;
                    return fn.call(fn, acc, a)
                }, accum);
            }
            return next(...args, x);
        };
    };
    return next();
};

const iSum = infiniteCurry(((x, y) => x + y), 0);
const sum = (a) => (a ? iSum(a) : currentSum);

console.log(sum(1)(3)(4)(2)());
console.log(sum());
console.log(sum(1)(3)(4)());
console.log(sum());
console.log(sum());


