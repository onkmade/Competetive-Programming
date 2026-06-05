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
    let grouped = {};
    
    for(let {department, salary} of employees){
        if(!grouped[department]){
            grouped[department] = {totalSalary: 0, departmentCount: 0};
        }

        grouped[department].totalSalary += salary;
        grouped[department].departmentCount += 1;
    }

    let dep = {};

    for(let ok in grouped){
        let {totalSalary, departmentCount} = grouped[ok];

        dep[ok] = Math.floor( totalSalary / departmentCount);
    }

    return dep;
}

const tenPercentRaise = employees => {
    const currentYear = new Date().getFullYear();

    return employees.map( ep => {
        const yearEmployed = currentYear - ep.yearEmployed;

        if(yearEmployed > 5){
            return {
                ...ep,
                salary: ep.salary + Math.floor((ep.salary * 10) / 100)
            }
        }

        return {...ep}
    });
};

console.log(avgSalaryPerDepartment(employees));
console.log(tenPercentRaise(employees));


// challenge 2.5
console.log(lineS(5));
class FoodItem{
    constructor(name, calories, protein, carbs){
        this.name = name;
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
    }
}

const foodMenu = [
    new FoodItem("Grilled Chicken Breast", 165, 31, 0),
    new FoodItem("Brown Rice (1 cup cooked)", 215, 5, 45),
    new FoodItem("Atlantic Salmon", 206, 22, 0),
    new FoodItem("Sweet Potato (medium)", 103, 2, 24),
    new FoodItem("Whole Egg", 78, 6, 0.6),
    new FoodItem("Greek Yogurt (Plain, Non-fat)", 100, 17, 6),
    new FoodItem("Almonds (1 oz / 23 nuts)", 164, 6, 6),
    new FoodItem("Avocado (medium)", 240, 3, 12),
    new FoodItem("Oatmeal (1 cup cooked)", 166, 6, 28),
    new FoodItem("Banana (medium)", 105, 1.3, 27),
    new FoodItem("Broccoli (1 cup chopped)", 31, 2.5, 6),
    new FoodItem("Spinach (2 cups raw)", 14, 2, 2),
    new FoodItem("Quinoa (1 cup cooked)", 222, 8, 39),
    new FoodItem("Cottage Cheese (1% fat, 1 cup)", 163, 28, 6.1),
    new FoodItem("Apple (medium)", 95, 0.5, 25),
    new FoodItem("Peanut Butter (2 tbsp)", 188, 8, 6),
    new FoodItem("Black Beans (1 cup cooked)", 227, 15, 41),
    new FoodItem("White Bread (1 slice)", 75, 2, 15),
    new FoodItem("Dark Chocolate (1 oz)", 170, 2, 13),
    new FoodItem("Whey Protein Isolate (1 scoop)", 120, 25, 2)
];

const getHighProteinItems = minProtein => {
    return foodMenu.filter( food => food.protein > minProtein);
};


/* const getDailyTotals = (selectedItems) =>{
    const dailyTotals = {calories: 0, protein: 0, crabs: 0}
    const filtered = foodMenu.filter( food => {
        return selectedItems.some( item => {
            if(food.name.startsWith(item)){
                dailyTotals.calories += food.calories;
                dailyTotals.protein += food.protein;
                dailyTotals.crabs += food.carbs
            }
        });
    });

    return dailyTotals;
}
 */

const getDailyTotals = (...selectedItems) => {
    return selectedItems.reduce((totals, itemName) =>{
        // Grilled Chicken - 1
        const match = foodMenu.find( food => food.name.startsWith(itemName));
        // find the 1st element with start with "Grilled Chicken" in the foodMenu and return the complete element
        // that passes the test implemented by the function

        if(match)
        {
            totals.calories += match.calories;
            totals.protein += match.protein;
            totals.carbs += match.carbs;
        }

        return totals;
    }, {calories: 0, protein: 0, carbs: 0});
};

// console.log(getDailyTotals("Grilled Chicken", "Whole Egg", "Almonds"));
// console.log(getHighProteinItems(12));


// Challenge 2.6
console.log(lineS(6))
class Customer{
    constructor(name, id, orders = [], isVIP = false){
        this.name = name;
        this.id = id;
        this.orders = orders;
        const totalSpend = this.orders.reduce((acc, sum) => acc + sum, 0);
        // since the array of order amounts, we need a single value to test it
        this.isVIP = isVIP || totalSpend > 1000
    }
}

const customers = [
    new Customer("Alice Smith", 101, [120, 85, 45]),
    new Customer("Bob Jones", 102, [50, 30]),
    new Customer("Charlie Brown", 103, [200, 150, 300]),
    new Customer("Diana Prince", 104, [500, 600]),        // Total: $1100 -> Should be VIP
    new Customer("Evan Wright", 105, [1200]),            // Total: $1200 -> Should be VIP
    new Customer("Fiona Gallagher", 106, [350, 450, 250]), // Total: $1050 -> Should be VIP
    new Customer("George Clark", 107, [100, 50]),
    new Customer("Hannah Abbott", 108, []),
    new Customer("Ian Malcolm", 109, [999]),               // Total: $999 -> Not quite VIP
    new Customer("Julia Roberts", 110, [15, 40, 100, 25])
];

const getVIPcustomers = (customers) => {
    return customers.filter( cus => cus.isVIP === true);
}

const newVIPList = (amount, id) => {
    const foundCustomer = customers.find( (customer) => customer.id === id);

    if(foundCustomer){
        foundCustomer.orders = [...foundCustomer.orders, amount];

        const totalOrder = foundCustomer.orders.reduce( (sum, cus) => sum + cus, 0);

        foundCustomer.isVIP = totalOrder > 1000;
    }

    return customers.filter( customer => customer.isVIP === true);
}


console.log(newVIPList(1000, 107));
console.log(getVIPcustomers(customers));


// Challenge 2.7
console.log(lineS(7));
class Classroom{
    constructor(roomNumber, teacher, students = []){
        this.roomNumber = roomNumber;
        this.teacher = teacher;
        this.students = students;
    }
}

const classrooms = [
    new Classroom(101, "Esmo", ["Baka", "Cornpotato", "ionide", "chessburga", "Ciel"]),
    new Classroom(102, "Valo", ["Phoenix", "Jett", "Omen", "Sage", "Reyna"]),
    new Classroom(103, "Apex", ["Wraith", "Baka", "Horizon", "Pathfinder"]),
    new Classroom(104, "Teyvat", ["Aether", "Lumine", "Paimon", "Zhongli", "Venti"]),
    new Classroom(105, "Limgrave", ["Tarnished", "Melina", "Blaidd", "Ranni"])
];

const findStudent = (studentName) => {
    const foundClassrooms = classrooms.filter( classroom => 
        classroom.students.includes(studentName)
    );

    return foundClassrooms.map( student => student.roomNumber).join(', ');
}

const transferStudent = (name, fromRoom, toRoom) => {
    const foundClassroom = classrooms.find( classroom => 
        classroom.roomNumber === fromRoom && classroom.students.includes(name)
    );

    const transferClassroom = classrooms.find( classroom =>
        classroom.roomNumber === toRoom
    );


    if(!foundClassroom || !transferClassroom){
        return {
            status: "Failed",
            reason: "Invalid Student Name or Room Number"
        }
    }

    const prevClassroom = {...foundClassroom, students: [...foundClassroom.students]};
    const studentIndex = foundClassroom.students.indexOf(name);
    foundClassroom.students.splice(studentIndex, 1);
    transferClassroom.students.push(name);


    return {
        status: "Success",
        fromRoom,
        toRoom, 
        prevClassroom,
        currentClassroom: transferClassroom
    }
}

console.log("Student RoomNumber is: ", findStudent("Baka"));
console.log(transferStudent("Baka", 103, 105));
console.log(transferStudent("Baka", 103, 115));
console.log("Student RoomNumber is: ", findStudent("Baka"));


// Challenge 2.8
console.log(lineS(8));
class GameCharacter{
    constructor(name, health, attackPower, inventory = []){
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
        this.inventory = inventory;
    }
};

const characters = [
    new GameCharacter("Luffy", 100, 85, ["Straw Hat", "Meat Trunk", "Den Den Mushi"]),
    new GameCharacter("Zoro", 90, 95, ["Wado Ichimonji", "Sandai Kitetsu", "Shusui", "Sake Bottle"]),
    new GameCharacter("Nami", 65, 50, ["Clima-Tact", "Log Pose", "Belly Pouch", "Map"]),
    new GameCharacter("Usopp", 70, 55, ["Kuro Kabuto", "Pop Greens", "Impact Dial"]),
    new GameCharacter("Sanji", 85, 80, ["Cigarette Lighter", "Chef Knife", "Recipe Book"]),
    new GameCharacter("Chopper", 75, 45, ["Rumble Balls", "Medical Kit", "Cotton Candy"]),
    new GameCharacter("Brook", 65, 75, ["Soul Solid", "Shark Guitar"])
];

const findWeakest = () => {
    const weakestCharacter = characters.reduce( (lowest, current) => 
        current.health < lowest.health ? current: lowest
    );

    // we can also use Reduce to find the minimum and maximum, since we compute all value into a single result
    

    const allWeakCharacter = characters.filter( character => character.health === weakestCharacter.health);

    return allWeakCharacter.map( char => char.name).join(', ');
}

// Function 2.8.2
const equipItem = (CharacterName, item) => {
    const foundCharacter =  characters.find(character => character.name === CharacterName);

    if(!foundCharacter){
        return "Character doesn't exit"
    }

    if(foundCharacter.inventory.length < 5){
        foundCharacter.inventory.push(item);
    } else {
        return {
            status: "Failed",
            reason: "Inventory Holds Only 5 or less items"
        };
    }

    return {
        status: "Success", 
        CharacterName,
        item,
        equipments: foundCharacter.inventory
    }
}

console.log("Weakest character(s):", findWeakest()); // Output: Nami, Chopper

console.log(equipItem("Sanji", "Mirchi Tadka Soup")); // Success (4 items)
console.log(equipItem("Sanji", "Lavender Flowers"));   // Success (5 items)
console.log(equipItem("Sanji", "Pokemon")); // Failed


// Challenge 2.9
console.log(lineS(9));
class Song{
    constructor(name, artist, plays, liked = false){
        this.name = name;
        this.artist = artist;
        this.plays = plays;
        this.liked = liked;
    }
}

const songs = [
    new Song("Bohemian Rhapsody", "Queen", 1200000000, true),
    new Song("Blinding Lights", "The Weeknd", 4000000000, true),
    new Song("Shape of You", "Ed Sheeran", 3800000000, false),
    new Song("Billie Jean", "Michael Jackson", 1500000000, true),
    new Song("Stay", "The Kid LAROI & Justin Bieber", 2800000000, false),
    new Song("Hotel California", "Eagles", 1100000000, true),
    new Song("As It Was", "Harry Styles", 2500000000, true),
    new Song("Someone Like You", "Adele", 1600000000, false),
    new Song("Smells Like Teen Spirit", "Nirvana", 1800000000, true),
    new Song("Cruel Summer", "Taylor Swift", 1900000000, true),
    new Song("Starboy", "The Weeknd", 3100000000, false),
    new Song("Lose Yourself", "Eminem", 2000000000, true),
    new Song("Bad Guy", "Billie Eilish", 2400000000, false),
    new Song("Flowers", "Miley Cyrus", 1700000000, true),
    new Song("Good 4 U", "Olivia Rodrigo", 2100000000, false)
];

const getMostPlayed = n => {
    return songs.toSorted( (a, b) => b.plays - a.plays).slice(0, n);
}

const toggleLike = title => {
    const foundSong = songs.find( song => song.name === title);

    if(!foundSong){
        return "Invalid Song, Cannot Find it in the songs";
    }

    let toggleLiked =  foundSong.liked === true ? false: true;
    foundSong.liked = toggleLiked

    return foundSong;
}

const getLikedSongs = () => {
    return songs
    .filter( song => song.liked)
    .reduce( (grouped, song) => {
        if(!grouped[song.artist]){
            grouped[song.artist] = [];
        }

        grouped[song.artist].push(song.name);

        return grouped;
    }, []);
}


console.log("Liked Songs: ", getLikedSongs(), "\n");
console.log("Most Played Songs", (getMostPlayed(5)), "\n");
console.log("Toggled Song: ", toggleLike("Billie Jean"), "\n");


// Challenge 2.10
console.log(lineS(10));
class Project{
    constructor(name, status, teamMembers = [], budget){
        this.name = name;
        this.status = status;
        this.teamMembers = teamMembers;
        this.budget = budget;
    }

    /* 
    Revision: How `this` and the `new` keyword work under the hood

    When you invoke a constructor function using the `new` keyword, 4 things happen sequentially behind the scenes:

    1. A blank, empty object is allocated inside the memory:
    {}

    2. JavaScript automatically binds (points) the `this` keyword to that fresh, empty object:
    this = {}; // (Done implicitly by the engine)

    3. When the constructor executes lines like `this.name = name`, those properties are created directly inside that object in memory:
    this = {
        name: name
    };

    4. Once the constructor finishes executing, it automatically returns the populated `this` object, which is then assigned to your instance variable.

    5. Therefore, a class instance does not hold the actual data directly; instead, it holds a reference pointer to the exact location of that object in memory.

    Summary of the Memory Model:
    - Variable holds           -> The Memory Address (Pointer).
    - Memory Address points to -> The specific location in the Heap memory.
    - The Location holds       -> The actual Object Data.
    */
}

const projects = [
    new Project("Alpha Mobile App", "Active", ["Alice", "Bob", "Charlie"], 45000),
    new Project("Beta Cloud Migration", "Pending", ["David", "Eva"], 85000),
    new Project("Gamma Cyber Security Audit", "Completed", ["Frank", "Grace", "Heidi"], 20000),
    new Project("Delta Frontend Redesign", "Active", ["Ivan", "Judy"], 35000),
    new Project("Epsilon Data Pipeline", "Active", ["Mallory", "Nels", "Oscar"], 60000),
    new Project("Zeta Marketing Campaign", "Cancelled", ["Peggy", "Trent"], 15000),
    new Project("Eta AI Model Training", "Pending", ["Alice", "Charlie", "Walter"], 120000),
    new Project("Theta Database Optimization", "Completed", ["Bob", "Eve"], 25000)
];

const getActiveProjects = () => {
    return projects
    .filter( project => project.status === 'Active')
    .toSorted( (a, b) => b.budget - a.budget);
}

const addMember = (projectName, member) => {
    const foundProject = projects.find( project => project.name === projectName);

    if(!foundProject){
        return "Invalid Project Name"
    }

    if(foundProject.status === 'Active' && foundProject.teamMembers.length < 5){
        foundProject.teamMembers.push(member);
    } else {
        return "Project is not Actiive or Member are more than 5";
    }

    return {
        status: "Success", 
        addedTo: projectName,
        teamMembers: foundProject.teamMembers
    }
}

console.log(getActiveProjects());
console.log(addMember("Epsilon Data Pipeline", "Baka"));
console.log(projects);

// Something I learn about the objects while reading the articles
const users = [
  { id: 1, name: "Alice Johnson", age: 28, email: "alice@example.com" },
  { id: 2, name: "Bob Smith", age: 34, email: "bob.smith@example.com" },
  { id: 3, name: "Charlie Brown", age: 19, email: "charlie@example.com" },
  { id: 4, name: "Diana Prince", age: 31, email: "diana@example.com" },
  { id: 5, name: "Evan Wright", age: 25, email: "evan.w@example.com" },
  { id: 6, name: "Fiona Gallagher", age: 0, email: "fiona@example.com" },
  { id: 7, name: "George Clark", age: 42, email: "" }
];

const config = {
    sortBy: "age",
    order: "desc"
}

function sortUser(users, config){
    return users.sort((a, b) => {
        const field = config.sortBy;
        const aVal = a[field];
        const bVal = b[field];

        return config.order === 'desc' ? bVal - aVal : aVal - bVal;
    });
}

console.log(sortUser(users, config));