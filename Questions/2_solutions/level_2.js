// ======================== Quest 1

const processArray = (arr, callback) => {
    const newArray = [];
    arr.forEach((item, index) => {
        newArray.push(callback(item, index));
    });
    
    return newArray;
}

const doubleWithIndex = (item, index) => item * index;
console.log(processArray([10, 20, 30, 40], doubleWithIndex));


// ======================== Quest 2
const findFirst = (arr, callback) => {
    for(let item of arr){
        if(callback(item)){
            return item;
        }
    }

    return "Not Found";
}

const isBaka = (item) => item === "Baka";
const isIsmo = (item) => item === "Ismo";
console.log(findFirst(["Neon", "Enon", "Tron", "Baka", "Corn", "Ismo"], isBaka));
console.log(findFirst(["Neon", "Enon", "Tron", "Baka", "Corn", "Ismo"], isIsmo));

// ======================== Quest 3
const filterItems = (arr, callback) => {
    const newArray = [];
    for(let item of arr){
        if(callback(item)){
            newArray.push(item);
        }
    }
    return newArray;
}

const isLong = (item) => item.length > 4;
const isNumber = (item) => typeof item === 'number';
console.log(filterItems(["Baka", "Ippo", "Takamora", "Kimura", "Tron", "believer", "Lion"], isLong));
console.log(filterItems([1, 10, 15, "Naruto", "Luffy", "19", 20, 30], isNumber));


// ======================== Quest 4
const countMatches = (arr, callback) => {
    let count = 0
    for(let item of arr){
        if(callback(item)){
            count++;
        }
    }
    
    return count;
}
const matchItem = "Baka"
const isMatch = (item) => item === matchItem;
console.log(countMatches(["Baka", "Tron", "Baka", "StrongArm", "Sendo", "Baka"], isMatch));

// ======================== Quest 5
const groupBy = (arr, callback) => {
    const newArray = [];

    for(let item of arr){
        const key = callback(item);
        if(!newArray[key]){
            newArray[key] = [];
        }
        
        newArray[key].push(item);
    }

    return newArray;
}

const category = (item) => item[0];
console.log(groupBy(["apple", "Banana", "appricote", "pineapple", "bringle", "kiwi", "mango"], category));


// COntinue Later