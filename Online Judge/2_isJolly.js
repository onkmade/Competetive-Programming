function isJolly(seq){
    const n = seq.length;

    if(n === 1 || n === 2) return "Jolly";
    if(n <= 0 || n > 3000) return "Not Jolly"

    const diff = new Set();

    for(let i = 0; i < n; i++){
        let result = Math.abs(seq[i+1] - seq[i]);
        if(result >= 1 && result < n){
            diff.add(result);
        }
    }

    return diff.size === n -1? "Jolly" : "Not Jolly";
}


console.log(isJolly([1, 4, 2, 3])); // Jolly
console.log(isJolly([1, 5])); // Not Jolly
console.log(isJolly([1, 5, 2, 4, 3])); // Jolly
console.log(isJolly([1, 5, 2, 4, 3])); // Jolly
console.log(isJolly([3, 4, 2, 5, 1, 6])); // Jolly
console.log(isJolly([1, 2, 1, 2])); // Not Jolly
console.log(isJolly([5, 2, 3, -1, 2, 4])); // Not Jolly