 # JavaScript DOM Practice Problems: `getElementById()` Focus

## Level 1: Basic DOM Understanding

1. Create an HTML page with a `<p>` element containing "Hello World". Use `getElementById()` to change its text to "Hello DOM".

2. Create a `<div>` with some text inside. Use `getElementById()` to change its background color to blue.

3. Create an empty `<div>` with an ID. Use `getElementById()` to set its `innerHTML` to a `<strong>` tag with the text "Bold Text".

4. Create a `<p>` element with an ID. Use `getElementById()` to change its font size to 24px.

5. Create a `<span>` with an ID. Use `getElementById()` to change its text color based on a variable value: if the variable is "red", make it red; otherwise, make it black.

6. Create an `<img>` tag with an ID and a default `src`. Use `getElementById()` to swap the image source to a different URL when the page loads.

7. Create a `<div>` with an ID. Use `getElementById()` to toggle its visibility: if it's visible, hide it; if it's hidden, show it.

8. Create a `<button>` with an ID. Use `getElementById()` to disable the button.

9. Create a `<p>` with an ID. Use `getElementById()` to add a CSS class name to it (assume the class is already defined in your CSS).

10. Create two `<div>` elements with different IDs. Use `getElementById()` to copy the text content from the first div into the second div.

---

## Level 2: Functions + DOM

11. Write a function `updateText(id, newText)` that takes an element ID and a string, then uses `getElementById()` to update that element's text content.

12. Write a function `setColor(id, color)` that changes the text color of the element with the given ID.

13. Write a function `doubleSize(id)` that reads the current font size of an element (parse the number from `element.style.fontSize`), doubles it, and applies the new size.

14. Write a function `swapContent(id1, id2)` that swaps the `innerHTML` of two elements using a temporary variable.

15. Write a function `appendText(id, text)` that adds the given text to the end of the element's current text content, with a space separator.

16. Write a function `resetStyles(id)` that clears all inline styles from an element by setting `element.style.cssText` to an empty string.

17. Write a function `countChars(id)` that counts the characters in an element's text and displays the count in another element with ID "char-count".

18. Write a function `mirrorInput(inputId, outputId)` that updates the output element to match whatever is typed in an input field. Call this function on an input's `oninput` event.

19. Write a function `validateNotEmpty(id)` that checks if an input field is empty. If it is, change its border color to red; otherwise, change it to green.

20. Write a function `generateRandomColor()` that returns a random hex color string, and a function `applyRandomColor(id)` that applies this random color to an element's background.

---

## Level 3: Arrays + DOM

21. Create an array of strings: `["Apple", "Banana", "Cherry"]`. Use a loop and `getElementById()` to display each item as a separate `<li>` inside a `<ul>` with ID "fruit-list".

22. Create an array of numbers. Write a function that uses `getElementById()` to display the sum of all numbers in a `<div>` with ID "sum-display".

23. Create an array of colors. Write a function that cycles through the array and applies each color as the background of a `<div>` with ID "color-box" each time a button is clicked.

24. Create an array of student names. Use a loop to create a `<p>` element for each name and append them all as `innerHTML` to a container `<div>` with ID "students".

25. Create an array of objects representing books (each with `title` and `author`). Render them as a formatted string inside a `<div>` with ID "library", with each book on a new line.

26. Create an array of numbers. Write a function that finds the maximum value and displays it in an element with ID "max-value". Do not use `Math.max()`.

27. Create an array of strings. Write a function that reverses the array and displays the reversed list as comma-separated text in an element with ID "reversed".

28. Create two arrays of equal length. Write a function that pairs them up (index-wise) and displays each pair as "Name: Score" lines in a `<div>` with ID "scores".

29. Create an array of numbers. Write a function that filters out numbers less than 10 and displays the filtered array in an element with ID "filtered".

30. Create an array of words. Write a function that counts how many words start with the letter "A" (case-insensitive) and displays the count in an element with ID "a-count".

---

## Level 4: Objects/Classes + DOM

31. Create an object `user` with properties `name`, `age`, and `email`. Write a function that displays all properties as formatted text in a `<div>` with ID "profile".

32. Create an object `product` with `name`, `price`, and `quantity`. Write a function `getTotalPrice()` that calculates `price * quantity` and displays the result in an element with ID "total".

33. Create a class `Counter` with a `count` property and methods `increment()`, `decrement()`, and `display(id)`. The `display` method should use `getElementById()` to show the current count. Wire the increment and decrement methods to button clicks.

34. Create a class `TodoItem` with properties `text` and `completed` (boolean). Create an array of `TodoItem` instances. Write a method that renders all items in a `<div>` with ID "todos", showing completed items with a strikethrough style.

35. Create a class `BankAccount` with properties `owner` and `balance`. Include methods `deposit(amount)`, `withdraw(amount)`, and `display(id)`. The display method should show the owner and balance. Prevent withdrawal if it would make the balance negative, and show an alert via a `<div>` with ID "message".

36. Create a class `Student` with properties `name` and `grades` (array). Include a method `getAverage()` that calculates the average grade, and `render(id)` that displays the name and average in the given element.

37. Create a class `ShoppingCart` with an `items` array (each item is an object with `name` and `price`). Include methods `addItem(name, price)`, `removeLastItem()`, `getTotal()`, and `render(id)` that displays all items and the total price.

38. Create an object `settings` with properties `theme` ("light" or "dark") and `fontSize` (number). Write a function `applySettings(id)` that reads the object and applies the theme as a background/text color combo and the font size to the element.

39. Create a class `Timer` with properties `seconds` and `intervalId`. Include methods `start(displayId)`, `stop()`, and `reset()`. The `start` method should increment `seconds` every second and update the display element using `getElementById()`.

40. Create a class `Quiz` with a `questions` array (each question is an object with `question`, `options` array, and `correctIndex`). Include a method `renderQuestion(index, containerId)` that displays the question text and options as buttons in the container.

---

## Level 5: Logic Challenges

41. Create a number guessing game. Generate a random number between 1 and 100. The user types a guess in an input field and clicks a button. Display "Too High", "Too Low", or "Correct!" in a `<div>` with ID "feedback". Track the number of guesses in another element with ID "attempts". Do not use `querySelector`.

42. Create a palindrome checker. The user enters text in an input field. On button click, check if the text reads the same forwards and backwards (ignore spaces and case). Display "Palindrome" or "Not a Palindrome" in an element with ID "result".

43. Create a FizzBuzz renderer. When a button is clicked, generate numbers 1 through 50. For multiples of 3, display "Fizz"; for multiples of 5, display "Buzz"; for both, display "FizzBuzz"; otherwise display the number. Render all results as a comma-separated string in a `<div>` with ID "fizzbuzz-output".

44. Create a password validator. The user types in an input field. On each keystroke, check: at least 8 characters, at least one number, at least one uppercase letter. Display three checkmarks or X marks in a `<div>` with ID "validation" for each criterion.

45. Create a simple calculator with two input fields (numbers), and buttons for +, -, *, /. Use `getElementById()` for all elements. Display the result in an element with ID "calc-result". Include a "Clear" button that resets both inputs and the result.

46. Create a word frequency counter. The user enters a paragraph in a `<textarea>`. On button click, count how many times each word appears (case-insensitive, ignore punctuation). Display the top 3 most frequent words and their counts in a `<div>` with ID "frequency".

47. Create a tic-tac-toe board using 9 `<div>` elements with IDs "cell-0" through "cell-8". Implement game logic: alternate between X and O on click, check for a winner after each move, display the winner in an element with ID "winner", and include a "Reset" button.

48. Create a simple memory game. Use 6 pairs of numbers (1-1, 2-2, 3-3, 4-4, 5-5, 6-6) hidden behind 12 buttons with IDs "card-0" through "card-11". When a card is clicked, reveal its number. If two revealed cards match, keep them revealed. If not, hide them again after 1 second. Track moves in an element with ID "moves".

49. Create a prime number finder. The user enters a number in an input field. On button click, find all prime numbers up to that number and display them as a comma-separated list in a `<div>` with ID "primes". Implement your own prime-checking logic without built-in math libraries.

50. Create a Roman numeral converter. The user enters a number (1-3999) in an input field. On button click, convert it to Roman numerals and display in an element with ID "roman". Implement the conversion logic yourself using arrays or objects for the numeral mappings.

---

## Level 6: Mini Projects

51. **Interactive Score Tracker**: Create a score tracker for a 2-player game. Two buttons with IDs "player1-score" and "player2-score" increment respective scores. Display both scores in elements with IDs "p1-display" and "p2-display". Include a "Reset" button. First to 10 wins — display the winner in an element with ID "game-winner" and disable the score buttons.

52. **Dynamic Shopping List**: Create an input field with ID "item-input" and a button "Add Item". When clicked, add the item to an array and render the entire array as a bulleted list inside a `<div>` with ID "list-container". Include a "Remove Last" button and a "Clear All" button. Display the total number of items in an element with ID "item-count".

53. **Character Stats Builder**: Create a class `Character` with properties `name`, `strength`, `agility`, `intelligence` (all start at 5). Create buttons "Train Strength", "Train Agility", "Train Intelligence" that increment the respective stat by 1 (max 20 each). Display all stats in a `<div>` with ID "stats". Include 10 "skill points" — decrement on each training, disable buttons when points reach 0. Display remaining points in an element with ID "points".

54. **Simple Quiz App**: Create an array of 5 question objects, each with `question`, `options` (array of 4), and `correctIndex`. Display the current question and options as buttons in a `<div>` with ID "quiz-container". Track the current question index and score. When an option is clicked, check if correct, increment score if so, then show the next question. At the end, display the final score out of 5 in an element with ID "final-score" and show a "Restart" button.

55. **Event Log Monitor**: Create a system with three buttons with IDs "btn-a", "btn-b", "btn-c". Each button click appends a timestamped message to an array (e.g., "Button A clicked at 14:32:05"). Display the last 10 messages in reverse chronological order in a `<div>` with ID "event-log". Include a "Clear Log" button that empties the array and display.

56. **Budget Tracker**: Create input fields for "Description" and "Amount", and two buttons "Add Income" and "Add Expense". Store transactions in an array of objects with `desc`, `amount`, and `type` ("income" or "expense"). Display all transactions in a `<div>` with ID "transactions". Calculate and display total income, total expenses, and current balance in elements with IDs "total-income", "total-expense", and "balance". Include a "Delete Last" button.

57. **Pattern Generator**: Create an input field for a number N and a dropdown for pattern type: "Triangle", "Square", "Diamond". On button click, generate the pattern using asterisks (*) and display it inside a `<pre>` tag with ID "pattern-output". For example, N=3 Triangle should display:
```
*
**
***
```
Implement the logic using nested loops and string building.

58. **Hangman Game**: Create a hidden word (hardcoded as a string). Display blanks as underscores in a `<div>` with ID "word-display" (e.g., "_ _ _ _" for "code"). Create buttons A-Z (or an input field). When a letter is guessed, reveal it in all correct positions. Track wrong guesses in an array and display them in an element with ID "wrong-letters". After 6 wrong guesses, display "Game Over" in an element with ID "game-status". If the word is fully revealed, display "You Win!". Include a "New Game" button.

59. **Grade Calculator**: Create input fields for 5 subject scores (0-100). On button click, store them in an array, calculate the average, and determine the grade: A (90+), B (80-89), C (70-79), D (60-69), F (<60). Display the average in an element with ID "average", the grade letter in an element with ID "grade-letter", and a color-coded message (green for A/B, yellow for C/D, red for F) in an element with ID "grade-message". Validate that all inputs are numbers between 0 and 100.

60. **Simon Says Game**: Create four colored buttons with IDs "green", "red", "yellow", "blue". The game generates a random sequence of colors (start with 3, add 1 each round). Flash each color in sequence by temporarily changing its brightness/opacity. The user must click the colors in the same order. Track the current round in an element with ID "round". If the user makes a mistake, display "Game Over" and the final score (round number) in an element with ID "final-score". Include a "Start Game" button that initializes the sequence. Do not use `setInterval` — use a recursive function with `setTimeout` for the flashing sequence.

61. **Contact Book**: Create input fields for "Name" and "Phone". Store contacts in an array of objects. On "Add Contact", validate that the name is not empty and the phone contains only numbers. Add to the array and render all contacts as formatted text in a `<div>` with ID "contacts". Include a "Search" input field that filters the displayed contacts by name as you type. Include "Sort by Name" and "Sort by Phone" buttons that reorder the array and re-render.

62. **Recipe Converter**: Create an object `recipe` with properties `name`, `servings` (default 4), and `ingredients` (array of objects with `name`, `amount`, `unit`). Display the recipe in a `<div>` with ID "recipe-display". Create an input field for "New Servings" and a "Scale" button. Calculate the scaling factor (`newServings / originalServings`) and update all ingredient amounts accordingly, then re-render. Round amounts to 2 decimal places. Include a "Reset" button that restores original amounts.

63. **Task Priority Queue**: Create an input field for "Task" and a dropdown for "Priority" (High, Medium, Low). Store tasks in an array of objects with `text`, `priority` (numeric: High=3, Medium=2, Low=1), and `id` (timestamp). On "Add Task", add to the array, sort by priority descending, and render as a numbered list in a `<div>` with ID "task-list". Include a "Complete" button next to each task that removes it from the array and re-renders. Display the total pending tasks in an element with ID "pending-count".

64. **Multiplication Table Generator**: Create an input field for a number N and a button "Generate". Create a function that builds an N×N multiplication table as an HTML string using `<table>`, `<tr>`, and `<td>` tags. Display the table inside a `<div>` with ID "table-container". Style the diagonal (where row === col) with a different background color. Include a "Highlight Multiples of 3" checkbox that, when checked, re-renders the table with multiples of 3 highlighted in yellow.

65. **Text Analyzer Tool**: Create a `<textarea>` with ID "text-input" and a "Analyze" button. On click, calculate and display: total character count (with spaces), total character count (without spaces), word count, sentence count (count periods, exclamation marks, question marks), average word length, and longest word. Display all statistics in a `<div>` with ID "stats-panel" with clear labels. Include a "Find and Replace" section with two input fields and a button that replaces all occurrences of a word in the text and updates the textarea and statistics.

---

*Total: 65 unique practice problems*