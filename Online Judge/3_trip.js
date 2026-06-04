function trip(expenses) {
    let n = expenses.length;

    let cents = expenses.map(val => Math.round(val * 100));
    
    let totalCents = cents.reduce((sum, current) => sum + current, 0);
    let avg = Math.floor(totalCents / n);
    let extraPennies = totalCents % n; 

    let take = 0;
    let give = 0;

    for (let spent of cents) {
        if (spent < avg) {
            take += avg - spent;
        } else if (spent > avg) {
            let target = (extraPennies > 0) ? avg + 1 : avg;
            if (spent > target) {
                give += spent - target;
            }
            if (extraPennies > 0) extraPennies--;
        }
    }

    return `$${(Math.max(take, give) / 100).toFixed(2)}`;
}

console.log(trip([10.00, 20.00, 30.00]));      // $10.00
console.log(trip([15.00, 15.01, 3.00, 3.01])); // $11.99