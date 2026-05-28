## What is a Class?

Think of a **class** as a **blueprint, template, or cookie cutter** for creating objects.

In the real world, an architect draws a single blueprint for a house. That blueprint isn't a physical house you can live in, but it outlines exactly what features the house will have (doors, windows, rooms). Using that one blueprint, builders can construct hundreds of actual houses.

In JavaScript, a class defines what data (properties) and actions (methods) an object will have. The objects you create from the class are called **instances**.

---

## Why Do We Create Classes?

Before classes, if you wanted to create multiple similar objects, you had to write them out manually or use factory functions. This quickly gets messy. We use classes for four main reasons:

### 1. Reusability and Organization

Instead of rewriting the same structure over and over again, you define it once in a class and stamp out as many objects as you need. It keeps your code clean, modular, and organized.

### 2. Grouping Data and Behavior Together

A class allows you to bind an object's **data** (attributes) and its **logic** (functions) into a single neat package.

* **Properties:** What the object *has* (e.g., a car's color, a user's password).
* **Methods:** What the object *does* (e.g., a car accelerating, a user logging out).

### 3. Consistency

Classes act as a contract. Every single object created from a `Student` class is guaranteed to have the exact same structure and methods, preventing bugs caused by missing properties.

---

## A Quick Visual Example

Here is how you write a class in JavaScript, using a blueprint for a `Car`:

```javascript
// The Blueprint (Class)
class Car {
  // The constructor sets up the initial data for each new car
  constructor(make, model, year) {
    this.make = make;       // Property
    this.model = model;     // Property
    this.year = year;       // Property
  }

  // A function inside a class is called a Method
  displayInfo() {
    console.log(`This is a ${this.year} ${this.make} ${this.model}.`);
  }
}

// Stamping out actual objects (Instances) using the 'new' keyword
const car1 = new Car("Toyota", "Corolla", 2022);
const car2 = new Car("Tesla", "Model 3", 2025);

// Using the methods bundled inside the objects
car1.displayInfo(); // Output: This is a 2022 Toyota Corolla.
car2.displayInfo(); // Output: This is a 2025 Tesla Model 3.

```

---

## Summary Checklist

> * **Class:** The abstract blueprint (e.g., the concept of a `User`).
> * **Object/Instance:** The real, physical thing built from the blueprint (e.g., a user named `Alice`).
> * **Constructor:** The special function that runs *only once* when you build the object to set up its default values.
> 
> * **Properties:** The data attributes that describe the object (e.g., `name`, `age`).
> * **Methods:** The functions that define the behavior of the object (e.g., `greet()`, `login()`). 

--- End of Notes -

# function can also do this things! then why need class?

You are 100% correct! In JavaScript, regular functions (specifically **Constructor Functions** and **Factory Functions**) can do all of these things. In fact, before classes were added to JavaScript in 2015, functions were the *only* way to do this.

So, if functions can do it, why did JavaScript introduce classes?

Here is why we use classes instead of just functions:

---

### 1. Cleaner Syntax (No More `prototype` Mess)

When using functions to simulate a class, adding a method so that it isn't recreated for every single object requires using the `.prototype` property. It gets ugly and confusing very quickly.

**The Old Function Way:**

```javascript
function Car(make, model) {
  this.make = make;
  this.model = model;
}

// You have to attach methods outside the function using 'prototype'
Car.prototype.drive = function() {
  console.log(this.make + " is driving.");
};

```

**The New Class Way:**

```javascript
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  // Everything lives cleanly inside one set of curly braces
  drive() {
    console.log(`${this.make} is driving.`);
  }
}

```

The class version groups everything into one readable block of code.

---

### 2. Much Easier Inheritance (`extends`)

If you want one blueprint to inherit from another (e.g., a `ElectricCar` inheriting features from a standard `Car`), doing it with pure functions is a notorious headache involving complex prototype linking.

With classes, it's incredibly simple using `extends` and `super()`:

```javascript
class ElectricCar extends Car {
  constructor(make, model, batteryLife) {
    super(make, model); // Calls the parent Car constructor
    this.batteryLife = batteryLife;
  }
}

```

---

### 3. Safety Guards

If you write a constructor function, nothing stops someone from accidentally calling it like a regular function without the `new` keyword, which can corrupt global data:

```javascript
function User(name) { this.name = name; }
const user1 = User("Alice"); // Oops! Forgot 'new'. This returns 'undefined' and causes bugs.

```

Classes have a built-in safety guard. If you forget `new`, JavaScript immediately throws an error to save you from a bug:

```javascript
class User { ... }
const user1 = User("Alice"); // Class constructor User cannot be invoked without 'new'

```

---

### 4. Built-in Getters and Setters

Classes introduce `get` and `set` keywords, allowing you to run safety checks on data before it's saved, seamlessly looking like a regular property from the outside.

```javascript
class User {
  constructor(age) { this._age = age; }

  set age(value) {
    if (value < 0) {
      console.log("Age cannot be negative!");
    } else {
      this._age = value;
    }
  }
}

```

---

### Summary: Is a Class actually different?

Under the hood, **a class in JavaScript is actually just a special function**. It is what programmers call **"syntactic sugar."**

It doesn't add a completely new feature to the language; instead, it provides a much cleaner, safer, and prettier way to write the exact same functional prototype code you used to write by hand.

--- End of Notes -

# why cannot write the variable defining keyword inside the class?
It can definitely feel weird at first! When you are inside a function or standard JavaScript code, you *must* use `let`, `const`, or `var` to declare variables. But inside a class block, writing something like `let color = "red";` will throw a syntax error.

Here is why JavaScript is designed this way:

---

### 1. You are defining "Fields", not local variables

A class is a blueprint for an object. Objects don't have "variables" inside them; they have **properties** (also called fields).

When you define a property inside a class, JavaScript automatically attaches it to the object instances. Because it is a property definition and not a standard line of running code, the language expects just the property name and its value.

* **Wrong:** `let color = "red";` (This looks like you are creating a temporary variable that will disappear when the code block finishes).
* **Right:** `color = "red";` (This tells JavaScript: "Every object made from this blueprint will have a property named `color`").

---

### 2. The Scope Difference

Keywords like `let` and `const` are used for **block scope**—meaning they create variables that live temporarily inside curly braces `{}` (like inside an `if` statement or a `for` loop) and then get erased from memory.

If you used `let` inside a class, it would imply that the variable is only temporary and accessible inside the class definition itself, rather than belonging to the objects you create.

---

### 3. How to control "const" or "let" behavior in a Class

If your goal is to make a property read-only (like `const`) or private, JavaScript gives you alternative tools instead of `let` and `const`:

#### To make a property variable/changeable (Like `let`):

Just declare it normally. Anyone can change it later.

```javascript
class Car {
  speed = 0; // Normal property, can be changed anytime
}

```

#### To make a property private (Hidden from the outside):

Instead of `let`, JavaScript uses a hashtag `#` symbol to declare a private field.

```javascript
class User {
  #password = "12345"; // Private! Cannot be accessed outside the class
}

```

#### To make a property read-only (Like `const`):

You define it normally, but use a **getter** without a setter so it can't be overwritten.

```javascript
class Car {
  constructor() {
    this._wheels = 4; 
  }

  // This acts like a const property from the outside
  get wheels() {
    return this._wheels;
  }
}

const myCar = new Car();
myCar.wheels = 5; // Ignored or errors out in strict mode! It's read-only.

```

### so, doubt: the property we created `color = "red"`, will it be stored/attach it `this`

Yes, absolutely! Under the hood, writing `color = "red";` directly inside a class body does exactly that: it attaches `color` to `this` for every new object created.

This feature is called **Class Fields** (introduced in modern JavaScript), and it is a cleaner shortcut for setting default values.

---

### How JavaScript sees it

When you write this modern code:

```javascript
class Car {
  color = "red";  // Class Field
  
  constructor(make) {
    this.make = make;
  }
}

```

JavaScript automatically compiles and executes it as if you had written it inside the constructor like this:

```javascript
class Car {
  constructor(make) {
    this.color = "red"; // <-- JavaScript moves it here automatically!
    this.make = make;
  }
}

```

---

### Proving it with `this`

If you add a method to that class and check `this.color`, it will work perfectly because it is attached to the instance:

```javascript
class Car {
  color = "red"; 

  drive() {
    // 'this' refers to the specific object calling the method
    console.log(`The ${this.color} car is driving.`); 
  }
}

const myCar = new Car();
myCar.drive(); // Output: The red car is driving.

```

### The Rule of Thumb

* If a value is going to be the **exact same default** for every new object, declare it as a field at the top (`color = "red";`).
* If a value needs to be **dynamic and unique** for each object, pass it into the `constructor` and attach it manually (`this.make = make;`).


### i mean how anything inside the class but outside the contructor or methods, get automatically attach to this, but not this happens inside the constrcutor?

This is one of the most fascinating parts of how JavaScript compiles your code! It all comes down to **how the JavaScript engine rewrites your class behind the scenes** before it actually runs it.

Here is exactly how it works and why the constructor behaves differently:

---

### 1. Outside the Constructor: "Class Fields" are a shortcut

When you write a variable directly inside the class body, you are using a feature called **Class Fields**.

```javascript
class Car {
  color = "blue"; // Outside the constructor
}

```

JavaScript looks at that and says: *"Ah, the programmer wants every single new car to start with a color of blue. Instead of making them type `this.color = "blue"` inside the constructor, I will do it for them."*

Before your code ever executes, JavaScript automatically **takes that line and moves it inside the constructor** for you, attaching `this.` to it. It effectively rewrites your code to look like this:

```javascript
class Car {
  constructor() {
    this.color = "blue"; // Moved here automatically by JavaScript!
  }
}

```

---

### 2. Inside the Constructor: Standard JavaScript Rules Apply

The moment you step inside the constructor (or any method), you are inside a **standard JavaScript function**.

```javascript
constructor(make) {
  make = make; // Inside the constructor
}

```

Inside a normal function, JavaScript stops doing automatic rewrites. It follows standard scoping rules:

* If you type `make = make`, JavaScript assumes you are working with **local variables** or parameters that belong only to that function.
* It does *not* automatically prepend `this.` because constructors are often used to do calculations, setup temporary variables, or run loops that shouldn't be saved to the final object.

JavaScript forces you to explicitly type `this.make = make` here so you can control *exactly* what gets saved to the object and what stays as a temporary variable.

---

### Visualizing the Difference

Think of it like this:

| Where you write it | How JavaScript interprets it | Does it attach to `this` automatically? |
| --- | --- | --- |
| **Outside** methods (`color = "blue"`) | It's a property declaration. JavaScript automatically moves it into the setup phase and adds `this.`. | **Yes** |
| **Inside** methods (`make = make`) | It's standard functional code. JavaScript treats it as a local variable calculation. | **No** (You must type `this.` manually) |