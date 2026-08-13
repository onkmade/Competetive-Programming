function isEven(num, callback){
    return callback(num);
}

function checkEven(num){
    return num%2 === 0 ? "Even" : "Not Even";
}

const result1 = isEven(7, checkEven); // Not Even
const result2 = isEven(54, checkEven); // Even
console.log(result1,"\n",result2);