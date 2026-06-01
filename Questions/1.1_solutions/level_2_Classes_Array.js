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
class Player { 
    constructor(name, score = 0, level = 0){ 
        this.name = name; 
        this.score = score; 
        this.level = level;
    }
}

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

const getTopPlayers = n => {
    return players.toSorted((a, b) => b.score - a.score).slice(0, n);
}

const levelUpPlayers = minScore => { 
    let leveled = players.filter(player => player.score >= minScore); 
    
    return leveled.map(player => {
        return {
            ...player, // Copies the properties of player
            level: player.level + 1 // overwrite the property level
        };
    });
}


console.log(levelUpPlayers(1000))
// console.log(getTopPlayers(5));
// console.log(players);

// Challenge 2.3
console.log(lineS(3));
class Task{
    constructor(description, category, urgent = false, done = false){
        this.description = description;
        this.category = category;
        this.urgent = urgent;
        this.done = done;
    }
}

const tasks = [
    new Task("Finish All Challenges Today", "Coding", true, false),
    new Task("Buy groceries for the week", "Personal", false, true),
    new Task("Schedule dentist appointment", "Health", false, false),
    new Task("Fix bug in user authentication", "Coding", true, true),
    new Task("Prepare slides for Monday presentation", "Work", true, false),
    new Task("Go for a 30-minute run", "Health", false, true),
    new Task("Review pull requests from team", "Coding", false, false),
    new Task("Clean the kitchen and take out trash", "Personal", false, false),
    new Task("Submit monthly expense report", "Work", true, false),
    new Task("Read 10 pages of my book", "Personal", false, true),
    new Task("Update API documentation", "Coding", false, false),
    new Task("Reply to urgent client emails", "Work", true, true)
];

const urgentIncompleteTask = tasks => {
    let grouped = [];
    let filtered = tasks.filter(task =>{
        if(task.urgent === true && task.done === false){
            return task
        }
    });

    for(let {category, description} of filtered){
        if(!grouped[category]){
            grouped[category] = []
        }
        grouped[category].push(description);
    } 

    return grouped;
};

const doneTasks = (tasks, category) =>{
    return tasks.map( task => {
        if(task.category === category){
            return {...task, done: true};
        }
        return task;
    }).filter( task => task.category === category);
}

console.log(urgentIncompleteTask(tasks));
console.log(doneTasks(tasks, "Coding"));
console.log(tasks);

// challenge 2.4
console.log(lineS(4));
class Employee{
    constructor(name, department, salary, yearEmployed){
        this.name = name;
        this.department = department;
        this.salary = salary;
        this.yearEmployed= yearEmployed;
    }
}

const employees = [
    new Employee("Alice Smith", "Engineering", 85000, 2020),
    new Employee("Bob Jones", "Marketing", 62000, 2022),
    new Employee("Charlie Brown", "Engineering", 95000, 2018),
    new Employee("Diana Prince", "Human Resources", 68000, 2021),
    new Employee("Evan Wright", "Sales", 55000, 2023),
    new Employee("Fiona Gallagher", "Finance", 78000, 2019),
    new Employee("George Clark", "Engineering", 110000, 2015),
    new Employee("Hannah Abbott", "Marketing", 64000, 2021),
    new Employee("Ian Malcolm", "Data Science", 105000, 2017),
    new Employee("Julia Roberts", "Human Resources", 72000, 2020),
    new Employee("Kevin Bacon", "Sales", 58000, 2024),
    new Employee("Laura Croft", "Security", 80000, 2016),
    new Employee("Michael Scott", "Management", 75000, 2013),
    new Employee("Nadia Comaneci", "Finance", 82000, 2018),
    new Employee("Oscar Martinez", "Finance", 79000, 2014)
];

const avgSalaryPerDepartment = employees => {
    const filtered = new Set(employees.map( emp => emp.department));
    return filtered;
}

console.log(avgSalaryPerDepartment(employees));