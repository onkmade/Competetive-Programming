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
const names = ["baka", "manisha", "harshu", "king", "aaryansh"];
console.log(myFilter(names, (name) => name.length > size));