/* ==============================

LEVEL 1: Classes Basics
(Focus: Constructors, Methods, Properties)

================================= */

function lineSeperator(num){
    return `\n\n\n\n============== Challenge no: 1.${num} ==============\n`;
}

// challenge 1.1
console.log(lineSeperator(1));
class Car{
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    
    getAge(){
        const year = new Date();
        const currentYear = year.getFullYear();
        return currentYear - this.year;
    }
}

const car1 = new Car("Tata", "CXZ20-SUV", 2022);
const car2 = new Car("Skoda", "Sky 22A", 2024);
const car3 = new Car("Suzuki", "Maruti 800", 2003);
console.log(car1.getAge(), car2.getAge(), car3.getAge());


console.log(lineSeperator(2));
class Rectangle{
    constructor(width, height){
        this.width = width;
        this.height = height;
    }

    getArea(){
        return `Area: ${this.width * this.height}`;
    }


    getPerimeter(){
        let result = 2 * (this.width + this.height);
        return `Perimeter: ${result}`;
    }

    isSquare(){
        if(this.width === this.height) return `Square of size ${this.width}`;
    }
}

const rectangles = [
    new Rectangle(4,2),
    new Rectangle(10, 12),
    new Rectangle(12, 12),
    new Rectangle(14, 7),
    new Rectangle(5, 5)
];

rectangles.forEach((rect, index) => {
    if(rect.isSquare()){
        console.log(`The Rectangle at ${index} is Squared ----`);
        console.log(`Area: ${rect.getArea()}`)
        console.log(`Perimeter: ${rect.getPerimeter()}`)
    }

    console.log("\n");
});

// Challenge 1.3
console.log(lineSeperator(3));
class Book{
    constructor(title, author, pages, readPages = 0){
        this.title = title;
        this.author = author;
        this.pages = pages; // total number of pages
        this.readPages = readPages; // currently read pages
    }
    
    readMore(pages){
        if(pages > 0){
            this.readPages += pages;
            if(this.readPages >= this.pages){
                this.readPages = this.pages
                /* 
                here, I was trying to return only this.pages, due to which
                I'm getting what I want but this.readPages calculating and storing the bigger value than total pages
                so, If they read the past pages, cap it to the total pages
                
                example: total pages were 300, but adding 100 to 270 making this.readPages 370,
                this.readPages = 370, so I cap it to the total pages which is 300
                */
               return this.readPages;
            }

            return this.readPages;
        }  
        
        return "Enter Valid Number";
    }

    getProgress(){
        let percentageRead = (this.readPages/ this.pages) * 100;
        return `${percentageRead.toFixed(0)}%`;
    }

    isFinished(){
        return this.readPages >= this.pages;
    }
}

const book1 = new Book('Unlimited Memory', 'Baka', 300, 150);
console.log(book1.readMore(120));
console.log(book1.readMore(100));
console.log(book1.getProgress());
console.log(book1.isFinished());
console.log("\n\n\n");

// Challenge 1.4 
console.log(lineSeperator(4));
class BankAccount {
    constructor(ownerName, balance = 0, accountType) {
        this.ownerName = ownerName;
        this.balance = balance;
        this.accountType = accountType;
    }
    
    deposit(amount) {
        if (amount <= 0 || isNaN(amount) || typeof amount !== 'number') {
            return "Invalid Deposit Amount";
        }
        this.balance += amount;
        return `Deposit Amount: ${amount}, New Balance: ${this.balance}`;
    }

    withdraw(amount) {
        if (amount <= 0 || isNaN(amount) || typeof amount !== 'number') {
            return "Invalid Withdraw Amount";
        }
        if (amount > this.balance) {
            return "Insufficient Balance";
        }

        this.balance -= amount;
        return `Withdraw Amount: ${amount}, Remaining Balance: ${this.balance}`;
    }
}

const BankAccount1 = new BankAccount("Baka", 2500, "Saving");
console.log(BankAccount1.deposit(15000));
console.log(BankAccount1.withdraw(500));

const BankAccount2 = new BankAccount("Foo", 3200, "Deposit");
console.log(BankAccount2.deposit(5000));
console.log(BankAccount2.withdraw(10000));


// Challenge 1.5
console.log(lineSeperator(5));
class Student{
    constructor(name, grade, subjects = []){
        this.name = name;
        this.grade = grade;
        this.subjects = subjects;
    }

    addSubject(subject){
        if(this.subjects.includes(subject)) return `${subject} already in the list`
        let result = this.subjects.push(subject);
        return `${subject} has been added to the list`
    }

    removeSubject(subject){
        if(this.subjects.includes(subject)){
            let index = this.subjects.indexOf(subject);
            this.subjects.splice(index, 1);

            return `${subject} has been removed from the list`;
        } else {
            return `${subject} is not found`;
        }
    }

    displaySubs(){
        let result = [...this.subjects];
        return result.join(', ');
    }
}

const student1 = new Student('Baka', "A", ["Maths", "JS", "Java", "HCI"]);
console.log(student1.addSubject('C'));
console.log(student1.addSubject('C'));
console.log(student1.removeSubject('Java'));
console.log(student1.removeSubject('King'))
console.log(student1.displaySubs());

// Challenge 1.7
console.log(lineSeperator(7));
class Playlist{
    constructor(name){
        this.name = name;
        this.songs = [];
    }

    addSong(title, duration){
        this.songs.push(`title: ${title}, duration: ${duration}`);
        return this.songs.join('\n');
    }

    removeSong(title){
        if(this.songs.includes(title)){
            let index = this.songs.indexOf(title);
            this.songs.splice(index, 1);
        }
    }
}

const song1 = new Playlist("Sad Songs");
console.log(song1.addSong("The Night We Met", "4:25"));
console.log(song1.addSong("Love me", "3:25"));