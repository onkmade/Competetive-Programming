// ============================ Question 1

const forEachObject = (obj, callback) => {
    for(let [key, value] of Object.entries(obj)){
        callback(key, value);
    }
}

const pair = (key, value) => console.log(`${key}: ${value}`);
const obj1 = {
    name: "Baka", 
    role: "Computer Scientist",
    hobbies: ["Digital Art", "Playing Games"],
    food: "Just food",
    age: 19
}


forEachObject(obj1, pair);


// ============================ Question 2
const mapObject = (obj, callback) => {
    return Object.fromEntries(
        Object.entries(obj).map( ([key, value]) => {
            return [key, callback(value)];
        })
    );
}

const numberObj = {
    pink1: 100,
    pink2: 200, 
    pink3: 300, 
    pink4: 400
}
const doubleTheValue = (value) => value * 2;
console.log(mapObject(numberObj, doubleTheValue));

// ============================ Question 3
const filterObject = (obj, callback) => {
    const newObj = {};
    for(let [key, value] of Object.entries(obj)){
        if(callback(key, value)){
            newObj[key] = value;
        }
    }

    return newObj;
}


const objFilter2 = {
    isAdmin: true,
    isBanned: false,
    isVerified: true,
    isDeleted: false,
    hasProfile: true
};

const isActive = (key, value) => value === true;
console.log(filterObject(objFilter2, isActive));