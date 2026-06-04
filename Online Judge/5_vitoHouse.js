function solve() {
    let  t = parseInt(prompt("Enter number of test cases:"));

    while (t--) {
        const input = prompt("Enter number of relatives followed by street numbers:").split(" ");
        const n = parseInt(input[0]);
        const neigh = [];
        
        for (let i = 1; i <= n; i++) {
            neigh.push(parseInt(input[i]));
        }

        neigh.sort(function(a, b) {
            return a - b;
        });

        const median = neigh[Math.floor(neigh.length / 2)];
        let sum = 0;

        for (let j = 0; j < neigh.length; j++) {
            sum += Math.abs(neigh[j] - median);
        }

        console.log(sum);
        alert("Total distance: " + sum);
    }
}

solve();