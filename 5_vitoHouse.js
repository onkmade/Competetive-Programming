function solve() {
    var t = parseInt(prompt("Enter number of test cases:"));

    while (t--) {
        var input = prompt("Enter number of relatives followed by street numbers:").split(" ");
        var n = parseInt(input[0]);
        var neigh = [];
        
        for (var i = 1; i <= n; i++) {
            neigh.push(parseInt(input[i]));
        }

        neigh.sort(function(a, b) {
            return a - b;
        });

        var median = neigh[Math.floor(neigh.length / 2)];
        var sum = 0;

        for (var j = 0; j < neigh.length; j++) {
            sum += Math.abs(neigh[j] - median);
        }

        console.log(sum);
        alert("Total distance: " + sum);
    }
}

solve();