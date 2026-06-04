let field = [];
let nLines = 100;
let nColumns = 100;

function clearField() {
    field = [];

    for (let i = 0; i < nLines; i++) {
        field[i] = [];

        for (let j = 0; j < nColumns; j++) {
            field[i][j] = 0;
        }
    }
}

function setBounds(l, c) {
    nLines = l;
    nColumns = c;
}

function isInsideBounds(i, j) {
    return i >= 0 && i < nLines && j >= 0 && j < nColumns;
}

function increment(i, j) {
    if (isInsideBounds(i, j) && field[i][j] !== -1) {
        field[i][j]++;
    }
}

function setMine(i, j) {
    field[i][j] = -1;

    // Increment neighbours
    for (let m = -1; m <= 1; m++) {
        for (let n = -1; n <= 1; n++) {
            increment(i + m, j + n);
        }
    }
}

function pprintField(nField) {
    console.log(`Field #${nField}:`);

    for (let i = 0; i < nLines; i++) {
        let row = "";

        for (let j = 0; j < nColumns; j++) {
            let x = field[i][j];

            if (x === -1) {
                row += "*";
            } else {
                row += x;
            }
        }

        console.log(row);
    }
}

// Example Input
let inputs = [
    ["*...", "....", ".*..", "...."],
    ["**...", ".....", ".*..."]
];

let nField = 1;

for (let current of inputs) {
    let l = current.length;
    let c = current[0].length;

    setBounds(l, c);
    clearField();

    for (let i = 0; i < l; i++) {
        let line = current[i];

        for (let j = 0; j < c; j++) {
            if (line[j] === "*") {
                setMine(i, j);
            }
        }
    }

    pprintField(nField);
    console.log("");

    nField++;
}