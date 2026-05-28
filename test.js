const users = [
    {name: "Baka", id: "ZIB21142X"}, 
    {name: "Esmo", id: "ZIB21143Z"},
    {name: "Burga", id: "ZIB21144"}
];

users.find((item, index) => {
    console.log(`This is ${item}, whose index is ${index}`);
});