When working with an **array of objects** in JavaScript, standard primitive-matching methods like `indexOf` or `includes` don't work because objects are compared by reference, not by value.

To handle arrays of objects, you need methods that accept a **callback function** (a predicate) so you can look inside the object properties (e.g., `item.id === 1`).

Here is the complete checklist from [JavaScript.info](https://javascript.info/array-methods), specifically reorganized to isolate the methods you will use for arrays of objects.

---

## 1. Specifically for Arrays of Objects (Callback-Based)

These are your primary tools when your array looks like `[{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}]`. They let you inspect property values.

### Returns New Array

* `filter(func)` – **Crucial:** Returns a new array containing all objects that match your condition (e.g., finding all users with `role: 'admin'`).
* `map(func)` – **Crucial:** Transforms your objects into something else, returning a new array (e.g., pulling just the names out of an array of user objects: `users.map(u => u.name)`).
* `flatMap(func)` – Maps each object and flattens the result by one level. Great if your objects contain nested arrays.

### Returns a Specific Object or Index (Does Not Mutate)

* `find(func)` – **Crucial:** Scans the array and returns the **first actual object** that matches your criteria. Returns `undefined` if not found.
* `findIndex(func)` – Scans the array and returns the **index number** of the first object that matches your criteria. Returns `-1` if not found.
* `findLastIndex(func)` – Same as `findIndex`, but scans the array from right to left (end to start).

### Returns a Primitive (Does Not Mutate)

* `some(func)` – Checks if **at least one** object in the array meets a condition; returns a boolean (`true`/`false`).
* `every(func)` – Checks if **every single** object in the array meets a condition; returns a boolean (`true`/`false`).

### Complex Transformations / Accumulators

* `reduce(func, initial)` – Aggregates data from your objects. Can be used to turn an array of objects into a single lookup object, or to sum up a property across all objects (e.g., summing up the total price of items in a shopping cart).
* `reduceRight(func, initial)` – Same as `reduce`, but processes the objects from right to left.

### Iteration Only

* `forEach(func)` – Loops through your objects to perform an action (like logging a property or saving each object to a database). Returns nothing.

---

## 2. Reordering Arrays of Objects

### Mutates Original (In-Place)

* `sort(func)` – To sort an array of objects, you **must** provide a comparison function targeting the specific property you want to sort by (e.g., `arr.sort((a, b) => a.age - b.age)`).
* `reverse()` – Flips the order of the objects in the array exactly as they are.

---

## 3. Structural Methods (Works identically on all arrays)

These methods don't care what is inside the array; they only manipulate the structure or positions of the slots.

### Mutates Original (In-Place)

* `push(...items)` / `unshift(...items)` – Adds new objects to the end or beginning.
* `pop()` / `shift()` – Removes and returns an object from the end or beginning.
* `splice(pos, deleteCount, ...items)` – Deletes, replaces, or inserts object references at a specific index.
* `fill(value, start, end)` – Fills slots with a reference to an object. *(Careful: if you pass an object, every slot points to the exact same object reference!)*
* `copyWithin(target, start, end)` – Copies references of objects to another position inside the same array.

### Returns New Array

* `slice(start, end)` – Extracts a shallow copy of a portion of the array. The objects inside are still references to the original objects.
* `concat(...items)` – Merges multiple arrays of objects into a new array.
* `flat(depth)` – If you have arrays nested inside arrays of objects, this flattens the array structure.

---

## 4. ❌ Methods to Avoid with Arrays of Objects

Do not use these to find an object based on its contents, because `{} === {}` evaluates to `false` in JavaScript:

* `indexOf()`
* `lastIndexOf()`
* `includes()`

> 💡 **Study Note:** When a method like `slice()`, `concat()`, or `filter()` returns a "new array" of objects, it creates a **shallow copy**. This means the *array container* is brand new, but the *objects inside* still point to the exact same places in memory as the original array. Modifying an object property inside the new array will still reflect in the old array!