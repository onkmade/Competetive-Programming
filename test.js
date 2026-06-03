const foundCustomer = {
    name: "Baka", 
    orders: [500, 10, 1500]
}

const { name, orders } = foundCustomer;
// variable = foundCustomer["keyName"] , keyName is name, orders
// keyName must Match the variable name
console.log(name);
const [...arr] = orders;
// order is one of the keyName so we can use it
// variable = orders['n1', 'n2', ...rest]
