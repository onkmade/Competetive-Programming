function commonPermutation(a, b) {
    const aCount = {};
    const bCount = {};

    for (let char of a) {
        if (char >= 'a' && char <= 'z') {
            aCount[char] = (aCount[char] || 0) + 1;
        }
    }

    for (let char of b) {
        if (char >= 'a' && char <= 'z') {
            bCount[char] = (bCount[char] || 0) + 1;
        }
    }

    let result = "";
    for (let i = 97; i <= 122; i++) {
        let char = String.fromCharCode(i);
        
        if (aCount[char] && bCount[char]) {
            let commonCount = Math.min(aCount[char], bCount[char]);
            result += char.repeat(commonCount);
        }
    }

    return result;
}

console.log(commonPermutation("pretty", "women"));    // Output: "e"
console.log(commonPermutation("walking", "down"));    // Output: "nw"
console.log(commonPermutation("the", "street"));      // Output: "et"

