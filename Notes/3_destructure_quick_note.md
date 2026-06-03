```js
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

```

## Quick Guide: JavaScript Destructuring Under the Hood
Destructuring is a shortcut for extracting values from data structures. It behaves differently depending on whether you are targeting an Object or an Array.
------------------------------
## 1. Object Destructuring (Key-Based)
When you destructure an object, the engine performs a named lookup.

const { name, orders } = foundCustomer;


* How it works: It looks for a specific string key inside the object.
* The Rule: The variable name must match the property key name in the object.
* Under the hood: It effectively runs const name = foundCustomer["name"].
* Use case: Pulling specific data out of API responses or configuration objects.

------------------------------
## 2. Array Destructuring (Position-Based)
When you destructure an array, the engine follows the order/index.

const [...arr] = orders; 


* How it works: It uses an iterator. It doesn't care what the data is called; it only cares where it sits in the line.
* The Logic: const [first, second] = orders maps first to index 0 and second to index 1.
* The "Rest" Syntax (...): On the left side of the =, ...arr tells the engine: "Take every remaining item from the iterator and pack it into a new array."
* Use case: Useful when the data has a specific sequence (like CSV rows or coordinates [x, y]).

------------------------------
## 3. Cheat Sheet: Do's and Don'ts

| Scenario | Recommendation | Why? |
|---|---|---|
| Missing Data | Use defaults: { name = 'Guest' } | Prevents undefined variables. |
| Renaming | Use colons: { name: userName } | Avoids variable name collisions. |
| Deep Nesting | Avoid const { a: { b: { c } } } | If b is null, the whole app crashes. |
| Simple Objects | Use Dot Notation: user.name | Destructuring 10+ variables is hard to read. |


------------------------------

## Summary for your Code

   1. foundCustomer is an Object: You used {} to match keys. Correct.
   2. orders is an Array: You used [] to collect items by position. Correct.
