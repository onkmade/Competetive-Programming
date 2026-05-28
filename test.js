class Car{
    constructor(make){
        this.make = make;
    }

    color = "blue";
}


const car1 = new Car("Tata");
console.log(car1.make);
car1.color = "orange"
console.log(car1.color);