const heroes = [
    {name: "Spider-man", age: 18 },
    {name: "Superman", age: "unknown"},
    {name: "Iron-man", age: 34},
    {name: "Captain America", age: 54},
    {name: "Batman", age: 38}
];


for(let {name, age} of heroes){
    console.log(`Hero name is ${name} and Age is ${age}`);
}