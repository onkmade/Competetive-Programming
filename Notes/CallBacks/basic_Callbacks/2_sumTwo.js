function sumTwo(a, b, callbackFn){
    return callbackFn(a, b);
}

function sum(a, b){
    return a + b;
}

console.log(sumTwo(4, 5, sum));