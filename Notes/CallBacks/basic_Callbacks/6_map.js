function myMap(arr, callbackFn){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        const result = callbackFn(arr[i], i, arr);
        newArr.push(result);
    }

    return newArr;
}

function doubleElementWithIndex(element, index, arr){
    return element*index;
}

const nums = [2, 3, 5, 6, 10, 22];
const arr = ["Baka", "Onkmade", "Onkzilla"];
console.log(myMap(nums, doubleElementWithIndex));
console.log(nums);
