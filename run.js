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
    for(let n = i; n <= j; n++){
        let num = findMaxCycle(n);
        if(num > max){
            max = num;
        }
    }

    return  max;
}

console.log(fromRange(1, 10));
console.log(fromRange(100, 200));
console.log(fromRange(201, 210));
console.log(fromRange(900, 1000));