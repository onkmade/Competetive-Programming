My current learning topics are:

* Classes
* Arrays
* Objects
* DOM fundamentals using `document.getElementById()`

The goal is to deeply practice combining these concepts together in real programming scenarios.

 # JavaScript Programming Challenges
## Functional Thinking & Problem-Solving Collection

---

# LEVEL 1: Classes Basics
*(Focus: Constructors, Methods, Properties)*

### Challenge 1.1
Create a `Car` class with properties for `make`, `model`, and `year`. Add a method `getAge()` that returns how many years old the car is based on the current year. Create three car instances and log each car's age.

### Challenge 1.2
Create a `Rectangle` class with `width` and `height` properties. Add methods `getArea()`, `getPerimeter()`, and `isSquare()`. Create five rectangles, store them in an array, and log only the ones that are squares.

### Challenge 1.3
Create a `Book` class with `title`, `author`, `pages`, and `readPages` properties. Add methods `readMore(pages)` that increases `readPages`, `getProgress()` that returns percentage read, and `isFinished()` that returns a boolean. Create a book, read some pages, and display the progress.

### Challenge 1.4
Create a `BankAccount` class with `ownerName`, `balance`, and `accountType` properties. Add methods `deposit(amount)`, `withdraw(amount)`, and `getBalance()`. Ensure `withdraw` cannot make balance negative. Create two accounts and perform several transactions on each.

### Challenge 1.5
Create a `Student` class with `name`, `grade`, and `subjects` (an array of subject names). Add a method `addSubject(subject)` that adds to the array only if it doesn't already exist. Add a method `removeSubject(subject)` that removes it if found. Create a student, add five subjects, remove two, and log the final list.

### Challenge 1.6
Create a `Product` class with `name`, `price`, and `quantity`. Add methods `getTotalValue()` (price × quantity), `restock(amount)` that increases quantity, and `sell(amount)` that decreases quantity but prevents negative stock. Create three products and calculate the total inventory value.

### Challenge 1.7
Create a `Playlist` class with `name` and `songs` (array of song objects with `title` and `duration`). Add methods `addSong(title, duration)`, `removeSong(title)`, `getTotalDuration()`, and `getSongCount()`. Create a playlist, add ten songs, remove three, and display total duration and song count.

### Challenge 1.8
Create a `TodoItem` class with `text`, `priority` (1-3), and `completed` (boolean). Add methods `toggleComplete()`, `setPriority(level)`, and `getInfo()` that returns a formatted string. Create five todo items, toggle some as complete, change priorities, and log their info.

### Challenge 1.9
Create a `Circle` class with `radius`. Add methods `getDiameter()`, `getCircumference()`, `getArea()`, and `scale(factor)` that multiplies the radius. Create a circle, scale it three times with different factors, and log all measurements after each scale.

### Challenge 1.10
Create a `Person` class with `firstName`, `lastName`, and `birthYear`. Add methods `getFullName()`, `getAge()`, and `setLastName(newLastName)`. Create three people, change one person's last name, and log everyone's full name and age.

---

# LEVEL 2: Classes + Arrays
*(Focus: Storing instances, array operations, filtering, searching)*

### Challenge 2.1
Create a `Movie` class with `title`, `director`, `rating`, and `genre`. Create an array of 8 movies. Write a function that returns all movies with a rating above 7.5. Write another function that groups movies by genre into an object where keys are genres and values are arrays of movie titles.

### Challenge 2.2
Create a `Player` class with `name`, `score`, and `level`. Create an array of 10 players. Write a function `getTopPlayers(n)` that returns the top n players sorted by score. Write a function `levelUpPlayers(minScore)` that increases the level of all players above that score by 1.

### Challenge 2.3
Create a `Task` class with `description`, `category`, `urgent` (boolean), and `done` (boolean). Create an array of 12 tasks. Write a function that returns only urgent incomplete tasks sorted by category. Write a function that marks all tasks in a given category as done.

### Challenge 2.4
Create an `Employee` class with `name`, `department`, `salary`, and `yearsEmployed`. Create an array of 15 employees. Write a function that calculates the average salary per department and returns it as an object. Write a function that gives a 10% raise to employees with more than 5 years employed.

### Challenge 2.5
Create a `FoodItem` class with `name`, `calories`, `protein`, and `carbs`. Create an array of 20 food items. Write a function `getHighProteinItems(minProtein)` that returns items meeting the threshold. Write a function `getDailyTotals(selectedItems)` that takes an array of item names and returns total calories, protein, and carbs.

### Challenge 2.6
Create a `Customer` class with `name`, `id`, `orders` (array of order amounts), and `isVIP` (boolean, true if total orders > $1000). Create an array of 10 customers. Write a function that returns all VIP customers. Write a function that adds a new order to a customer by ID and recalculates VIP status.

### Challenge 2.7
Create a `Classroom` class with `roomNumber`, `teacher`, and `students` (array of student names). Create an array of 5 classrooms. Write a function `findStudent(studentName)` that returns which room(s) contain that student. Write a function `transferStudent(name, fromRoom, toRoom)`.

### Challenge 2.8
Create a `GameCharacter` class with `name`, `health`, `attackPower`, and `inventory` (array of item strings). Create an array of 6 characters. Write a function `findWeakest()` that returns the character with lowest health. Write a function `equipItem(characterName, item)` that adds an item to a character's inventory only if they have fewer than 5 items.

### Challenge 2.9
Create a `Song` class with `title`, `artist`, `plays`, and `liked` (boolean). Create an array of 15 songs. Write a function `getMostPlayed(n)` that returns top n songs by plays. Write a function `toggleLike(title)` that finds and flips the liked status. Write a function `getLikedSongs()` that returns only liked songs grouped by artist.

### Challenge 2.10
Create a `Project` class with `name`, `status` (pending/active/completed), `teamMembers` (array), and `budget`. Create an array of 8 projects. Write a function `getActiveProjects()` that returns active ones sorted by budget. Write a function `addMember(projectName, member)` that adds a member only if the project is active and has fewer than 5 members.

### Challenge 2.11
Create a `Grade` class with `studentName`, `subject`, and `score` (0-100). Create an array of 30 grades. Write a function `getStudentReport(name)` that returns all grades for that student with letter grades (A:90+, B:80+, etc.). Write a function `getClassAverage(subject)` that returns the average for a subject.

### Challenge 2.12
Create a `Pet` class with `name`, `species`, `age`, and `owner`. Create an array of 12 pets. Write a function `getPetsByOwner(ownerName)` that returns all pets belonging to an owner. Write a function `getOldestPetPerSpecies()` that returns an object with the oldest pet of each species.

### Challenge 2.13
Create a `Transaction` class with `id`, `type` (income/expense), `amount`, and `category`. Create an array of 25 transactions. Write a function `getBalance()` that calculates net balance. Write a function `getCategoryTotals()` that returns total income and expense per category as nested objects.

### Challenge 2.14
Create a `ProductReview` class with `productName`, `reviewer`, `rating` (1-5), and `text`. Create an array of 20 reviews. Write a function `getAverageRating(productName)`. Write a function `getLowRatedProducts(threshold)` that returns products with average rating below the threshold.

### Challenge 2.15
Create a `Team` class with `name`, `sport`, `players` (array of player objects with name and position), and `wins`. Create an array of 4 teams. Write a function `getRoster(teamName)` that returns players by position. Write a function `tradePlayer(playerName, fromTeam, toTeam)` that moves a player between teams.

---

# LEVEL 3: Objects + Arrays + Methods
*(Focus: Nested objects, complex data structures, data transformation)*

### Challenge 3.1
Create an object `school` with properties `name`, `departments` (array of objects with `deptName` and `courses` array). Each course has `courseName`, `credits`, and `enrolledStudents` (array of student names). Write methods to: add a department, add a course to a department, enroll a student in a course, and get all students in a department.

### Challenge 3.2
Create an object `library` with `books` (array of objects with `title`, `author`, `isbn`, `borrowedBy`, and `isAvailable`). Write methods to: borrow a book by ISBN (stores borrower name, marks unavailable), return a book, get all books borrowed by a person, and get available books by a specific author.

### Challenge 3.3
Create an object `restaurant` with `menu` (array of category objects, each with `categoryName` and `items` array). Each item has `name`, `price`, and `isVegetarian`. Write methods to: add a menu item to a category, get all vegetarian items across categories, get items in a price range, and calculate the total for an order (array of item names).

### Challenge 3.4
Create an object `hospital` with `patients` (array of patient objects with `id`, `name`, `records` array). Each record has `date`, `diagnosis`, and `treatment`. Write methods to: admit a patient, add a record, get patient history by ID, get all patients with a specific diagnosis, and get patients with no records.

### Challenge 3.5
Create an object `store` with `inventory` (object where keys are product names and values are objects with `price`, `stock`, and `category`). Write methods to: add a product, update stock, get products in a category, get low stock items (below threshold), and calculate cart total (cart is array of `{product, quantity}` objects).

### Challenge 3.6
Create an object `fitnessTracker` with `users` (array of user objects with `name`, `workouts` array). Each workout has `date`, `type`, `duration`, and `caloriesBurned`. Write methods to: add a user, log a workout, get total calories burned by user, get workouts by type, and find the user with the most workouts.

### Challenge 3.7
Create an object `election` with `candidates` (array of objects with `name`, `party`, and `votes` array of numbers per district). Write methods to: add a candidate, add votes for a candidate in a district, get total votes per candidate, get winner, and get district-wise breakdown as an object.

### Challenge 3.8
Create an object `university` with `students` (array of objects with `id`, `name`, `enrolledCourses` array of course codes). Also has `courses` (array of objects with `code`, `name`, `capacity`, and `enrolled` count). Write methods to: enroll a student in a course (check capacity), drop a course, get a student's schedule, and get courses with available seats.

### Challenge 3.9
Create an object `gameWorld` with `locations` (array of objects with `name`, `description`, `items` array, and `connections` array of location names). Write methods to: add a location, connect two locations, add an item to a location, get items at a location, and find a path between two locations (return array of location names).

### Challenge 3.10
Create an object `company` with `employees` (array of objects with `id`, `name`, `managerId`, `department`, and `salary`). Write methods to: add an employee, get direct reports of a manager, get all subordinates (direct and indirect), get department salary total, and find the highest paid employee in each department.

### Challenge 3.11
Create an object `recipeBox` with `recipes` (array of objects with `name`, `ingredients` array of `{name, amount, unit}`, `servings`, and `instructions`). Write methods to: add a recipe, scale a recipe to a new serving size (adjust ingredient amounts), get recipes that can be made with given ingredients (array of names), and get shopping list for selected recipes.

### Challenge 3.12
Create an object `busSystem` with `routes` (array of objects with `routeNumber`, `stops` array of stop names, and `schedule` array of departure times). Write methods to: add a route, add a stop to a route, get routes passing through a stop, get next departure time from a stop given current time, and get total stops in the system.

### Challenge 3.13
Create an object `musicFestival` with `stages` (array of objects with `name`, `performances` array of `{artist, startTime, duration}`). Write methods to: add a stage, schedule a performance (check for time conflicts), get schedule for a stage sorted by time, get all performances by an artist, and find which stage has the most performances.

### Challenge 3.14
Create an object `flightSystem` with `flights` (array of objects with `flightNumber`, `origin`, `destination`, `departure`, `arrival`, `passengers` array of names, and `seats` total). Write methods to: add a flight, book a passenger (check seats), cancel a booking, get passengers on a flight, and get flights between two cities.

### Challenge 3.15
Create an object `gradebook` with `assignments` (array of objects with `name`, `totalPoints`, and `grades` object where keys are student names and values are scores). Write methods to: add an assignment, add a grade, get student average across all assignments, get class average for an assignment, and get students below a threshold on an assignment.

---

# LEVEL 4: Classes + DOM
*(Focus: Rendering data, event handling, updating UI from class instances)*

### Challenge 4.1
Create a `Counter` class with `value`, `step`, `min`, and `max` properties. Create an HTML page with a display element and four buttons: Increment, Decrement, Reset, and Double Step. Use `getElementById` to wire buttons to class methods. The display should update after every action. Prevent going below min or above max.

### Challenge 4.2
Create a `Flashcard` class with `question`, `answer`, and `isFlipped` properties. Create an array of 10 flashcards. Build an HTML page that displays one card at a time with "Previous", "Next", and "Flip" buttons. Use `getElementById` to update the display. Show question by default, flip shows answer.

### Challenge 4.3
Create a `Timer` class with `seconds`, `isRunning`, and `intervalId` properties. Build a stopwatch HTML page with Start, Pause, Reset, and Lap buttons. Use `getElementById` to display elapsed time. Store lap times in an array and render them below the timer. Format time as MM:SS.

### Challenge 4.4
Create a `Note` class with `id`, `text`, `color`, and `createdAt` properties. Build a sticky notes app HTML page with an input, color picker, and "Add Note" button. Display notes in a container. Each note should have a Delete button. Use `getElementById` for all DOM access. Store notes in an array and re-render on changes.

### Challenge 4.5
Create a `Calculator` class with `currentValue`, `previousValue`, and `operation` properties. Build a calculator UI with number buttons (0-9), operation buttons (+, -, *, /), equals, clear, and a display. Use `getElementById` to wire everything. Handle decimal points and division by zero.

### Challenge 4.6
Create a `QuizQuestion` class with `question`, `options` (array), `correctIndex`, and `selectedIndex` properties. Create an array of 5 quiz questions. Build a quiz UI that shows one question at a time with radio buttons for options. Include Next and Submit buttons. Track score and show final result. Use `getElementById` only.

### Challenge 4.7
Create a `BudgetItem` class with `description`, `amount`, and `type` (income/expense). Build a budget tracker HTML page with inputs for description, amount, and type (dropdown), plus an "Add" button. Display all items in a list. Show total income, total expenses, and balance at the top. Use `getElementById` for all elements.

### Challenge 4.8
Create a `Contact` class with `name`, `phone`, `email`, and `category` (friend/family/work). Build a contact manager HTML page with input fields and an "Add Contact" button. Display contacts grouped by category. Include a search input that filters contacts by name. Use `getElementById` only.

### Challenge 4.9
Create a `Pomodoro` class with `workMinutes`, `breakMinutes`, `cycles`, and `currentCycle` properties. Build a Pomodoro timer HTML page with Start, Pause, and Reset buttons. Display countdown timer, current mode (Work/Break), and cycle count. Automatically switch between work and break. Use `getElementById` for all DOM access.

### Challenge 4.10
Create a `ShoppingItem` class with `name`, `quantity`, `category`, and `purchased` properties. Build a shopping list HTML page with inputs and an "Add Item" button. Display items with checkboxes to mark purchased. Group by category. Show total items and items remaining. Use `getElementById` only.

### Challenge 4.11
Create a `Dice` class with `sides`, `value`, and `rollCount` properties. Build a dice roller HTML page with buttons for d4, d6, d8, d10, d12, d20. Display the rolled value, total rolls, and a history of last 10 rolls. Use `getElementById` for all elements. Include a "Roll Two Dice" button that sums results.

### Challenge 4.12
Create a `Habit` class with `name`, `streak`, `lastCompleted`, and `bestStreak` properties. Build a habit tracker HTML page with an input to add habits. Display each habit with its current streak, best streak, and a "Complete Today" button. Streak breaks if not completed within 24 hours. Use `getElementById` only.

### Challenge 4.13
Create a `MemoryCard` class with `id`, `icon`, `isFlipped`, and `isMatched` properties. Build a memory game with 16 cards (8 pairs). Cards start face down. Clicking flips a card. Two flipped cards check for match. Matched cards stay face up. Track moves and matches. Use `getElementById` for the game board and stats.

### Challenge 4.14
Create a `ColorPalette` class with `name`, `colors` (array of hex strings), and `isLocked` (array of booleans matching colors). Build a color palette generator HTML page. Display 5 color swatches with lock buttons. "Generate" button creates new random colors for unlocked swatches. Clicking a color copies its hex to clipboard. Use `getElementById` only.

### Challenge 4.15
Create a `TypingTest` class with `targetText`, `userInput`, `startTime`, `endTime`, and `errors` properties. Build a typing speed test HTML page. Display target text. User types in an input. Track WPM, accuracy percentage, and error count. Show results when text matches target exactly. Use `getElementById` for all elements.

---

# LEVEL 5: Logic-Heavy System Challenges
*(Focus: Complex interactions, state management, business logic)*

### Challenge 5.1
**Student Grade Manager System**
Create a `Student` class with `id`, `name`, and `grades` (object with subject keys and array of score values). Create a `GradeManager` class that holds an array of students. Build an HTML page with inputs to add students, add grades (student ID, subject, score), and view reports. Reports include: student GPA (all subjects), subject average, class rank, and honor roll (GPA > 3.5). Use `getElementById` for all DOM elements. Implement search by student ID.

### Challenge 5.2
**Library Management System**
Create a `Book` class with `isbn`, `title`, `author`, `copies`, and `borrowedBy` (array of member IDs). Create a `Member` class with `id`, `name`, and `borrowedBooks` (array of ISBNs). Create a `Library` class managing arrays of books and members. Build an HTML page to: add books, register members, borrow books (check availability and member limit of 3), return books, and view overdue list (books borrowed > 14 days). Use `getElementById` only.

### Challenge 5.3
**Restaurant Order System**
Create a `MenuItem` class with `id`, `name`, `price`, `category`, and `prepTime`. Create an `Order` class with `id`, `items` (array of menu item IDs), `status` (pending/cooking/ready/served), and `total`. Create a `Kitchen` class managing orders array. Build an HTML page with a menu display, "Add to Order" buttons, order summary with running total, and a kitchen view showing orders by status with "Advance Status" buttons. Use `getElementById` for all elements.

### Challenge 5.4
**Banking System with Accounts**
Create an `Account` class with `accountNumber`, `holderName`, `balance`, `type` (checking/savings), and `transactions` (array of `{type, amount, date, balanceAfter}`). Create a `Bank` class with accounts array. Build an HTML page to: open account, deposit, withdraw (savings needs $100 minimum balance), transfer between accounts, view transaction history, and calculate interest (2% for savings). Use `getElementById` for all DOM access.

### Challenge 5.5
**Inventory Management System**
Create a `Product` class with `sku`, `name`, `category`, `price`, `stock`, `minStock`, and `supplier`. Create a `Warehouse` class with products array. Build an HTML page with: product list showing stock levels (red if below minStock), add/edit product forms, restock function (adds to stock), sell function (decreases stock, prevents negative), low stock alert list, and total inventory value. Use `getElementById` only.

### Challenge 5.6
**Task Management with Dependencies**
Create a `Task` class with `id`, `title`, `duration` (hours), `dependencies` (array of task IDs that must complete first), `status` (blocked/ready/in-progress/completed), and `assignedTo`. Create a `Project` class with tasks array. Build an HTML page to: add tasks with dependency selection, auto-update status (blocked if dependencies not done), mark tasks complete, view critical path (longest chain of dependent tasks), and show workload per person. Use `getElementById` for all elements.

### Challenge 5.7
**Voting System**
Create a `Candidate` class with `id`, `name`, `party`, and `votes` (array of voter IDs to prevent duplicates). Create a `Voter` class with `id`, `name`, and `hasVoted` (boolean). Create an `Election` class managing both arrays. Build an HTML page to: register voters, register candidates, cast vote (one per voter, verify not voted), view live results (vote count and percentage per candidate), and determine winner (most votes, handle ties). Use `getElementById` only.

### Challenge 5.8
**Multiplayer Score Tracker**
Create a `Player` class with `name`, `scores` (array of round scores), and `totalScore`. Create a `Game` class with players array and `currentRound`. Build an HTML page to: add players, input scores per round for each player, automatically calculate totals and rankings, detect winner when a player reaches 100+ points, handle tiebreakers (compare previous rounds), and show round-by-round breakdown table. Use `getElementById` for all DOM access.

### Challenge 5.9
**Appointment Scheduler**
Create a `TimeSlot` class with `date`, `hour` (9-17), `isBooked`, and `appointment` (object with patientName and reason). Create a `Scheduler` class with slots array for the next 7 days. Build an HTML page with: day selector, hour grid showing booked/free slots, book appointment form, cancel appointment, view day's schedule, and find next available slot. Use `getElementById` for all elements.

### Challenge 5.10
**Expense Splitter**
Create a `Person` class with `name` and `paidAmount`. Create an `Expense` class with `description`, `totalAmount`, `paidBy` (person name), and `splitAmong` (array of person names). Create a `Group` class managing expenses. Build an HTML page to: add people to group, add expenses (who paid, split among whom), calculate who owes whom (settle debts to minimum transactions), and display balance sheet per person. Use `getElementById` only.

### Challenge 5.11
**Quiz Builder & Taker**
Create a `Question` class with `text`, `options`, `correctIndex`, and `points`. Create a `Quiz` class with `title`, `questions` array, and `timeLimit`. Build a two-mode HTML page: **Builder mode** to create quizzes (add questions, set correct answers, set time limit). **Taker mode** to select a quiz, take it with countdown timer, immediate feedback per question (optional), and final score with percentage. Use `getElementById` for all elements.

### Challenge 5.12
**Car Rental System**
Create a `Car` class with `id`, `make`, `model`, `year`, `dailyRate`, `isRented`, and `rentalHistory` (array of `{customer, days, totalCost}`). Create a `RentalCompany` class with cars array. Build an HTML page to: view available cars with filters (make, max rate), rent a car (enter customer name and days, calculate total), return a car, view rental history per car, and show revenue report (total earnings, most rented car). Use `getElementById` only.

### Challenge 5.13
**Fitness Challenge Tracker**
Create a `Participant` class with `name`, `activities` (array of `{type, duration, date, calories}`), and `goals` (object with weekly targets). Create a `Challenge` class with participants array and `week` number. Build an HTML page to: add participants, log activities (type: run/swim/cycle/yoga, auto-calculate calories based on type and duration), view weekly progress bars (percent of goal reached), leaderboard by total calories, and streak tracker (consecutive days with activity). Use `getElementById` for all elements.

### Challenge 5.14
**Ticket Booking System**
Create a `Event` class with `name`, `date`, `venue`, `seats` (2D array representing rows and seats, true=available). Create a `Booking` class with `eventName`, `seats` (array of `{row, seat}`), and `customerName`. Create a `BoxOffice` class managing events and bookings. Build an HTML page to: view events, select event to see seat map (grid of available/taken seats), click seats to select/deselect, book selected seats (prevent booking taken seats), view my bookings, and cancel booking. Use `getElementById` for all DOM access.

### Challenge 5.15
**Online Course Platform**
Create a `Course` class with `code`, `title`, `instructor`, `lessons` (array of `{title, duration, completedBy: []}`), and `enrolledStudents` (array of IDs). Create a `Student` class with `id`, `name`, and `completedLessons` (object mapping courseCode to array of lesson indices). Create a `Platform` class managing both. Build an HTML page with: student login (select from list), course catalog with enroll button (check prerequisites: previous course completed), lesson viewer with mark complete button, progress bar per course, and certificate view (100% completion). Use `getElementById` only.

---

# LEVEL 6: Mini Projects
*(Focus: Complete applications, multiple interacting classes, real-world simulation)*

### Challenge 6.1
**Personal Finance Dashboard**
Create the following classes: `Transaction` (amount, category, type, date, note), `Budget` (category, limit, spent), and `FinanceApp` (transactions array, budgets array). Build a complete HTML dashboard with: transaction entry form with category dropdown, monthly spending chart rendered as HTML bars (no canvas), budget vs actual comparison with color-coded status (green under budget, red over), transaction history table with delete option, category filter buttons, monthly summary cards (total income, total expenses, net savings, top spending category), and export data as formatted text. All DOM access via `getElementById`.

### Challenge 6.2
**Turn-Based Battle Game**
Create classes: `Character` (name, hp, maxHp, attack, defense, speed, skills array), `Skill` (name, damage, cooldown, currentCooldown), `Enemy` (extends Character, add loot), and `Battle` (player, enemy, turnCount, log array). Build an HTML battle screen with: player and enemy stat bars (HP as width percentage), action buttons (Attack, Skills list with cooldown indicators, Defend, Heal), battle log showing turn events, turn indicator, victory/defeat screen with loot drop, and new battle button. Defend reduces damage next turn. Speed determines who goes first. Use `getElementById` for all elements.

### Challenge 6.3
**Recipe Manager & Meal Planner**
Create classes: `Ingredient` (name, amount, unit), `Recipe` (name, servings, ingredients array, instructions array, prepTime, cookTime, category), `MealPlan` (date, meals object with breakfast/lunch/dinner keys as recipe names), and `RecipeApp` (recipes array, mealPlans array). Build an HTML app with: recipe form (add ingredients dynamically, add instruction steps), recipe cards with scaling calculator (adjust serving size), meal planner calendar (7 days, 3 meals per day, dropdown of recipes), shopping list generator (aggregates ingredients for selected meal plan week, combines duplicates, converts units), and search by ingredient. Use `getElementById` for all DOM access.

### Challenge 6.4
**Employee Shift Scheduler**
Create classes: `Employee` (id, name, role, maxHoursPerWeek, assignedShifts array), `Shift` (day, startHour, endHour, requiredRole), `Schedule` (weekStartDate, shifts array), and `Scheduler` (employees array, schedule object). Build an HTML app with: employee management (add, view, delete), shift template creation (select day, time, role), auto-scheduler button that assigns employees to shifts (respect max hours, match role requirements, prevent double-booking), manual override (drag-drop not required, use select dropdowns), weekly view grid (days as columns, hours as rows, colored cells showing assigned employee), conflict alerts, and hours summary per employee. Use `getElementById` for all elements.

### Challenge 6.5
**Study Tracker with Pomodoro**
Create classes: `Subject` (name, color, totalStudyTime, sessions array), `StudySession` (subject, startTime, duration, notes), `PomodoroTimer` (workMinutes, breakMinutes, longBreakMinutes, sessionsUntilLongBreak, currentSession), and `StudyApp` (subjects array, timer instance). Build an HTML app with: subject cards showing total time and session count, add subject form, Pomodoro timer with large countdown display, start/pause/reset buttons, automatic work/break cycling with session counter, session logging (when timer completes, log to selected subject), daily/weekly study statistics (total time per subject as HTML bars), goal setting (target hours per subject), and streak tracking (consecutive days with study time). Use `getElementById` for all DOM access.

### Challenge 6.6
**Simple E-Commerce Cart**
Create classes: `Product` (id, name, price, imageUrl, category, stock, rating), `CartItem` (product, quantity), `Cart` (items array, add, remove, updateQuantity, getTotal), and `Shop` (products array, cart instance, categories array). Build an HTML shop with: product grid with category filter buttons, sort options (price low/high, rating), product cards with image placeholder, name, price, rating stars, "Add to Cart" button (disable if out of stock), cart sidebar showing items with quantity +/- buttons, remove button, cart total, item count badge, checkout button showing order summary modal (itemized list, subtotal, tax calculation, grand total), and out-of-stock indicator. Use `getElementById` for all elements.

### Challenge 6.7
**Habit RPG Gamification**
Create classes: `Habit` (name, difficulty, streak, xpReward, completedToday, totalCompletions), `Player` (name, level, xp, maxXp, gold, habits array), `Reward` (name, cost, purchased), and `HabitGame` (player, rewards array). Build an HTML game with: player stats bar (level, XP bar, gold), habit list with difficulty stars, complete button (awards XP based on difficulty and streak multiplier), streak fire indicator, level up animation when XP reaches max (resets XP, increases max, increments level), reward shop (spend gold on rewards, mark purchased), daily reset (all habits reset at midnight simulation via button), habit history graph (last 7 days completion as HTML bars), and achievement badges (first streak of 7, reach level 5, etc.). Use `getElementById` for all DOM access.

### Challenge 6.8
**Classroom Seating Chart Manager**
Create classes: `Student` (id, name, grade, behaviorScore), `Seat` (row, column, studentId or null), `SeatingChart` (rows, columns, seats array, name), and `ClassroomManager` (charts array, students array). Build an HTML app with: student roster with add/edit/delete, seating chart grid (clickable cells showing student names or empty), drag not required (select student from dropdown to assign to seat), auto-arrange options (alphabetical by name, by grade, random, behavior-based with high behavior students spaced apart), save multiple charts with names, load saved chart, print view mode, and seating analytics (average grade per row, behavior hotspots). Use `getElementById` for all elements.

### Challenge 6.9
**Music Playlist Manager**
Create classes: `Song` (title, artist, duration, genre, playCount), `Playlist` (name, songs array, createdAt), and `MusicApp` (playlists array, currentPlaylist, currentSongIndex). Build an HTML app with: playlist sidebar (create new, select existing, delete), song list table with sortable columns (title, artist, duration, plays), add song form, now playing bar with song info, progress bar (simulated, advances 1% per second), play/pause/next/previous buttons, shuffle mode (random next song), repeat mode, total playlist duration display, genre filter, search by title/artist, and "Top Played" auto-playlist (top 10 by playCount). Use `getElementById` for all DOM access.

### Challenge 6.10
**Bug/Issue Tracker**
Create classes: `Issue` (id, title, description, priority, status, assignee, createdAt, comments array), `Comment` (author, text, date), `Project` (name, issues array), and `Tracker` (projects array). Build an HTML app with: project list with create new project, issue board with columns for each status (To Do, In Progress, Done), cards showing title, priority badge (color-coded), assignee initials, create issue form (title, description, priority dropdown, assignee select), issue detail view (click card to expand showing full description and comments), add comment form, status change buttons on cards, filter by priority and assignee, sort by created date, and project statistics (total issues, open issues, average resolution time in days, priority distribution). Use `getElementById` for all elements.

### Challenge 6.11
**Flashcard Study System with Spaced Repetition**
Create classes: `Flashcard` (front, back, deckName, reviewCount, correctCount, nextReviewDate, difficultyRating), `Deck` (name, cards array), `StudySession` (deckName, cardsStudied, correctCount, date), and `FlashcardApp` (decks array, sessions array). Build an HTML app with: deck list showing card count and due cards, create deck form, add card form (front/back), study mode (shows only cards due for review based on nextReviewDate), self-assessment buttons (Again/Hard/Good/Easy) that update nextReviewDate using simple spaced repetition algorithm (Again: 1 day, Hard: 2 days, Good: 4 days, Easy: 7 days), session summary (cards studied, accuracy percentage), card browser with edit/delete, import deck from text (format: front|back per line), and statistics page (total cards, mature cards, learning cards, study heatmap last 30 days as HTML grid). Use `getElementById` for all DOM access.

### Challenge 6.12
**Inventory-Based Adventure Game**
Create classes: `Item` (name, type, value, weight, effect), `Player` (name, hp, maxHp, inventory array with maxWeight, equipped weapon/armor), `Room` (name, description, items array, exits object with direction:roomName, enemies array), `Enemy` (name, hp, attack, loot array), and `Game` (player, rooms object, currentRoom, gameLog array). Build an HTML text adventure with: game log display (last 20 messages), room description panel, room items list with take button, inventory panel with use/equip/drop buttons and weight indicator, movement buttons (North/South/East/West, disabled if no exit), combat panel (appears when enemy present: attack, flee, use item), enemy stats, player stats (HP bar, equipped gear), and win condition (defeat boss in final room). Use `getElementById` for all DOM access.

### Challenge 6.13
**Event Planning Budget Tracker**
Create classes: `Event` (name, date, guestCount, budget, expenses array, categories array), `Expense` (category, description, estimatedCost, actualCost, vendor, paid), `Vendor` (name, category, contact, rating), and `EventPlanner` (events array, vendors array). Build an HTML app with: event creation form, dashboard showing all events with budget progress bars (green if under, red if over), expense tracker (add expense with estimated vs actual, mark paid, vendor select), vendor directory (add vendor, rate vendor, view by category), category breakdown pie chart rendered as HTML/CSS segments, guest cost calculator (total budget / guest count), expense comparison table (estimated vs actual per category), and export event summary. Use `getElementById` for all elements.

### Challenge 6.14
**Language Learning Vocabulary Builder**
Create classes: `Word` (term, translation, partOfSpeech, exampleSentence, masteryLevel 0-5, reviewDates array), `Lesson` (name, words array, completed), `LanguageCourse` (language, lessons array, totalWordsLearned), and `VocabApp` (courses array, currentCourse, studyStreak). Build an HTML app with: course selection (Spanish/French/German simulated), lesson list with lock icons (complete previous to unlock), study mode (flashcard flip for each word in lesson), quiz mode (multiple choice translation, typing test), mastery progression (0=new, 1-4=learning, 5=mastered, word moves to review pile), spaced review session (words at mastery <5 appear for review), streak calendar (HTML grid of last 30 days, colored if studied), word bank (all learned words searchable, filter by mastery, sort by last reviewed), and progress stats (total words, mastered words, lessons completed, average mastery). Use `getElementById` for all DOM access.

### Challenge 6.15
**Sports Tournament Bracket Generator**
Create classes: `Team` (name, seed, wins, losses), `Match` (team1, team2, winner, score1, score2, round), `Bracket` (teams array, matches array, currentRound), and `Tournament` (name, brackets array, champion). Build an HTML app with: team entry (add teams, auto-seed or manual seed), bracket generation (single elimination, pair highest seed vs lowest), bracket visualization (HTML/CSS tree structure showing matchups, clickable to enter scores), score entry modal (input scores, auto-advance winner), round progression (winners move to next round, losers eliminated), champion display with confetti animation (CSS-based), tournament stats (total matches, average score, biggest upset based on seed difference), save/load tournament state, and multiple bracket support (create concurrent tournaments). Use `getElementById` for all elements.

---

**Total Challenges: 75**

These challenges are designed to progressively build your ability to think in terms of objects, manage arrays of data, manipulate the DOM with `getElementById`, and construct real-world systems. Each level compounds the previous, forcing you to plan data structures before writing code and think about how classes, arrays, objects, and the DOM interact as a unified system.