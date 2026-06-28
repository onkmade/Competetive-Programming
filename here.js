const obj = {
    orange1: 100, 
    orange2: 200, 
    orange3: 300,
    orange4: 400, 
    orange5: 500
}

const result = Object.entries(obj).map( ([key, value]) => Object.fromEntries(key));
console.log(result);

