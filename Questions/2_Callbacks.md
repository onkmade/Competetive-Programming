# JavaScript Callbacks — 5 Levels of Practice

---

## Level 1 — Simple Callbacks Using Functions Only

1. Write a function `greet` that takes a name and a callback. The callback should decide how to greet the person (e.g., formally or casually). Call `greet` twice with two different callbacks.

2. Write a function `calculate` that takes two numbers and a callback. The callback performs an operation on those numbers. Call `calculate` with addition, subtraction, and multiplication callbacks.

3. Write a function `repeat` that takes a number `n` and a callback. The callback is called exactly `n` times. Call `repeat` with a callback that logs a message.

4. Write a function `check` that takes a boolean and two callbacks: one for `true`, one for `false`. Call `check` with different booleans and different pairs of callbacks.

5. Write a function `transform` that takes a string and a callback. The callback transforms the string somehow. Call `transform` with callbacks that uppercase, reverse, and duplicate the string.

6. Write a function `runIf` that takes a condition function and a callback. If the condition function returns `true`, the callback runs. Call `runIf` with a condition that checks if a number is positive.

7. Write a function `combine` that takes two callbacks. It calls the first, passes its return value to the second, and returns the final result. Call `combine` with callbacks that add 5 and then multiply by 2.

8. Write a function `counter` that takes a starting number and a callback. The callback is called with the current count, then the count increments. Call `counter` 5 times in a loop.

9. Write a function `logger` that takes a message and a callback. The callback decides where or how to log the message (console, alert, or silent). Call `logger` with three different logging callbacks.

10. Write a function `validator` that takes a value and a callback. The callback returns `true` or `false`. `validator` returns `"valid"` or `"invalid"` based on the callback's result. Call it with callbacks that check for empty strings and positive numbers.

---

## Level 2 — Callbacks with Parameters, Return Values, and Reusable Functions

1. Write a function `processArray` that takes an array and a callback. The callback is called with each item and its index. Return a new array of callback results. Do not use `map`.

2. Write a function `findFirst` that takes an array and a callback. The callback returns `true` or `false`. Return the first item where the callback returns `true`. Do not use `find`.

3. Write a function `filterItems` that takes an array and a callback. Return a new array with only items where the callback returns `true`. Do not use `filter`.

4. Write a function `countMatches` that takes an array and a callback. Return the count of items where the callback returns `true`. Do not use `filter` or `reduce`.

5. Write a function `groupBy` that takes an array and a callback. The callback returns a category string. Return an object where keys are categories and values are arrays of matching items.

6. Write a function `sortBy` that takes an array and a callback. The callback returns a value to sort by. Return a new sorted array. Do not use `sort`.

7. Write a function `everyItem` that takes an array and a callback. Return `true` only if the callback returns `true` for every item. Do not use `every`.

8. Write a function `someItem` that takes an array and a callback. Return `true` if the callback returns `true` for at least one item. Do not use `some`.

9. Write a function `chain` that takes an array and multiple callbacks. Each callback is applied to the result of the previous one. Return the final result.

10. Write a function `memoize` that takes a callback and caches its results. If called again with the same argument, return the cached result instead of calling the callback.

11. Write a function `compose` that takes two callbacks. Return a new function that, when called, passes its argument through the first callback, then the second, and returns the result.

12. Write a function `partial` that takes a callback and a preset argument. Return a new function that calls the original callback with the preset argument plus any new arguments.

---

## Level 3 — Callbacks Combined with Arrays, Loops, and Objects

1. Write a function `forEachObject` that takes an object and a callback. The callback receives each key-value pair. Call it with a callback that logs `"key: value"` for each pair.

2. Write a function `mapObject` that takes an object and a callback. Return a new object where each value is transformed by the callback. Keys stay the same.

3. Write a function `filterObject` that takes an object and a callback. Return a new object with only key-value pairs where the callback returns `true`.

4. Write a function `reduceArray` that takes an array, a callback, and an initial value. The callback takes an accumulator and current item. Return the final accumulator. Do not use `reduce`.

5. Write a function `flatten` that takes a nested array and a callback. The callback decides whether to flatten deeper or keep the current level. Return a flattened array.

6. Write a function `zip` that takes two arrays and a callback. The callback combines items at the same index. Return a new array of combined items. Stop at the shorter array's length.

7. Write a function `partition` that takes an array and a callback. Return an array of two arrays: one where the callback returned `true`, one where it returned `false`.

8. Write a function `pluck` that takes an array of objects and a callback. The callback returns a property name. Return an array of those property values.

9. Write a function `uniqueBy` that takes an array and a callback. The callback returns a value to compare. Return a new array with duplicates removed based on that value.

10. Write a function `intersection` that takes two arrays and a callback. The callback compares items. Return items that exist in both arrays according to the callback.

11. Write a function `difference` that takes two arrays and a callback. Return items in the first array that are not in the second, according to the callback.

12. Write a function `merge` that takes two objects and a callback. For conflicting keys, the callback decides which value to keep. Return the merged object.

---

## Level 4 — Callbacks Combined with Classes, DOM Events, and User Interactions

1. Create a `Button` class. The constructor takes a label and a callback. The callback runs when the button is clicked. Create multiple buttons with different callbacks.

2. Create a `Counter` class. It takes a starting value and a callback. The callback runs every time the counter changes, receiving the new value. Wire increment and decrement buttons.

3. Create a `FormField` class. It takes a validation callback. The callback receives the field's value and returns `true` or `false`. Call the callback on every input event.

4. Create a `TodoList` class. It takes an array and a callback. The callback runs whenever the list changes (add, remove, toggle). The callback receives the entire updated array.

5. Create a `Timer` class. It takes a duration and two callbacks: one that runs every tick, one that runs when finished. Start, stop, and reset methods call the callbacks appropriately.

6. Create a `Dropdown` class. It takes an array of options and a callback. The callback runs when an option is selected, receiving the selected value. Render the dropdown to the DOM.

7. Create a `Modal` class. It takes content and two callbacks: `onOpen` and `onClose`. These run when the modal opens or closes. Wire open/close buttons.

8. Create a `DataTable` class. It takes an array of objects and a column configuration. A callback runs when a column header is clicked, receiving the column name. Sort the data using that callback.

9. Create a `Slider` class. It takes min, max, and a callback. The callback runs whenever the slider value changes, receiving the new value. Display the value in real time.

10. Create a `Notification` class. It takes a message and a callback. The callback runs when the notification is dismissed. Auto-dismiss after a delay, also triggering the callback.

11. Create a `DragList` class. It takes an array and a callback. The callback runs when items are reordered, receiving the new order. Use mouse events to track dragging.

12. Create a `SearchBox` class. It takes an array and a callback. The callback runs on every keystroke, receiving the search term and the filtered results. Debounce the callback so it doesn't fire too often.

---

## Level 5 — Real-World Asynchronous Callbacks

1. Write a function `delay` that takes milliseconds and a callback. After the delay, the callback runs. Do not use `setTimeout` directly in the calling code.

2. Write a function `repeatEvery` that takes milliseconds and a callback. The callback runs repeatedly at that interval. Return a function that stops the repetition.

3. Write a function `runSequence` that takes an array of functions. Each function takes a callback as its last argument. Run them one after another, passing the previous result to the next.

4. Write a function `retry` that takes a callback, a max attempt count, and a delay. If the callback throws an error, wait and retry up to the max. Return the result or throw after max attempts.

5. Write a function `parallel` that takes an array of callbacks. Each callback takes a `done` callback. Run all in parallel. Call a final callback when all are done, receiving all results.

6. Write a function `waterfall` that takes an array of callbacks. Each callback receives the previous result and a `next` callback. Pass results through the chain.

7. Write a function `throttle` that takes a callback and a delay. The callback can only run once per delay period. Extra calls during the delay are ignored.

8. Write a function `debounce` that takes a callback and a delay. The callback only runs after the delay period with no new calls. If called again during the delay, restart the timer.

9. Write a function `poll` that takes a callback and an interval. The callback checks some condition. If the condition is met, stop polling and call a completion callback. If not, keep polling.

10. Write a function `cacheWithExpiry` that takes a callback and a TTL. The callback fetches data. Cache the result. If called again within TTL, return cached result. If expired, fetch again.

11. Write a function `queue` that takes a callback and a concurrency limit. Add tasks to a queue. Run up to the limit simultaneously. When one finishes, start the next from the queue.

12. Write a function `race` that takes an array of callbacks. Each callback takes a `done` callback. Run all in parallel. Call a final callback with the result of the first one to finish. Ignore the rest.

---

Work through these in order. Each level builds the mental model for the next. By Level 5, you'll naturally understand why callbacks are the foundation of JavaScript's asynchronous nature.