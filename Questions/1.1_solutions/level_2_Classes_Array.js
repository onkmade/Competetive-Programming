function lineS(num){
    return `\n\n\n=============== Challenge 2.${num} ===============\n`
}

console.log(lineS(1));
class Movie{
    constructor(title, director, rating, genre){
        this.title = title;
        this.director = director;
        this.rating = rating;
        this.genre = genre;
    }
}

const movies = [
    new Movie("Inception", "Christopher Nolan", 8.8, "Sci-Fi"),
    new Movie("The Dark Knight", "Christopher Nolan", 9.0, "Action"),
    new Movie("Interstellar", "Christopher Nolan", 8.6, "Sci-Fi"),
    new Movie("Spirited Away", "Hayao Miyazaki", 8.6, "Animation"),
    new Movie("The Hangover", "Todd Phillips", 7.7, "Comedy"),
    new Movie("Superbad", "Greg Mottola", 7.6, "Comedy"),
    new Movie("Avatar", "James Cameron", 7.8, "Sci-Fi"),
    new Movie("The Room", "Tommy Wiseau", 3.7, "Drama")
]

function getHighlyRatedMovies(movies){
    return movies.filter( movie => movie.rating > 7.5);
}

const groupedMovies = movies => {
    let grouped = [];

    for(let {genre, title} of movies){
        if(!grouped[genre]){
            grouped[genre] = [];
        } 
        grouped[genre].push(title);
    }

    return grouped;
}

console.log(getHighlyRatedMovies(movies));
console.log(groupedMovies(movies));


// Challenge 2.2
console.log(lineS(2));
class Player{
    constructor(name, score = 0, level = 0){
        this.name = name;
        this.score = score;
        this.level = level;
    }
}

const players = [
    { name: "Alpha", score: 1200, level: 5 },
    { name: "Bravo", score: 850, level: 3 },
    { name: "Charlie", score: 2300, level: 9 },
    { name: "Delta", score: 450, level: 1 },
    { name: "Echo", score: 1600, level: 6 },
    { name: "Foxtrot", score: 1950, level: 7 },
    { name: "Golf", score: 1100, level: 4 },
    { name: "Hotel", score: 3100, level: 10 },
    { name: "India", score: 700, level: 2 },
    { name: "Juliet", score: 1750, level: 6 }
];

const getTopPlayers = n => {
    players.sort((a, b) => b.score - a.score );
    return players.slice(0, n);
}

const levelUpPlayers = minScore => {
    let leveled = players.filter( player => player.score >= minScore);
    return leveled.map( player => {
        player.level++;
        return player;
    });
}

console.log(getTopPlayers(5));
console.log(levelUpPlayers(1000));

// Challenge 2.3
console.log(lineS(3));