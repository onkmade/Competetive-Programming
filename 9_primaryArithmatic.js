function primaryArithmetic(num1, num2){
    if(num1 === 0 && num2 === 0) return "Stopped";
    if(!Number.isFinite(num1) && !Number.isFinite(num2)) return "Enter Valid Numbers";

    let count = 0;
    while(num1 !== 0 && num2 !==0){
        let n1 = num1 % 10;
        let n2 = num2 % 10;

        if(n1 + n2 > 9){
            count++;
        }

        num1 /= 10;
        num2 /= 10;
    }

    if(count === 0){
        return "No Carry Operation";
    } else {
        return `${count} Carry Operation`;
    }
}

console.log(primaryArithmetic(123, 456));
console.log(primaryArithmetic(555, 555));
console.log(primaryArithmetic(123, 549));
console.log(primaryArithmetic(0, 0));