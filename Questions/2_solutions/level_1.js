// ======================== Question 1

const greet = (name, callBack) => { return callBack(name) }
const formal = (name ) => { return `Greeting, ${name}` };
const casual = (name) => { return `Yo, ${name}` };

console.log(greet("baka", formal));
console.log(greet("baka", casual));

// ======================== Question 2
const calculate = (num1, num2, callBack) => {
    return callBack(num1, num2);
}

const addition = (num1, num2) => { return num1 + num2};
const subtraction = (num1, num2) => { return num1 - num2};
const multiplication = (num1, num2) => {return num1 * num2}

console.log(calculate(4, 5, addition));
console.log(calculate(4, 5, subtraction));
console.log(calculate(4, 5, multiplication));


// ======================== Question 3
const repeat = (n, callback) => {
    for(let i = 0; i < n; i++){
        callback();
    }
    return ''
}

const message = () => { console.log("great") };
console.log(repeat(4, message));


// ======================== Question 4
const check  = (boolean, callback1, callback2) => {
    const result =  boolean === true ? callback1() : callback2();
    console.log(result);
    return result;
}

const checkTrue = () => "True, mnannn!"
const checkFalse = () => "it is false"

check(true, checkTrue, checkFalse);
check(false, checkTrue, checkFalse);


// ======================== Question 5
const transform = (string, ...callbacks) => {
    let result = string
    for(let method of callbacks){
        result = method(result);
    }
    
    return result;
}

const upperCase = (string) => string.toUpperCase();
const reverse = (string) => string.split('').reverse().join('');
const duplicate = (string) => string.repeat(2)

console.log(transform("baka", upperCase, reverse, duplicate));


// ======================== Question 6
const runIf = (conditionFn, callback) => {
    if(conditionFn) return callback();
    if(!conditionFn) return "Sorry, not eligible";
}

const checkAge = (age) =>  age > 18 ? true : false;
const resultAge = () => "The Age is above 18";
console.log(runIf(checkAge(13), resultAge));


// ======================== Question 7
const combine = (callback1, callback2) => {
    const result = callback1(10);
    return callback2(result);
}

const add5 = (num) => num + 5;
const multiple2 = (num) => num * 2;
console.log(combine(add5, multiple2));


// ======================== Question 8
const counter = (startNum, callback) => {
    for(let i = 0; i < 5; i++){
        callback(startNum);
        startNum++
    }
}

const incrementNum = (num) => console.log('The Current Count: ', num);
counter(11, incrementNum);


// ======================== Question 9
// ======================== Question 10
//  All were good!