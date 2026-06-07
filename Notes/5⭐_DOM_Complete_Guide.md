# The DOM: From JavaScript Fundamentals to Real Applications

## A Complete Guide for Developers Who Know JS but Feel Lost in the Browser

---

# PART 1: THE MENTAL MODEL

## What the DOM Actually Is

The **DOM (Document Object Model)** is the browser's internal representation of your HTML. When you write HTML, you're writing text. The browser reads that text and builds a **tree of objects** in memory. The DOM is that tree.

Think of it this way:
- **HTML** = the recipe (text instructions)
- **DOM** = the actual meal (living objects in memory)
- **JavaScript** = the chef who can modify the meal while it's being served

```
Your HTML file:
<body>
  <div id="app">
    <h1>Hello</h1>
    <button>Click me</button>
  </div>
</body>

Browser's internal representation (DOM tree):
Document
  └── html
       ├── head
       └── body
            └── div#app
                 ├── h1
                 │    └── "Hello" (text node)
                 └── button
                      └── "Click me" (text node)
```

**Key insight**: Every HTML tag becomes a JavaScript object. Every piece of text becomes a JavaScript object. Every attribute becomes a property on that object. The DOM is literally a collection of JavaScript objects arranged in a tree structure.

## Why the DOM Exists

Without the DOM, JavaScript would have no way to "see" or "touch" the web page. The DOM is the **bridge** between:
1. The static HTML you wrote
2. The dynamic JavaScript you write
3. The visual page the user sees

The browser needs an internal structure to:
- Know what to render on screen
- Know where elements are positioned
- Allow JavaScript to read and modify the page
- Handle user interactions (clicks, typing, etc.)

## How JavaScript Communicates with HTML

JavaScript doesn't talk to HTML directly. HTML is just text on disk or from the server. JavaScript talks to the **DOM**, which is the browser's living representation.

```
HTML File → Browser parses → DOM Tree (objects in memory) ← JavaScript reads/writes
                                              ↓
                                        Screen renders
```

**The communication flow:**
1. Browser loads HTML
2. Browser builds DOM tree (objects)
3. JavaScript can now access these objects
4. JavaScript modifies objects
5. Browser detects changes
6. Browser updates what the user sees

## What Happens When a Page Loads

Understanding the load process is critical. Here's the sequence:

1. **Request**: Browser asks server for HTML file
2. **Receive**: Browser gets HTML text
3. **Parse**: Browser reads HTML line by line, building the DOM tree
4. **External Resources**: Browser finds `<script>`, `<link>`, `<img>` tags
5. **CSSOM**: Browser also builds a CSS Object Model for styles
6. **Render Tree**: DOM + CSSOM combined = what gets drawn
7. **Layout**: Browser calculates positions and sizes
8. **Paint**: Browser draws pixels on screen
9. **JavaScript Executes**: Scripts run, can modify the DOM

**Critical concept**: If your JavaScript runs before the DOM is fully built, it won't find elements. That's why scripts often go at the bottom of `<body>` or use `DOMContentLoaded`.

```javascript
// This ensures your code runs AFTER the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Your DOM code here
});
```

## How the Browser Represents HTML Internally

Every element is an object. Specifically, each element is an instance of a class:

```
Element (base class)
  └── HTMLElement
       ├── HTMLDivElement
       ├── HTMLButtonElement
       ├── HTMLInputElement
       ├── HTMLFormElement
       └── ... (one for each HTML tag)
```

This means:
- A `<div>` is an instance of `HTMLDivElement`
- A `<button>` is an instance of `HTMLButtonElement`
- An `<input>` is an instance of `HTMLInputElement`

**Why this matters**: Different element types have different properties and methods. An input has a `.value` property. A button doesn't. An image has a `.src` property. A div doesn't.

## How JavaScript Finds and Manipulates Elements

JavaScript uses the `document` object (the root of the DOM tree) to find elements. Think of `document` as the entry point to the entire page.

```javascript
// document is the root object
// It has methods to search the tree
const element = document.getElementById('app');

// Once found, the element is just a JavaScript object
// You can read its properties:
console.log(element.id);        // "app"
console.log(element.tagName);   // "DIV"

// You can modify its properties:
element.style.backgroundColor = 'blue';
```

**The mental model**: You're navigating a tree of objects. `document` is the root. You use methods to traverse branches and find specific nodes.

## How Data Flows Between JavaScript and the UI

This is the core of interactive applications. Data flows in two directions:

**1. JavaScript → UI (Output)**
```javascript
const message = "Hello, user!";  // JavaScript data
const heading = document.getElementById('title');
heading.textContent = message;   // Data flows to UI
```

**2. UI → JavaScript (Input)**
```javascript
const input = document.getElementById('nameInput');
input.addEventListener('input', () => {
    const userName = input.value;  // UI data flows to JavaScript
    console.log(userName);
});
```

**3. The Loop (Interactive Apps)**
```
User Action → Event Fires → JS Handler Runs → JS Updates Data → JS Updates DOM → User Sees Change
```

This is the **event-driven data flow** that powers every web application.

---

# PART 2: CONNECTING YOUR JS KNOWLEDGE TO THE DOM

## Variables + DOM

**Concept**: Variables store references to DOM elements.

**Why use them**: You don't want to search for the same element repeatedly. Store it once, use it many times.

**When to use them**: Always. Every time you select an element, store it in a variable.

```javascript
// BAD: Searching the DOM three times
const text1 = document.getElementById('title').textContent;
document.getElementById('title').style.color = 'red';
document.getElementById('title').className = 'big';

// GOOD: Search once, store in variable, use many times
const title = document.getElementById('title');
const text1 = title.textContent;
title.style.color = 'red';
title.className = 'big';
```

**The connection**: Variables in JavaScript can hold anything — numbers, strings, arrays, objects, and **DOM elements**. A DOM element is just another value you can store.

## Functions + DOM

**Concept**: Functions encapsulate DOM operations. They make your code reusable and organized.

**Why use them**: To avoid repeating DOM manipulation code. To separate "what happens" from "when it happens."

**When to use them**: Every DOM operation that might happen more than once, or that represents a distinct action.

```javascript
// Function that updates the UI
function updateCounterDisplay(count) {
    const display = document.getElementById('counter');
    display.textContent = count;
}

// Function that reads user input
function getUserName() {
    const input = document.getElementById('nameInput');
    return input.value.trim();
}

// Function that validates input
function isInputValid(inputElement) {
    return inputElement.value.length > 0;
}
```

**The connection**: Functions are the glue between user actions and DOM changes. An event calls a function, the function manipulates the DOM.

## Arrays + DOM

**Concept**: Arrays of data become lists of DOM elements. Arrays of DOM elements become manageable collections.

**Why use them**: Most UIs display lists — todo items, products, messages, users. Arrays are the natural data structure for lists.

**When to use them**: Any time you have multiple similar items to display or manage.

```javascript
const todos = ['Buy milk', 'Walk dog', 'Code app'];

// Array of data → Array of DOM elements
const list = document.getElementById('todoList');

todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo;
    list.appendChild(li);
});

// Array of DOM elements → Batch operations
const allButtons = document.querySelectorAll('button');
allButtons.forEach(button => {
    button.disabled = true;  // Disable all buttons
});
```

**The connection**: Arrays store data. The DOM displays data. You map arrays to DOM elements.

## Objects + DOM

**Concept**: Objects represent things. DOM elements represent visual things. Objects often mirror DOM elements.

**Why use them**: To manage application state separately from the UI. The object is the "truth," the DOM is the "display."

**When to use them**: Every interactive element that has state. Forms, counters, toggles, modals.

```javascript
// Object represents the application state
const appState = {
    user: {
        name: 'Alice',
        email: 'alice@example.com'
    },
    isLoggedIn: false,
    theme: 'dark'
};

// Object data flows to DOM
function renderUser() {
    document.getElementById('userName').textContent = appState.user.name;
    document.getElementById('userEmail').textContent = appState.user.email;
}

// DOM events update object
function login() {
    appState.isLoggedIn = true;
    renderUser();
}
```

**The connection**: Objects hold your data. The DOM displays your data. Functions synchronize them.

## Nested Objects + DOM

**Concept**: Nested objects mirror nested DOM structures. A user object with an address object mirrors a user card with an address section.

**Why use them**: Real data is nested. Real HTML is nested. The structures naturally align.

**When to use them**: Any complex data with relationships.

```javascript
const student = {
    name: 'John',
    grades: {
        math: 95,
        science: 88,
        english: 92
    },
    contact: {
        email: 'john@school.edu',
        phone: '555-1234'
    }
};

// Nested object → Nested DOM
function renderStudent(student) {
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('mathGrade').textContent = student.grades.math;
    document.getElementById('scienceGrade').textContent = student.grades.science;
    document.getElementById('email').textContent = student.contact.email;
}
```

## Classes + DOM

**Concept**: Classes encapsulate both data AND DOM manipulation. A class instance represents one UI component.

**Why use them**: To organize code into self-contained units. Each class manages its own state and its own DOM elements.

**When to use them**: Any reusable UI component. Any complex interactive element.

```javascript
class Counter {
    constructor(elementId) {
        this.count = 0;
        this.element = document.getElementById(elementId);
    }

    increment() {
        this.count++;
        this.render();
    }

    render() {
        this.element.textContent = this.count;
    }
}

// Usage
const counter = new Counter('counterDisplay');
document.getElementById('incrementBtn').addEventListener('click', () => {
    counter.increment();
});
```

**The connection**: Classes bundle data (properties) with behavior (methods) and DOM references. This is the foundation of component-based architecture (like React).

## Class Methods + DOM

**Concept**: Methods are functions that belong to a class. They operate on the class's data AND its associated DOM elements.

**Why use them**: To keep related functionality together. A TodoItem class has methods to toggle, delete, and render itself.

**When to use them**: Every action a component can take.

```javascript
class TodoItem {
    constructor(text, listElement) {
        this.text = text;
        this.completed = false;
        this.li = document.createElement('li');
        this.listElement = listElement;
    }

    toggle() {
        this.completed = !this.completed;
        this.li.classList.toggle('completed', this.completed);
    }

    remove() {
        this.li.remove();
    }

    render() {
        this.li.textContent = this.text;
        this.listElement.appendChild(this.li);
    }
}
```

---

# PART 3: STAGE-BY-STAGE DOM MASTERY

## Stage 1 — Selecting Elements: The Foundation of Everything

### The Mental Model

Before you can manipulate anything, you must **find** it. The DOM is a tree, and you need to navigate to specific nodes. Element selection is like using a GPS to find a house before you can enter it.

**Why this is the foundation**: Every single DOM operation starts with selection. You cannot update, style, or attach events to elements you haven't found.

### getElementById

```javascript
// Finds ONE element by its id attribute
// Returns a single element or null
const header = document.getElementById('mainHeader');
const form = document.getElementById('loginForm');

// Why use it: Fastest selection method. IDs are unique.
// When to use it: When you know the exact element you need.
```

**Common Mistake**: Forgetting that IDs are case-sensitive and must match exactly.

```javascript
// HTML: <div id="userProfile">
const profile = document.getElementById('userprofile'); // null! Wrong case.
const profile = document.getElementById('userProfile');   // Works!
```

### querySelector

```javascript
// Finds the FIRST element matching a CSS selector
// Returns a single element or null
const firstButton = document.querySelector('button');
const submitBtn = document.querySelector('.submit');
const navLink = document.querySelector('nav a.active');

// Why use it: Extremely flexible. Uses CSS selector syntax.
// When to use it: When you need complex selection logic.
```

**Common Mistake**: Expecting multiple results. `querySelector` always returns ONE element.

```javascript
// Only gets the FIRST button, not all buttons!
const allButtons = document.querySelector('button'); // WRONG thinking
const allButtons = document.querySelectorAll('button'); // CORRECT
```

### querySelectorAll

```javascript
// Finds ALL elements matching a CSS selector
// Returns a NodeList (array-like, but not a real array)
const allButtons = document.querySelectorAll('button');
const items = document.querySelectorAll('.todo-item');
const inputs = document.querySelectorAll('input[type="text"]');

// Convert to real array if you need array methods
const buttonsArray = Array.from(allButtons);

// Why use it: To operate on multiple elements at once.
// When to use it: Lists, tables, groups of similar elements.
```

**Common Mistake**: Trying to use array methods directly on NodeList.

```javascript
const items = document.querySelectorAll('.item');

// WRONG: NodeList doesn't have map()
const texts = items.map(item => item.textContent);

// CORRECT: Convert first
const texts = Array.from(items).map(item => item.textContent);
// Or use forEach (NodeList has this)
items.forEach(item => console.log(item.textContent));
```

### Accessing Content

```javascript
const element = document.getElementById('message');

// Reading content
const text = element.textContent;     // Plain text, ignores HTML
const html = element.innerHTML;       // HTML as string

// Writing content (replaces existing)
element.textContent = 'New text';     // Safe, treats as plain text
element.innerHTML = '<strong>Bold</strong>'; // Parses HTML

// Why textContent is safer: Prevents XSS attacks
// innerHTML can execute scripts if user input is inserted
```

**Common Mistake**: Using `innerHTML` with user input.

```javascript
// DANGEROUS: User input could contain <script> tags
const userInput = getUserInput();
element.innerHTML = userInput; // XSS vulnerability!

// SAFE: textContent never executes HTML
const userInput = getUserInput();
element.textContent = userInput; // Safe!
```

---

## Stage 2 — Reading and Updating Content

### The Mental Model

The DOM is a **live** representation. When you change a property, the browser updates the screen. This is not like writing to a file — it's like adjusting a live camera feed.

**Why developers use this**: To create dynamic experiences. To show live data. To respond to user input.

**What problem it solves**: Static HTML can't change. JavaScript + DOM makes it dynamic.

### textContent

```javascript
// Gets or sets the plain text inside an element
const title = document.getElementById('title');

// Reading
console.log(title.textContent); // "Welcome"

// Writing
title.textContent = 'Goodbye'; // Screen updates immediately

// Use case: Updating status messages, counters, notifications
```

### innerHTML

```javascript
// Gets or sets HTML markup as a string
const container = document.getElementById('card');

// Reading
console.log(container.innerHTML); // "<h2>Title</h2><p>Text</p>"

// Writing (replaces everything inside)
container.innerHTML = `
    <h2>New Title</h2>
    <p>New description</p>
`;

// Use case: Rendering complex templates, rich content
// WARNING: Never use with untrusted user input!
```

### value (for form inputs)

```javascript
// Gets or sets the current value of input elements
const input = document.getElementById('email');
const select = document.getElementById('country');
const textarea = document.getElementById('message');

// Reading
const email = input.value;
const country = select.value;

// Writing
input.value = 'user@example.com';
select.value = 'us';

// Use case: Form handling, search boxes, filters
```

**Common Mistake**: Trying to use `textContent` on inputs.

```javascript
const input = document.getElementById('name');

// WRONG: Input elements don't have textContent
const name = input.textContent;

// CORRECT: Use value
const name = input.value;
```

### Attributes

```javascript
const link = document.getElementById('profileLink');
const image = document.getElementById('avatar');

// Reading attributes
const href = link.getAttribute('href');
const src = image.getAttribute('src');

// Writing attributes
link.setAttribute('href', '/new-profile');
image.setAttribute('src', 'new-avatar.jpg');

// Direct property access (for standard attributes)
link.href = '/new-profile';
image.src = 'new-avatar.jpg';

// Use case: Dynamic links, image updates, toggling states
```

**Common Mistake**: Confusing properties and attributes.

```javascript
const checkbox = document.getElementById('agree');

// Attribute: The HTML value (initial state)
checkbox.getAttribute('checked'); // "checked" or null

// Property: The current live state
checkbox.checked; // true or false

// For dynamic forms, always use properties!
```

---

## Stage 3 — Events: The Heart of Interactivity

### The Mental Model

An **event** is a signal that something happened. The browser emits events constantly — when the user clicks, types, scrolls, resizes the window, when a page finishes loading, when an error occurs.

**Event-driven programming** means your code doesn't run in a predetermined sequence. Instead, it waits for events and responds to them.

**Why modern applications rely heavily on events**: Because user interaction is unpredictable. You can't know when someone will click a button. Events let you say "when X happens, do Y."

### What Events Actually Are

Events are objects. When an event fires, the browser creates an Event object with information about what happened:

```javascript
button.addEventListener('click', (event) => {
    // event is an object with properties:
    console.log(event.type);      // "click"
    console.log(event.target);    // The element that was clicked
    console.log(event.timestamp); // When it happened
});
```

### click

```javascript
const button = document.getElementById('submit');

button.addEventListener('click', (event) => {
    console.log('Button clicked!');
    // Prevent the default action (if it's a submit button)
    event.preventDefault();
});

// Use case: Buttons, links, any clickable element
// Common mistake: Forgetting that clicks also fire on parent elements (bubbling)
```

### input

```javascript
const searchBox = document.getElementById('search');

// Fires on EVERY keystroke, paste, or cut
searchBox.addEventListener('input', (event) => {
    const query = event.target.value;
    console.log('User typed:', query);
    // Use case: Live search, auto-complete, character counting
});
```

### change

```javascript
const select = document.getElementById('country');

// Fires when value changes AND user moves away (for most inputs)
// For select elements, fires immediately on selection
select.addEventListener('change', (event) => {
    const selected = event.target.value;
    console.log('Selected:', selected);
    // Use case: Dropdown menus, radio buttons, checkboxes
});
```

**Key difference**: `input` fires continuously. `change` fires when the user is "done" editing.

### submit

```javascript
const form = document.getElementById('loginForm');

form.addEventListener('submit', (event) => {
    // ALWAYS prevent default for AJAX forms!
    event.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    // Process the data
    console.log('Login attempt:', email);
});
```

### keydown / keyup

```javascript
const input = document.getElementById('shortcut');

input.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.key);

    // Detect specific keys
    if (event.key === 'Enter') {
        console.log('Enter pressed!');
    }

    // Prevent default behavior (e.g., prevent typing certain characters)
    if (event.key === 'e') {
        event.preventDefault(); // User can't type 'e'
    }
});

// Use case: Keyboard shortcuts, game controls, input validation
```

### Mouse Events

```javascript
const box = document.getElementById('hoverBox');

box.addEventListener('mouseenter', () => {
    box.classList.add('highlight');
});

box.addEventListener('mouseleave', () => {
    box.classList.remove('highlight');
});

// Other mouse events: mousemove, mousedown, mouseup, dblclick
// Use case: Tooltips, drag and drop, drawing apps
```

### Event-Driven Programming Pattern

```javascript
// Your application is a set of event handlers
// Each handler updates state and re-renders the UI

const app = {
    count: 0,

    init() {
        // Set up all event listeners when app starts
        document.getElementById('increment').addEventListener('click', () => this.increment());
        document.getElementById('decrement').addEventListener('click', () => this.decrement());
        this.render();
    },

    increment() {
        this.count++;
        this.render();
    },

    decrement() {
        this.count--;
        this.render();
    },

    render() {
        document.getElementById('display').textContent = this.count;
    }
};

app.init();
```

---

## Stage 4 — Functions + DOM

### The Mental Model

Functions are the **controllers** of your application. They receive input (from events or other functions), process it, and output changes to the DOM.

**The pattern**: Event → Function → State Update → DOM Update

### Functions Triggered by Events

```javascript
// Function that handles a click
function handleAddToCart(event) {
    const productId = event.target.dataset.productId;
    addToCart(productId);
    updateCartCount();
    showNotification('Added to cart!');
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', handleAddToCart);
});

// Why separate the function from the listener:
// 1. Reusable (can be called from multiple places)
// 2. Testable (can test logic without DOM)
// 3. Readable (function name describes the action)
```

### Functions Updating the UI

```javascript
// Pure UI update functions (no business logic)
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideError() {
    document.getElementById('error').classList.add('hidden');
}

function setLoading(isLoading) {
    const button = document.getElementById('submit');
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Loading...' : 'Submit';
}

// Why separate UI functions: They can be reused across different features
```

### Functions Reading User Input

```javascript
function getFormData() {
    return {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        age: parseInt(document.getElementById('age').value, 10)
    };
}

function validateForm(data) {
    const errors = [];
    if (!data.name) errors.push('Name is required');
    if (!data.email.includes('@')) errors.push('Valid email required');
    if (isNaN(data.age) || data.age < 0) errors.push('Valid age required');
    return errors;
}

// Usage in event handler
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = getFormData();
    const errors = validateForm(data);

    if (errors.length > 0) {
        showError(errors.join(', '));
    } else {
        submitData(data);
    }
});
```

---

## Stage 5 — Arrays + DOM

### The Mental Model

Arrays are lists of data. The DOM displays lists of elements. The fundamental operation is **mapping** an array to DOM elements.

**Data → Array → Map → DOM Elements → Append to Container**

### Rendering Arrays

```javascript
const todos = [
    { id: 1, text: 'Buy milk', done: false },
    { id: 2, text: 'Walk dog', done: true },
    { id: 3, text: 'Code app', done: false }
];

function renderTodos(todos) {
    const list = document.getElementById('todoList');
    list.innerHTML = ''; // Clear existing

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.classList.toggle('done', todo.done);
        list.appendChild(li);
    });
}

renderTodos(todos);
```

### Updating Lists

```javascript
let todos = [];

function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text: text,
        done: false
    };
    todos.push(newTodo);
    renderTodos();
}

function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.done = !todo.done;
        renderTodos();
    }
}

// The pattern: Update data array → Re-render entire list
// For performance with large lists, only update changed elements
```

### Common Mistake: Forgetting to Clear Before Re-rendering

```javascript
function renderTodos(todos) {
    const list = document.getElementById('todoList');
    // WRONG: Appends to existing items, causing duplicates!
    // list.innerHTML = ''; // Forgot this line!

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        list.appendChild(li); // Keeps adding!
    });
}
```

### Efficient List Updates

```javascript
// Instead of re-rendering everything, update only what changed
function updateTodoItem(id, newText) {
    // Find the DOM element directly
    const li = document.querySelector(`[data-id="${id}"]`);
    if (li) {
        li.textContent = newText; // Only updates this one element
    }
}
```

---

## Stage 6 — Objects + DOM

### The Mental Model

Objects represent entities. The DOM represents the visual state of those entities. Your object is the "source of truth." The DOM is the "projection."

**The pattern**: Object State → Render Function → DOM

### Displaying Object Data

```javascript
const user = {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'admin',
    isActive: true,
    profile: {
        avatar: 'alice.jpg',
        bio: 'Full-stack developer'
    }
};

function renderUserProfile(user) {
    // Update simple properties
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userRole').textContent = user.role;

    // Update nested properties
    document.getElementById('userAvatar').src = user.profile.avatar;
    document.getElementById('userBio').textContent = user.profile.bio;

    // Update conditional UI
    const statusBadge = document.getElementById('statusBadge');
    statusBadge.textContent = user.isActive ? 'Active' : 'Inactive';
    statusBadge.className = user.isActive ? 'badge active' : 'badge inactive';
}

renderUserProfile(user);
```

### Updating Object Properties from DOM

```javascript
// When user edits their profile
const editForm = document.getElementById('editProfile');

editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Read from DOM, update object
    user.name = document.getElementById('editName').value;
    user.email = document.getElementById('editEmail').value;
    user.profile.bio = document.getElementById('editBio').value;

    // Re-render with updated object
    renderUserProfile(user);
});
```

### Synchronizing UI with Object State

```javascript
const appState = {
    currentUser: null,
    isLoggedIn: false,
    notifications: [],
    theme: 'light'
};

function updateState(newState) {
    // Merge new state into existing
    Object.assign(appState, newState);
    // Re-render everything that depends on state
    renderApp();
}

function renderApp() {
    // Show/hide based on login state
    document.getElementById('loginView').classList.toggle('hidden', appState.isLoggedIn);
    document.getElementById('dashboardView').classList.toggle('hidden', !appState.isLoggedIn);

    // Update user info if logged in
    if (appState.currentUser) {
        document.getElementById('navUserName').textContent = appState.currentUser.name;
    }

    // Update notification count
    document.getElementById('notifCount').textContent = appState.notifications.length;

    // Apply theme
    document.body.className = appState.theme;
}
```

---

## Stage 7 — Classes + DOM (The Bridge to Modern Frameworks)

### The Mental Model

This is where everything comes together. A **class** represents a **component** — a self-contained piece of UI with its own state, behavior, and DOM elements.

**Why classes are powerful for DOM work**:
1. They bundle data + methods + DOM references
2. They can be instantiated multiple times (e.g., 10 todo items = 10 instances)
3. They encapsulate complexity
4. They mirror how React/Vue/Angular components work

### Class Instances

```javascript
class TodoApp {
    constructor(containerId) {
        // Store DOM reference
        this.container = document.getElementById(containerId);
        // Initialize state
        this.todos = [];
        this.nextId = 1;
        // Set up the UI
        this.render();
        this.attachEvents();
    }
}

// Create an instance
const myTodoApp = new TodoApp('app');
// The constructor runs immediately, building the entire app
```

### Class Methods + DOM Updates

```javascript
class TodoApp {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.todos = [];
        this.nextId = 1;
        this.render();
        this.attachEvents();
    }

    // Method to add a todo
    addTodo(text) {
        const todo = {
            id: this.nextId++,
            text: text,
            completed: false
        };
        this.todos.push(todo);
        this.renderTodoItem(todo); // Only render the new item
    }

    // Method to toggle completion
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.updateTodoElement(id); // Only update the changed item
        }
    }

    // Method to remove a todo
    removeTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.removeTodoElement(id);
    }

    // DOM manipulation methods
    render() {
        this.container.innerHTML = `
            <div class="todo-app">
                <input type="text" id="newTodo" placeholder="Add todo...">
                <button id="addBtn">Add</button>
                <ul id="todoList"></ul>
            </div>
        `;
    }

    renderTodoItem(todo) {
        const list = this.container.querySelector('#todoList');
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        li.innerHTML = `
            <span class="text">${todo.text}</span>
            <button class="toggle">${todo.completed ? 'Undo' : 'Done'}</button>
            <button class="delete">Delete</button>
        `;
        list.appendChild(li);
    }

    updateTodoElement(id) {
        const todo = this.todos.find(t => t.id === id);
        const li = this.container.querySelector(`[data-id="${id}"]`);
        if (li && todo) {
            li.querySelector('.text').classList.toggle('completed', todo.completed);
            li.querySelector('.toggle').textContent = todo.completed ? 'Undo' : 'Done';
        }
    }

    removeTodoElement(id) {
        const li = this.container.querySelector(`[data-id="${id}"]`);
        if (li) li.remove();
    }

    attachEvents() {
        const input = this.container.querySelector('#newTodo');
        const addBtn = this.container.querySelector('#addBtn');
        const list = this.container.querySelector('#todoList');

        addBtn.addEventListener('click', () => {
            if (input.value.trim()) {
                this.addTodo(input.value.trim());
                input.value = '';
            }
        });

        // Event delegation for dynamic elements
        list.addEventListener('click', (event) => {
            const li = event.target.closest('li');
            if (!li) return;
            const id = parseInt(li.dataset.id);

            if (event.target.classList.contains('toggle')) {
                this.toggleTodo(id);
            } else if (event.target.classList.contains('delete')) {
                this.removeTodo(id);
            }
        });
    }
}

// Usage: One line creates the entire app
const app = new TodoApp('app');
```

### Events Calling Methods

```javascript
class Counter {
    constructor(elementId) {
        this.count = 0;
        this.element = document.getElementById(elementId);
        this.render();
        this.attachEvents();
    }

    increment() {
        this.count++;
        this.render();
    }

    decrement() {
        this.count--;
        this.render();
    }

    reset() {
        this.count = 0;
        this.render();
    }

    render() {
        this.element.innerHTML = `
            <div class="counter">
                <h2>${this.count}</h2>
                <button class="inc">+</button>
                <button class="dec">-</button>
                <button class="reset">Reset</button>
            </div>
        `;
    }

    attachEvents() {
        // Events call class methods
        this.element.querySelector('.inc').addEventListener('click', () => this.increment());
        this.element.querySelector('.dec').addEventListener('click', () => this.decrement());
        this.element.querySelector('.reset').addEventListener('click', () => this.reset());
    }
}
```

**Critical pattern**: `() => this.increment()` preserves the `this` context. Without the arrow function, `this` would refer to the button element inside the event handler.

### Managing Application State with Classes

```javascript
class StudentManager {
    constructor() {
        this.students = []; // Array of student objects
        this.container = document.getElementById('app');
        this.render();
        this.attachEvents();
    }

    addStudent(name, grade) {
        const student = {
            id: Date.now(),
            name,
            grade,
            enrolled: new Date().toLocaleDateString()
        };
        this.students.push(student);
        this.renderStudent(student);
        this.updateStats();
    }

    removeStudent(id) {
        this.students = this.students.filter(s => s.id !== id);
        this.removeStudentElement(id);
        this.updateStats();
    }

    getAverageGrade() {
        if (this.students.length === 0) return 0;
        const sum = this.students.reduce((acc, s) => acc + s.grade, 0);
        return (sum / this.students.length).toFixed(1);
    }

    updateStats() {
        document.getElementById('totalStudents').textContent = this.students.length;
        document.getElementById('avgGrade').textContent = this.getAverageGrade();
    }

    render() {
        this.container.innerHTML = `
            <div class="student-manager">
                <h1>Student Manager</h1>
                <div class="stats">
                    <span>Total: <strong id="totalStudents">0</strong></span>
                    <span>Average: <strong id="avgGrade">0</strong></span>
                </div>
                <form id="addForm">
                    <input type="text" id="name" placeholder="Name" required>
                    <input type="number" id="grade" placeholder="Grade" required>
                    <button type="submit">Add Student</button>
                </form>
                <table id="studentTable">
                    <thead><tr><th>Name</th><th>Grade</th><th>Enrolled</th><th>Action</th></tr></thead>
                    <tbody></tbody>
                </table>
            </div>
        `;
    }

    renderStudent(student) {
        const tbody = this.container.querySelector('tbody');
        const tr = document.createElement('tr');
        tr.dataset.id = student.id;
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${student.enrolled}</td>
            <td><button class="delete">Remove</button></td>
        `;
        tbody.appendChild(tr);
    }

    removeStudentElement(id) {
        const row = this.container.querySelector(`tr[data-id="${id}"]`);
        if (row) row.remove();
    }

    attachEvents() {
        const form = this.container.querySelector('#addForm');
        const table = this.container.querySelector('#studentTable');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = this.container.querySelector('#name').value;
            const grade = parseFloat(this.container.querySelector('#grade').value);
            this.addStudent(name, grade);
            form.reset();
        });

        table.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete')) {
                const id = parseInt(event.target.closest('tr').dataset.id);
                this.removeStudent(id);
            }
        });
    }
}

// Instantiate the entire application
const manager = new StudentManager();
```

---

## Stage 8 — Forms

### The Mental Model

Forms are the primary way users send data to your application. The DOM gives you tools to read, validate, and submit form data.

**The flow**: User fills form → JavaScript reads values → Validation → Processing → Feedback

### Inputs

```javascript
const form = document.getElementById('registration');

// Reading all input values
const formData = {
    username: form.querySelector('#username').value,
    email: form.querySelector('#email').value,
    password: form.querySelector('#password').value,
    age: parseInt(form.querySelector('#age').value, 10),
    newsletter: form.querySelector('#newsletter').checked,
    country: form.querySelector('#country').value
};
```

### Validation

```javascript
function validateForm(data) {
    const errors = [];

    if (data.username.length < 3) {
        errors.push('Username must be at least 3 characters');
    }

    if (!data.email.includes('@')) {
        errors.push('Please enter a valid email');
    }

    if (data.password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }

    if (isNaN(data.age) || data.age < 13) {
        errors.push('You must be at least 13 years old');
    }

    return errors;
}

function showFieldErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.remove());

    errors.forEach(error => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = error;
        document.getElementById('formErrors').appendChild(errorDiv);
    });
}
```

### Form Submission

```javascript
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // ALWAYS prevent default for JS handling

    const data = {
        username: form.querySelector('#username').value,
        email: form.querySelector('#email').value,
        password: form.querySelector('#password').value
    };

    const errors = validateForm(data);
    if (errors.length > 0) {
        showFieldErrors(errors);
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        // Send data to server
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showSuccess('Registration successful!');
            form.reset();
        } else {
            showError('Registration failed. Please try again.');
        }
    } catch (error) {
        showError('Network error. Please check your connection.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
    }
});
```

### Preventing Default Behavior

```javascript
// Prevent form submission (handle with JS instead)
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Your custom handling here
});

// Prevent link navigation
link.addEventListener('click', (event) => {
    event.preventDefault();
    // Maybe show a modal instead of navigating
});

// Prevent context menu
box.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    // Show custom menu
});
```

### Handling User Data

```javascript
// Using FormData API (cleaner for complex forms)
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    // Convert to plain object
    const data = Object.fromEntries(formData);

    // Or iterate
    for (const [key, value] of formData) {
        console.log(`${key}: ${value}`);
    }

    // Handle file uploads
    const file = formData.get('avatar');
    if (file && file.size > 0) {
        // Process file
    }
});
```

---

## Stage 9 — Dynamic DOM Manipulation

### The Mental Model

Sometimes you need to create elements that didn't exist in the original HTML. The DOM is not static — you can build it dynamically.

**When to modify vs create**:
- **Modify existing**: When the element exists but content changes (counters, status updates)
- **Create new**: When adding items to a list, showing new content, building dynamic UIs

### Creating Elements

```javascript
// Create a new element
const newDiv = document.createElement('div');

// Set properties
newDiv.className = 'notification';
newDiv.id = 'notif-' + Date.now();
newDiv.textContent = 'New message received!';

// Add to the page
const container = document.getElementById('notifications');
container.appendChild(newDiv);

// Full pattern for complex elements
function createTodoElement(text, id) {
    const li = document.createElement('li');
    li.dataset.id = id;
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = text;

    const button = document.createElement('button');
    button.className = 'delete';
    button.textContent = '×';

    li.appendChild(span);
    li.appendChild(button);

    return li;
}
```

### Removing Elements

```javascript
// Remove a specific element
const item = document.getElementById('item-5');
item.remove(); // Modern method

// Or from parent
item.parentElement.removeChild(item); // Older method

// Remove all children
const list = document.getElementById('todoList');
list.innerHTML = ''; // Fast but doesn't fire removal events

// Or iterate
while (list.firstChild) {
    list.removeChild(list.firstChild); // Fires events, slower
}
```

### Updating Elements

```javascript
const item = document.getElementById('item-5');

// Update text
item.textContent = 'Updated text';

// Update HTML
item.innerHTML = '<strong>Updated</strong> text';

// Update attributes
item.setAttribute('data-status', 'completed');
item.className = 'todo-item completed';

// Update styles
item.style.backgroundColor = '#e0ffe0';
item.style.display = 'none';
```

### Appending Elements

```javascript
const parent = document.getElementById('list');
const child = document.createElement('li');

// Add to end
parent.appendChild(child);

// Add to beginning
parent.insertBefore(child, parent.firstChild);

// Insert at specific position
const reference = parent.children[2];
parent.insertBefore(child, reference);

// Modern methods
parent.append(child); // Add to end (can add multiple)
parent.prepend(child); // Add to beginning
reference.before(child); // Before reference
reference.after(child); // After reference
```

### Replacing Elements

```javascript
const oldElement = document.getElementById('old');
const newElement = document.createElement('div');
newElement.textContent = 'I am the replacement';

oldElement.replaceWith(newElement);

// Or replace child
parent.replaceChild(newElement, oldElement);
```

---

# PART 4: BUILDING APPLICATIONS

## Project 1: Counter

**Concepts**: Variables, Functions, Events, DOM updates

```html
<!DOCTYPE html>
<html>
<head><title>Counter</title></head>
<body>
    <div id="app">
        <h1 id="display">0</h1>
        <button id="increment">+</button>
        <button id="decrement">-</button>
        <button id="reset">Reset</button>
    </div>

<script>
// State
let count = 0;

// DOM references
const display = document.getElementById('display');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

// Functions
function updateDisplay() {
    display.textContent = count;
}

function increment() {
    count++;
    updateDisplay();
}

function decrement() {
    count--;
    updateDisplay();
}

function reset() {
    count = 0;
    updateDisplay();
}

// Event listeners
incrementBtn.addEventListener('click', increment);
decrementBtn.addEventListener('click', decrement);
resetBtn.addEventListener('click', reset);
</script>
</body>
</html>
```

## Project 2: Todo App (Class-Based)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Todo App</title>
    <style>
        .completed { text-decoration: line-through; color: gray; }
        .todo-item { display: flex; gap: 10px; margin: 5px 0; }
    </style>
</head>
<body>
    <div id="app"></div>

<script>
class TodoApp {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.todos = [];
        this.nextId = 1;
        this.render();
        this.attachEvents();
    }

    addTodo(text) {
        const todo = { id: this.nextId++, text, completed: false };
        this.todos.push(todo);
        this.renderTodoItem(todo);
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            const li = this.container.querySelector(`[data-id="${id}"]`);
            li.querySelector('.text').classList.toggle('completed', todo.completed);
            li.querySelector('.toggle').textContent = todo.completed ? 'Undo' : 'Done';
        }
    }

    removeTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        const li = this.container.querySelector(`[data-id="${id}"]`);
        if (li) li.remove();
    }

    render() {
        this.container.innerHTML = `
            <h1>Todo App</h1>
            <div class="input-group">
                <input type="text" id="newTodo" placeholder="What needs to be done?">
                <button id="addBtn">Add</button>
            </div>
            <ul id="todoList"></ul>
            <p id="stats">0 items</p>
        `;
    }

    renderTodoItem(todo) {
        const list = this.container.querySelector('#todoList');
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todo.id;
        li.innerHTML = `
            <span class="text">${todo.text}</span>
            <button class="toggle">Done</button>
            <button class="delete">Delete</button>
        `;
        list.appendChild(li);
        this.updateStats();
    }

    updateStats() {
        const active = this.todos.filter(t => !t.completed).length;
        this.container.querySelector('#stats').textContent = 
            `${active} active, ${this.todos.length} total`;
    }

    attachEvents() {
        const input = this.container.querySelector('#newTodo');
        const addBtn = this.container.querySelector('#addBtn');
        const list = this.container.querySelector('#todoList');

        addBtn.addEventListener('click', () => {
            if (input.value.trim()) {
                this.addTodo(input.value.trim());
                input.value = '';
                input.focus();
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                this.addTodo(input.value.trim());
                input.value = '';
            }
        });

        list.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (!li) return;
            const id = parseInt(li.dataset.id);

            if (e.target.classList.contains('toggle')) {
                this.toggleTodo(id);
            } else if (e.target.classList.contains('delete')) {
                this.removeTodo(id);
            }
            this.updateStats();
        });
    }
}

const app = new TodoApp('app');
</script>
</body>
</html>
```

## Project 3: Student Manager

```html
<!DOCTYPE html>
<html>
<head>
    <title>Student Manager</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .stats { margin: 20px 0; padding: 10px; background: #f9f9f9; }
        .error { color: red; margin: 10px 0; }
    </style>
</head>
<body>
    <div id="app"></div>

<script>
class StudentManager {
    constructor() {
        this.students = [];
        this.container = document.getElementById('app');
        this.render();
        this.attachEvents();
    }

    addStudent(name, grade) {
        const student = {
            id: Date.now(),
            name,
            grade: parseFloat(grade),
            enrolled: new Date().toLocaleDateString()
        };
        this.students.push(student);
        this.renderStudent(student);
        this.updateStats();
    }

    removeStudent(id) {
        this.students = this.students.filter(s => s.id !== id);
        const row = this.container.querySelector(`tr[data-id="${id}"]`);
        if (row) row.remove();
        this.updateStats();
    }

    getAverageGrade() {
        if (this.students.length === 0) return 0;
        return (this.students.reduce((sum, s) => sum + s.grade, 0) / this.students.length).toFixed(1);
    }

    getTopStudent() {
        if (this.students.length === 0) return null;
        return this.students.reduce((top, s) => s.grade > top.grade ? s : top);
    }

    updateStats() {
        this.container.querySelector('#total').textContent = this.students.length;
        this.container.querySelector('#average').textContent = this.getAverageGrade();
        const top = this.getTopStudent();
        this.container.querySelector('#topStudent').textContent = top ? top.name : 'None';
    }

    render() {
        this.container.innerHTML = `
            <h1>Student Manager</h1>
            <div class="stats">
                <strong>Stats:</strong>
                Total: <span id="total">0</span> |
                Average: <span id="average">0</span> |
                Top Student: <span id="topStudent">None</span>
            </div>
            <form id="addForm">
                <input type="text" id="name" placeholder="Student name" required>
                <input type="number" id="grade" placeholder="Grade (0-100)" min="0" max="100" required>
                <button type="submit">Add Student</button>
            </form>
            <div id="errors" class="error"></div>
            <table>
                <thead>
                    <tr><th>Name</th><th>Grade</th><th>Enrolled</th><th>Action</th></tr>
                </thead>
                <tbody id="studentBody"></tbody>
            </table>
        `;
    }

    renderStudent(student) {
        const tbody = this.container.querySelector('#studentBody');
        const tr = document.createElement('tr');
        tr.dataset.id = student.id;
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${student.enrolled}</td>
            <td><button class="delete">Remove</button></td>
        `;
        tbody.appendChild(tr);
    }

    showError(message) {
        const errorDiv = this.container.querySelector('#errors');
        errorDiv.textContent = message;
        setTimeout(() => errorDiv.textContent = '', 3000);
    }

    attachEvents() {
        const form = this.container.querySelector('#addForm');
        const table = this.container.querySelector('table');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = this.container.querySelector('#name').value.trim();
            const grade = this.container.querySelector('#grade').value;

            if (name.length < 2) {
                this.showError('Name must be at least 2 characters');
                return;
            }

            this.addStudent(name, grade);
            form.reset();
        });

        table.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete')) {
                const id = parseInt(e.target.closest('tr').dataset.id);
                this.removeStudent(id);
            }
        });
    }
}

const manager = new StudentManager();
</script>
</body>
</html>
```

## Project 4: Inventory Manager

```html
<!DOCTYPE html>
<html>
<head>
    <title>Inventory Manager</title>
    <style>
        .low-stock { color: red; font-weight: bold; }
        .item-card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; }
    </style>
</head>
<body>
    <div id="app"></div>

<script>
class InventoryManager {
    constructor() {
        this.items = [];
        this.container = document.getElementById('app');
        this.render();
        this.attachEvents();
    }

    addItem(name, quantity, price, category) {
        const item = {
            id: Date.now(),
            name,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            category,
            added: new Date().toLocaleDateString()
        };
        this.items.push(item);
        this.renderItem(item);
        this.updateSummary();
    }

    restock(id, amount) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.quantity += parseInt(amount);
            this.updateItemDisplay(id);
            this.updateSummary();
        }
    }

    sell(id, amount) {
        const item = this.items.find(i => i.id === id);
        if (item && item.quantity >= amount) {
            item.quantity -= parseInt(amount);
            this.updateItemDisplay(id);
            this.updateSummary();
        } else {
            alert('Not enough stock!');
        }
    }

    removeItem(id) {
        this.items = this.items.filter(i => i.id !== id);
        const card = this.container.querySelector(`[data-id="${id}"]`);
        if (card) card.remove();
        this.updateSummary();
    }

    getTotalValue() {
        return this.items.reduce((sum, i) => sum + (i.price * i.quantity), 0).toFixed(2);
    }

    getLowStock() {
        return this.items.filter(i => i.quantity < 5).length;
    }

    updateSummary() {
        this.container.querySelector('#totalItems').textContent = this.items.length;
        this.container.querySelector('#totalValue').textContent = '$' + this.getTotalValue();
        this.container.querySelector('#lowStock').textContent = this.getLowStock();
    }

    render() {
        this.container.innerHTML = `
            <h1>Inventory Manager</h1>
            <div class="summary">
                <span>Items: <strong id="totalItems">0</strong></span>
                <span>Value: <strong id="totalValue">$0</strong></span>
                <span>Low Stock: <strong id="lowStock">0</strong></span>
            </div>
            <form id="addForm">
                <input type="text" id="name" placeholder="Item name" required>
                <input type="number" id="quantity" placeholder="Quantity" min="0" required>
                <input type="number" id="price" placeholder="Price" step="0.01" min="0" required>
                <select id="category">
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="food">Food</option>
                    <option value="other">Other</option>
                </select>
                <button type="submit">Add Item</button>
            </form>
            <div id="inventoryGrid" class="grid"></div>
        `;
    }

    renderItem(item) {
        const grid = this.container.querySelector('#inventoryGrid');
        const card = document.createElement('div');
        card.className = 'item-card';
        card.dataset.id = item.id;
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p>
            <p>Price: $${item.price}</p>
            <p class="quantity ${item.quantity < 5 ? 'low-stock' : ''}">Stock: ${item.quantity}</p>
            <p>Value: $${(item.price * item.quantity).toFixed(2)}</p>
            <div>
                <input type="number" class="amount" placeholder="Amount" min="1">
                <button class="restock">Restock</button>
                <button class="sell">Sell</button>
                <button class="delete">Remove</button>
            </div>
        `;
        grid.appendChild(card);
    }

    updateItemDisplay(id) {
        const item = this.items.find(i => i.id === id);
        const card = this.container.querySelector(`[data-id="${id}"]`);
        if (card && item) {
            card.querySelector('.quantity').textContent = `Stock: ${item.quantity}`;
            card.querySelector('.quantity').classList.toggle('low-stock', item.quantity < 5);
        }
    }

    attachEvents() {
        const form = this.container.querySelector('#addForm');
        const grid = this.container.querySelector('#inventoryGrid');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = this.container.querySelector('#name').value;
            const qty = this.container.querySelector('#quantity').value;
            const price = this.container.querySelector('#price').value;
            const category = this.container.querySelector('#category').value;
            this.addItem(name, qty, price, category);
            form.reset();
        });

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.item-card');
            if (!card) return;
            const id = parseInt(card.dataset.id);
            const amount = card.querySelector('.amount').value || 1;

            if (e.target.classList.contains('restock')) {
                this.restock(id, amount);
            } else if (e.target.classList.contains('sell')) {
                this.sell(id, amount);
            } else if (e.target.classList.contains('delete')) {
                this.removeItem(id);
            }
        });
    }
}

const inventory = new InventoryManager();
</script>
</body>
</html>
```

## Project 5: Character Manager (RPG Style)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Character Manager</title>
    <style>
        .character-card { border: 2px solid #333; padding: 20px; margin: 10px; border-radius: 10px; background: #f5f5f5; }
        .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .stat-bar { background: #ddd; height: 20px; border-radius: 10px; overflow: hidden; }
        .stat-fill { height: 100%; background: #4CAF50; transition: width 0.3s; }
        .hp-fill { background: #f44336; }
        .mp-fill { background: #2196F3; }
        .class-warrior { border-color: #f44336; }
        .class-mage { border-color: #2196F3; }
        .class-rogue { border-color: #4CAF50; }
    </style>
</head>
<body>
    <div id="app"></div>

<script>
class Character {
    constructor(name, characterClass) {
        this.id = Date.now();
        this.name = name;
        this.characterClass = characterClass;
        this.level = 1;
        this.xp = 0;
        this.xpToNext = 100;

        // Base stats based on class
        const classStats = {
            warrior: { hp: 150, mp: 30, str: 15, dex: 8, int: 5 },
            mage:    { hp: 80,  mp: 120, str: 5, dex: 8, int: 18 },
            rogue:   { hp: 100, mp: 50, str: 10, dex: 16, int: 8 }
        };

        const base = classStats[characterClass];
        this.maxHp = base.hp;
        this.hp = base.hp;
        this.maxMp = base.mp;
        this.mp = base.mp;
        this.str = base.str;
        this.dex = base.dex;
        this.int = base.int;
    }

    gainXp(amount) {
        this.xp += amount;
        if (this.xp >= this.xpToNext) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.xp -= this.xpToNext;
        this.xpToNext = Math.floor(this.xpToNext * 1.5);

        // Stat increases
        this.maxHp += 20;
        this.hp = this.maxHp;
        this.maxMp += 10;
        this.mp = this.maxMp;
        this.str += 2;
        this.dex += 2;
        this.int += 2;
    }

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
    }

    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    useMp(amount) {
        if (this.mp >= amount) {
            this.mp -= amount;
            return true;
        }
        return false;
    }
}

class CharacterManager {
    constructor() {
        this.characters = [];
        this.container = document.getElementById('app');
        this.render();
        this.attachEvents();
    }

    addCharacter(name, characterClass) {
        const character = new Character(name, characterClass);
        this.characters.push(character);
        this.renderCharacterCard(character);
    }

    removeCharacter(id) {
        this.characters = this.characters.filter(c => c.id !== id);
        const card = this.container.querySelector(`[data-id="${id}"]`);
        if (card) card.remove();
    }

    gainXp(id, amount) {
        const character = this.characters.find(c => c.id === id);
        if (character) {
            const oldLevel = character.level;
            character.gainXp(amount);
            this.updateCharacterDisplay(id);
            if (character.level > oldLevel) {
                alert(`${character.name} leveled up to ${character.level}!`);
            }
        }
    }

    heal(id) {
        const character = this.characters.find(c => c.id === id);
        if (character) {
            character.heal(30);
            this.updateCharacterDisplay(id);
        }
    }

    damage(id) {
        const character = this.characters.find(c => c.id === id);
        if (character) {
            character.takeDamage(20);
            this.updateCharacterDisplay(id);
            if (character.hp === 0) {
                alert(`${character.name} has been defeated!`);
            }
        }
    }

    render() {
        this.container.innerHTML = `
            <h1>Character Manager</h1>
            <form id="createForm">
                <input type="text" id="charName" placeholder="Character name" required>
                <select id="charClass">
                    <option value="warrior">Warrior</option>
                    <option value="mage">Mage</option>
                    <option value="rogue">Rogue</option>
                </select>
                <button type="submit">Create Character</button>
            </form>
            <div id="characterGrid" class="grid"></div>
        `;
    }

    renderCharacterCard(character) {
        const grid = this.container.querySelector('#characterGrid');
        const card = document.createElement('div');
        card.className = `character-card class-${character.characterClass}`;
        card.dataset.id = character.id;
        card.innerHTML = `
            <h3>${character.name}</h3>
            <p>Class: ${character.characterClass}</p>
            <p>Level: <span class="level">${character.level}</span></p>
            <p>XP: <span class="xp">${character.xp}</span> / <span class="xpToNext">${character.xpToNext}</span></p>
            <div class="stats">
                <div>HP: <span class="hp">${character.hp}</span> / <span class="maxHp">${character.maxHp}</span>
                    <div class="stat-bar"><div class="stat-fill hp-fill" style="width:${(character.hp/character.maxHp)*100}%"></div></div>
                </div>
                <div>MP: <span class="mp">${character.mp}</span> / <span class="maxMp">${character.maxMp}</span>
                    <div class="stat-bar"><div class="stat-fill mp-fill" style="width:${(character.mp/character.maxMp)*100}%"></div></div>
                </div>
                <div>STR: <span class="str">${character.str}</span></div>
                <div>DEX: <span class="dex">${character.dex}</span></div>
                <div>INT: <span class="int">${character.int}</span></div>
            </div>
            <div>
                <button class="gainXp">+XP</button>
                <button class="heal">Heal</button>
                <button class="damage">Damage</button>
                <button class="delete">Remove</button>
            </div>
        `;
        grid.appendChild(card);
    }

    updateCharacterDisplay(id) {
        const character = this.characters.find(c => c.id === id);
        const card = this.container.querySelector(`[data-id="${id}"]`);
        if (card && character) {
            card.querySelector('.level').textContent = character.level;
            card.querySelector('.xp').textContent = character.xp;
            card.querySelector('.xpToNext').textContent = character.xpToNext;
            card.querySelector('.hp').textContent = character.hp;
            card.querySelector('.maxHp').textContent = character.maxHp;
            card.querySelector('.mp').textContent = character.mp;
            card.querySelector('.maxMp').textContent = character.maxMp;
            card.querySelector('.str').textContent = character.str;
            card.querySelector('.dex').textContent = character.dex;
            card.querySelector('.int').textContent = character.int;
            card.querySelector('.hp-fill').style.width = `${(character.hp/character.maxHp)*100}%`;
            card.querySelector('.mp-fill').style.width = `${(character.mp/character.maxMp)*100}%`;
        }
    }

    attachEvents() {
        const form = this.container.querySelector('#createForm');
        const grid = this.container.querySelector('#characterGrid');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = this.container.querySelector('#charName').value;
            const charClass = this.container.querySelector('#charClass').value;
            this.addCharacter(name, charClass);
            form.reset();
        });

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.character-card');
            if (!card) return;
            const id = parseInt(card.dataset.id);

            if (e.target.classList.contains('gainXp')) {
                this.gainXp(id, 50);
            } else if (e.target.classList.contains('heal')) {
                this.heal(id);
            } else if (e.target.classList.contains('damage')) {
                this.damage(id);
            } else if (e.target.classList.contains('delete')) {
                this.removeCharacter(id);
            }
        });
    }
}

const game = new CharacterManager();
</script>
</body>
</html>
```

---

# SUMMARY: The Architecture Pattern

Every application in this guide follows the same architecture:

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│   DOM Events    │────→│   Methods    │────→│  State/Data │
│  (user clicks)  │     │  (business   │     │  (objects,  │
│                 │     │   logic)     │     │   arrays)   │
└─────────────────┘     └──────────────┘     └─────────────┘
         ↑                      │                    │
         └──────────────────────┘←───────────────────┘
                              ↓
                    ┌─────────────────┐
                    │  DOM Updates    │
                    │ (render methods)│
                    └─────────────────┘
```

This is the exact pattern React, Vue, and Angular use — just without the framework magic. Master this with plain JavaScript, and frameworks will make intuitive sense.

## Key Principles

1. **The DOM is just objects** — Every HTML element is a JavaScript object you can read and modify
2. **Events are the entry point** — Nothing happens until a user triggers an event
3. **State is the source of truth** — Your JavaScript objects hold the real data; the DOM is just the display
4. **Classes are components** — One class = one self-contained piece of UI with its own state and behavior
5. **Arrow functions preserve `this`** — Always use `() => this.method()` in event listeners inside classes
6. **Event delegation is efficient** — Attach one listener to a parent, use `event.target` to identify which child was clicked
7. **Clear before re-rendering** — Always reset container content before building new elements to avoid duplicates
8. **Update only what changed** — For performance, modify existing elements rather than rebuilding everything

Work through each stage in order, build each project, and you'll be comfortable building complete applications with plain JavaScript before touching any framework.
.