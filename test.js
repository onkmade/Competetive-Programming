const players = [
    { name : "Alpha" , score : 1200 , level : 5 },
    { name : "Bravo" , score : 850 , level : 3 },
    { name : "Charlie" , score : 2300 , level : 9 },
    { name : "Delta" , score : 450 , level : 1 },
    { name : "Echo" , score : 1600 , level : 6 },
    { name : "Foxtrot" , score : 1950 , level : 7 },
    { name : "Golf" , score : 1100 , level : 4 },
    { name : "Hotel" , score : 3100 , level : 10 },
    { name : "India" , score : 700 , level : 2 },
    { name : "Juliet" , score : 1750 , level : 6 }
];


console.log(players.map( player => player.level)); // this will return the array of level only
console.log(players.filter(player => player.level > 5)); // this will return the array of object of those player whose level is greater than 7