/* ==============================

LEVEL 1: Classes Basics
(Focus: Constructors, Methods, Properties)

================================= */

// challenge 1.1
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

// challenge 1.2
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
class Book{
    constructor(title, author, pages, readPages = 0){
        this.title = title;
        this.author = author;
        this.pages = pages; // total number of pages
        this.readPages = readPages; // currently read pages
    }

    
}

const book1 = new Book('Unlimited Memory', 'Baka', 524, 256);