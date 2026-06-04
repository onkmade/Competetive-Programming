function solveQwerty(inputString) {
    const keyboard = "1234567890-=QWERTYUIOP[]\\ASDFGHJKL;'ZXCVBNM,./";
    inputString = inputString.toLowerCase();
    let decodedMessage = "";

    for (let i = 0; i < inputString.length; i++) {
        let char = inputString[i];

        if (char === " ") {
            decodedMessage += " ";
        } else {
            let index = keyboard.indexOf(char);
            
            if (index > 0) {
                decodedMessage += keyboard[index - 1];
            } else {
                decodedMessage += char;
            }
        }
    }

    return decodedMessage;
}

const scrambled = "O', GOMR"; 
console.log(solveQwerty(scrambled));