function solveShoemaker() {
    let t = parseInt(prompt("Enter number of test cases:"));

    while (t--) {
        const n = parseInt(prompt("Enter number of jobs:"));
        const jobs = [];

        for (let i = 1; i <= n; i++) {
            const line = prompt("Job " + i + " (Time Fine):").split(/\s+/);
            jobs.push({
                t: parseInt(line[0]),
                f: parseInt(line[1]),
                id: i
            });
        }

        jobs.sort((a, b) => {
            let val1 = a.t * b.f;
            let val2 = b.t * a.f;

            if (val1 > val2) {
                return 1;  // Move b to the front
            } else if (val1 < val2) {
                return -1; // Keep a at the front
            } else {

                return a.id - b.id; // smaller ID first
            }
        });

        let result = "";
        for (let j = 0; j < jobs.length; j++) {
            result += jobs[j].id + (j === jobs.length - 1 ? "" : " ");
        }

        return `${result}`;
    }
}

solveShoemaker();