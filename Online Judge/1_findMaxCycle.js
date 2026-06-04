function findMaxCycle(n, count = 1){
    if(!n || n < 0) return "Error: Enter the Valid Number";
    if(n === 1) return 1;
       
    while(n > 1){
        n % 2 === 0? n/=2 : n = (3 * n) + 1;
        count++;
    }
    
    return count;
}

function fromRange(i, j){
    if( i < 0 || i < 0 || !i || !j) return "Enter the Valid Number";
    if(i > j) return "i should be smaller";

    let max = -Infinity;
    let thatNum = 0
    for(let n = i; n <= j; n++){
        let maxCycle = findMaxCycle(n);
        if(maxCycle > max){
            max = maxCycle;
            thatNum = n;
        }
    }

    return  `The Num: ${thatNum} is ${max} length`;
}

console.log(fromRange(1, 10)); // The Num: 9 is 20 length
console.log(fromRange(100, 200)); // The Num: 171 is 125 length
console.log(fromRange(201, 210)); // The Num: 206 is 89 length
console.log(fromRange(900, 1000)); //The Num: 937 is 174 length