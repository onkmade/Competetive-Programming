function myFilter(arr, callbackFN){
    const newArray = [];
    for(let el = 0 ; el < arr.length; el++){
        const result = callbackFN(arr[el], el, arr);
        if(result){
            newArray.push(arr[el]);
        }
    }

    return newArray;
}

const size = 4;
function printNames(element, index, arr){
    return element.length > size ? true : false;
}

const names = ["baka", "manisha", "harshu", "aaru", "kingaaru"];
console.log(myFilter(names, printNames));