// Find the common element in the two or more array

function findCommon(ar1, ar2){
    if(!Array.isArray(ar1) || !Array.isArray(ar2)) return "Error: Invalid Array";
    if(ar1.length === 0 || ar2.length === 0) return "Error: Array is Empty"
    
    let arr = [];
    for(let target of ar1){
        for(let num of ar2){
            if(target === num){
                arr.push(target);
                break;
            }
        }
    }
    
    return arr;
}

const arr1 = [6, 6, 11];
const arr2 = [6, 11];
console.log(arr1.concat(arr2));

console.log(findCommon(arr1, arr2));

// ========================= OR ==============================

const areCommon = (ar1, ar2) => {  
    let target = new Set(ar1);
    let result = new Set();
    

    return [...ar2.filter( num => target.has(num))];
}

console.log(areCommon(arr1, arr2));