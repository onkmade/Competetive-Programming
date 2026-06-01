const players = [
    { name : "Alpha" , score : 1200 , level : 5, sport: "Football" },
    { name : "Bravo" , score : 850 , level : 3, sport: "Cricket" },
    { name : "Charlie" , score : 2300 , level : 9, sport: "Hockey" },
    { name : "Delta" , score : 450 , level : 1, sport: "Tennis" },
    { name : "Echo" , score : 1600 , level : 6, sport: "Cricket" },
    { name : "Foxtrot" , score : 1950 , level : 7, sport: "Basketball" },
    { name : "Golf" , score : 1100 , level : 4, sport: "Football" },
    { name : "Hotel" , score : 3100 , level : 10, sport: "Basketball" },
    { name : "India" , score : 700 , level : 2, sport: "Cricket" },
    { name : "Juliet" , score : 1750 , level : 6, sport: "Tennis" }
];

let grouped = [];
for(let {name, score, sport} of players){
    grouped.push(name, score, sport);
}

console.log(grouped);