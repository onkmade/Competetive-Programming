# The Complete Guide to DOM Selection & Events

## A Developer's Mental Model for JavaScript and the Browser

---

## Table of Contents

1. [Introduction: Why This Matters](#introduction-why-this-matters)
2. [Part 1: DOM Selection Deep Dive](#part-1-dom-selection-deep-dive)
   - [What Is DOM Selection, Really?](#what-is-dom-selection-really)
   - [The Four Core Methods](#the-four-core-methods)
     - [querySelector()](#queryselector)
     - [querySelectorAll()](#queryselectorall)
     - [getElementsByClassName()](#getelementsbyclassname)
     - [getElementsByTagName()](#getelementsbytagname)
   - [Live vs Static Collections](#live-vs-static-collections)
   - [The Developer's Decision Framework](#the-developers-decision-framework)
   - [Common Mistakes and How to Avoid Them](#common-mistakes-and-how-to-avoid-them)
   - [Performance: What Actually Matters](#performance-what-actually-matters)
   - [Scoped Selection: The Hidden Superpower](#scoped-selection-the-hidden-superpower)
3. [Part 2: DOM Events Deep Dive](#part-2-dom-events-deep-dive)
   - [What Is an Event, Really?](#what-is-an-event-really)
   - [Event-Driven Programming](#event-driven-programming)
   - [The Event Object: Your Crime Scene Report](#the-event-object-your-crime-scene-report)
   - [Mouse Events](#mouse-events)
   - [Keyboard Events](#keyboard-events)
   - [Form Events](#form-events)
   - [Event Flow: Capturing and Bubbling](#event-flow-capturing-and-bubbling)
   - [Event Delegation](#event-delegation)
4. [Part 3: Connecting Selection and Events](#part-3-connecting-selection-and-events)
5. [Part 4: Practice Challenges](#part-4-practice-challenges)
   - [Level 1: Element Selection](#level-1-element-selection)
   - [Level 2: Basic Events](#level-2-basic-events)
   - [Level 3: Event Object](#level-3-event-object)
   - [Level 4: Multiple Elements](#level-4-multiple-elements)
   - [Level 5: Dynamic UI](#level-5-dynamic-ui)
   - [Level 6: Arrays + DOM](#level-6-arrays--dom)
   - [Level 7: Objects + DOM](#level-7-objects--dom)
   - [Level 8: Classes + DOM](#level-8-classes--dom)
   - [Level 9: Real Mini Projects](#level-9-real-mini-projects)
6. [Key Takeaways](#key-takeaways)
7. [When You'll Use This in Real Projects](#when-youll-use-this-in-real-projects)
8. [Things Beginners Often Miss](#things-beginners-often-miss)
9. [Summary for Quick Revision](#summary-for-quick-revision)
10. [Challenge Questions](#challenge-questions)

---

## Introduction: Why This Matters

Every modern web application is a conversation between three parties:

1. **The User** — clicks, types, scrolls, expects responses
2. **The Browser** — renders HTML, detects actions, creates events
3. **Your JavaScript** — listens, decides, updates

DOM selection and event handling are the **two bridges** that connect these parties. Without them, your JavaScript is blind and mute. With them, you can build anything from a simple button to a full-featured application.

This guide is not a syntax reference. It's a **mental model handbook**. By the end, you won't just know the methods — you'll understand *why* they exist, *when* to use them, and *how* experienced developers think about the DOM.

---

## Part 1: DOM Selection Deep Dive

### What Is DOM Selection, Really?

When you select a DOM element, you are not "finding" it in the way you find a word in a dictionary. You are creating a **reference** — a live connection between your JavaScript variable and a specific node in the browser's internal tree structure.

Think of the DOM as a physical building:
- The HTML is the blueprint
- The browser constructs the building (the DOM tree)
- Your JavaScript stands outside, holding a map
- Selection methods are the **doors** you walk through to enter specific rooms

Once you have a reference, you can:
- **Read** its content, attributes, styles
- **Write** new content, attributes, styles
- **Listen** for events happening to it
- **Traverse** to its parents, children, or siblings

Without a reference, the element might as well not exist to your code.

```
┌─────────────────────────────────────┐
│           DOCUMENT (root)           │
│                                     │
│    ┌─────────┐    ┌──────────┐     │
│    │  <html> │    │          │     │
│    │         │    │          │     │
│    │  ┌───┐  │    │  ┌────┐  │     │
│    │  │head│  │    │  │body│  │     │
│    │  └───┘  │    │  └────┘  │     │
│    └─────────┘    └──────────┘     │
│                                     │
│  Your JS: const btn =               │
│    document.querySelector('button') │
│                                     │
│  btn is now a REFERENCE to the     │
│  actual button node in this tree    │
└─────────────────────────────────────┘
```

### The Four Core Methods

#### querySelector()

**What it is:** A single-element selector that speaks CSS.

**Why it exists:** CSS already solved the problem of describing elements. Rather than invent a new selection language, JavaScript borrowed CSS selectors wholesale. This means anything you can target in a stylesheet, you can target in JavaScript.

**The mental model:**
> "Give me the *first* element that matches this CSS pattern."

**When developers reach for it:**
- You need exactly one element
- You want to use CSS specificity: `.card > .title`, `[data-active]`, `:nth-child(2)`, `#modal .close-btn`
- You're selecting by attribute, pseudo-class, or complex descendant relationships
- You want scoped selection (searching within a specific container)

**The critical detail:** It returns `null` if nothing matches. This is the source of countless bugs:

```javascript
// This will CRASH if .title doesn't exist
const title = document.querySelector('.title');
console.log(title.textContent); // TypeError: Cannot read property 'textContent' of null
```

**Real-world example:**
```javascript
// Selecting a modal's close button
const closeBtn = document.querySelector('#settings-modal .close-btn');

// Selecting the first invalid form field
const firstError = document.querySelector('.form-field.is-invalid');

// Selecting by data attribute (very common in modern apps)
const activeTab = document.querySelector('[data-tab-active="true"]');
```

**Performance reality:** `querySelector` walks the DOM tree from the root (or from the scoped element), testing each node against your CSS selector. For simple selectors on typical pages, this is negligible (microseconds). For complex selectors on massive pages, it can be slower — but in practice, this rarely matters unless you're querying thousands of times per second.

**Developer insight:** Experienced developers use `querySelector` for 80% of their selections because it's flexible, predictable, and readable.

---

#### querySelectorAll()

**What it is:** Returns *all* elements matching a CSS selector, as a **static** `NodeList`.

**Why it exists:** Sometimes you need to operate on a group, not an individual. This is the "batch operation" tool — the equivalent of saying "everyone who matches this description, line up."

**The mental model:**
> "Find every element that fits this description, take a snapshot, and give me the list."

**Critical concept — Static collection:**
The `NodeList` you get is a **snapshot** taken at the moment of selection. If elements are added or removed from the DOM later, your `NodeList` does not update.

This is usually what you want. Imagine you're iterating over a list and removing items:

```javascript
const items = document.querySelectorAll('.item');
items.forEach(item => {
    if (item.textContent === 'delete me') {
        item.remove(); // Safe! The NodeList doesn't shrink
    }
});
```

If `items` were a live collection, `items.length` would shrink as you removed elements, and your loop would skip items or crash.

**When developers reach for it:**
- Attaching the same behavior to multiple elements
- Collecting data from a group (all prices, all names, all checked boxes)
- Iterating to apply styles or classes
- Batch reading or writing operations

**The array-like trap:**
`NodeList` has `.length` and bracket indexing (`items[0]`), but it's not a true Array. Modern browsers support `.forEach()`, but if you need `.map()`, `.filter()`, or `.reduce()`, you must convert it:

```javascript
const items = document.querySelectorAll('.item');

// Modern approach: spread into an array
const itemArray = [...items];

// Older approach: Array.from
const itemArray = Array.from(items);
```

**Real-world example:**
```javascript
// Collect all prices and calculate total
const priceElements = document.querySelectorAll('[data-price]');
const total = [...priceElements]
    .reduce((sum, el) => sum + Number(el.dataset.price), 0);

// Add click listener to all delete buttons
const deleteBtns = document.querySelectorAll('.delete-btn');
deleteBtns.forEach(btn => {
    btn.addEventListener('click', handleDelete);
});
```

---

#### getElementsByClassName()

**What it is:** Returns all elements with a specific class, as a **live** `HTMLCollection`.

**Why it still exists:** It's from an earlier era of the web (pre-2008), before `querySelectorAll` was widely supported. It remains because:
1. It's slightly faster for this specific job
2. It returns a live collection, which is sometimes exactly what you need
3. Removing it would break millions of websites

**The mental model:**
> "Keep an eye on this class. If elements gain or lose it, I want my collection to reflect that automatically."

**Critical concept — Live collection:**
An `HTMLCollection` is **live**. If you add a new element with that class, your collection grows. If you remove one, it shrinks.

**The live collection trap:**
```javascript
const items = document.getElementsByClassName('item');
for (let i = 0; i < items.length; i++) {
    // If this loop removes the class 'item' from an element,
    // items.length SHRINKS, and you skip elements or crash.
    if (shouldRemove(items[i])) {
        items[i].classList.remove('item'); // DANGEROUS in a live collection!
    }
}
```

**When developers still use it:**
- Performance-critical code selecting by class (marginally faster than `querySelectorAll`)
- When you genuinely want a live view of elements with a certain class
- Legacy codebases

**When to avoid it:** Almost always, unless you specifically need the live behavior. The foot-gun potential outweighs the minor performance benefit for most applications.

**Real-world example (legitimate use):**
```javascript
// You want to know how many 'active' items exist at any moment
const activeItems = document.getElementsByClassName('active');

// Later, when you add a new active item...
const newItem = document.createElement('div');
newItem.classList.add('active');
document.body.appendChild(newItem);

// activeItems.length has automatically increased!
console.log(activeItems.length); // Includes the new item
```

---

#### getElementsByTagName()

**What it is:** Returns all elements of a specific tag, as a **live** `HTMLCollection`.

**Why it exists:** Same era as `getElementsByClassName`. It's the most direct way to say "give me all the `<input>` elements" or "all the `<tr>` rows."

**The mental model:**
> "I want every instance of this HTML tag, and I want to know immediately when new ones appear."

**When developers reach for it:**
- Selecting all inputs in a form
- Selecting all rows in a table body
- Working with SVG or XML documents where tag names are meaningful
- Very old codebases

**Same live collection warning applies.**

**Real-world example:**
```javascript
// Quick way to get all form inputs
const allInputs = document.getElementsByTagName('input');

// Working with table rows
const tableRows = document.getElementsByTagName('tr');
```

---

### Live vs Static Collections

This is one of the most important distinctions in DOM selection. Getting it wrong leads to subtle, hard-to-debug issues.

| Aspect | Live (`HTMLCollection`) | Static (`NodeList`) |
|---|---|---|
| **Updates when DOM changes?** | Yes — automatically | No — snapshot at selection time |
| **Safe to loop and modify?** | No — length changes mid-loop | Yes — length is fixed |
| **Returned by** | `getElementsByClassName`, `getElementsByTagName`, `children` | `querySelectorAll`, `childNodes` |
| **Array methods available?** | No — must convert | No — must convert |
| **Modern preference** | Rarely used | Default choice |
| **Performance** | Slightly faster for specific lookups | Slightly slower but more predictable |

**Visual diagram:**

```
LIVE COLLECTION (HTMLCollection):
┌─────────────────────────────┐
│  Collection: [A, B, C]      │
│                             │
│  DOM:  A → B → C            │
│                             │
│  Add D with class 'item'    │
│                             │
│  Collection: [A, B, C, D]   │  ← Automatically updated!
│  DOM:  A → B → C → D        │
└─────────────────────────────┘

STATIC COLLECTION (NodeList):
┌─────────────────────────────┐
│  Collection: [A, B, C]      │
│                             │
│  DOM:  A → B → C            │
│                             │
│  Add D with class 'item'    │
│                             │
│  Collection: [A, B, C]      │  ← Still the same!
│  DOM:  A → B → C → D        │
└─────────────────────────────┘
```

**The developer's thought process:**
1. Do I need to select by complex CSS criteria? → `querySelector` / `querySelectorAll`
2. Am I selecting by class and need a live view? → `getElementsByClassName`
3. Am I going to loop and potentially modify the DOM during that loop? → `querySelectorAll` (static is safer)
4. Do I need array methods? → `querySelectorAll`, then convert: `[...nodes]`
5. Am I writing new code in 2024+? → Almost certainly `querySelector` / `querySelectorAll`

---

### The Developer's Decision Framework

When an experienced developer needs to select elements, they don't randomly pick a method. They follow a mental checklist:

```
┌─────────────────────────────────────────────┐
│  SELECTION DECISION FLOWCHART                 │
│                                               │
│  Do I need only ONE element?                  │
│    ├── Yes → querySelector()                  │
│    └── No → Continue                          │
│                                               │
│  Do I need to select by complex CSS?          │
│    ├── Yes → querySelectorAll()               │
│    └── No → Continue                          │
│                                               │
│  Do I need a live, auto-updating collection?  │
│    ├── Yes → getElementsByClassName()         │
│    │           or getElementsByTagName()      │
│    └── No → querySelectorAll()                │
│                                               │
│  Am I in a loop that modifies the DOM?        │
│    ├── Yes → querySelectorAll() (static!)     │
│    └── No → Any method works                  │
│                                               │
│  Is this new code (not legacy)?               │
│    ├── Yes → querySelector / querySelectorAll │
│    └── No → Match existing codebase style     │
└─────────────────────────────────────────────┘
```

---

### Common Mistakes and How to Avoid Them

#### Mistake 1: Assuming `querySelector` returns an array

```javascript
// WRONG: querySelector returns a single element or null
const buttons = document.querySelector('.btn'); // Just ONE element
buttons.forEach(() => {}); // TypeError: buttons.forEach is not a function

// RIGHT: Use querySelectorAll for multiple elements
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => { /* ... */ });
```

This confuses people coming from jQuery, where `$('.btn')` returns a collection.

#### Mistake 2: Not checking for `null`

```javascript
// WRONG: Assumes element exists
const title = document.querySelector('.title');
console.log(title.textContent); // CRASHES if .title doesn't exist

// RIGHT: Always guard against null
const title = document.querySelector('.title');
if (title) {
    console.log(title.textContent);
}

// Or use optional chaining (modern JS)
console.log(title?.textContent);
```

**Why this happens:** The element might not be in the DOM yet (script runs before HTML parses), or it might be dynamically added later, or the selector might have a typo.

#### Mistake 3: Selecting inside the wrong scope

```javascript
// WRONG: Searches entire document every time
const modalTitle = document.querySelector('#modal .title');
const modalBody = document.querySelector('#modal .body');
const modalClose = document.querySelector('#modal .close');

// RIGHT: Search within the modal container
const modal = document.querySelector('#modal');
const modalTitle = modal.querySelector('.title');
const modalBody = modal.querySelector('.body');
const modalClose = modal.querySelector('.close');
```

This is called **scoped selection** and it's how you build component-like behavior without frameworks. It's faster (searches a smaller tree) and more robust (won't accidentally match elements outside your intended scope).

#### Mistake 4: Re-selecting in loops

```javascript
// WRONG: Queries DOM repeatedly
for (let i = 0; i < 100; i++) {
    const container = document.querySelector('.container');
    container.appendChild(document.createElement('div'));
}

// RIGHT: Select once, reuse
const container = document.querySelector('.container');
for (let i = 0; i < 100; i++) {
    container.appendChild(document.createElement('div'));
}
```

Each DOM query has a cost. Cache your selections in variables.

#### Mistake 5: Forgetting that IDs should be unique

```javascript
// HTML has duplicate IDs (invalid but browsers forgive it)
<div id="item">First</div>
<div id="item">Second</div>

// getElementById returns only the FIRST one
const item = document.getElementById('item'); // Only "First"
```

Browsers are forgiving, but your code becomes unpredictable. Always use unique IDs.

---

### Performance: What Actually Matters

**What is fast:**
- DOM queries are heavily optimized in modern browsers
- A single `querySelector` call takes microseconds
- The browser caches selector results internally

**What actually slows you down:**

1. **Repeated queries inside loops**
   ```javascript
   // Bad: 100 DOM queries
   for (let i = 0; i < 100; i++) {
       document.querySelector('.list').appendChild(item);
   }

   // Good: 1 DOM query
   const list = document.querySelector('.list');
   for (let i = 0; i < 100; i++) {
       list.appendChild(item);
   }
   ```

2. **Reading from the DOM inside loops (forces reflow)**
   ```javascript
   // Bad: Forces browser to recalculate layout 100 times
   for (let i = 0; i < 100; i++) {
       const height = element.offsetHeight; // Read
       element.style.height = height + 1 + 'px'; // Write
   }

   // Good: Batch reads, then batch writes
   const height = element.offsetHeight; // Read once
   for (let i = 0; i < 100; i++) {
       element.style.height = (height + i) + 'px'; // Write
   }
   ```

3. **Selecting thousands of elements unnecessarily**
   ```javascript
   // Bad: Selects every element on the page
   const all = document.querySelectorAll('*');

   // Good: Be specific
   const items = document.querySelectorAll('.item');
   ```

**The golden rule:** Cache your selections. Batch your reads. Batch your writes.

---

### Scoped Selection: The Hidden Superpower

One of the most underappreciated patterns in vanilla JavaScript is **scoped selection** — searching within a specific container rather than the entire document.

```javascript
// Instead of this (searches entire document):
const modalTitle = document.querySelector('#settings-modal .modal-title');
const modalBody = document.querySelector('#settings-modal .modal-body');
const modalClose = document.querySelector('#settings-modal .close-btn');

// Do this (searches only within the modal):
const modal = document.querySelector('#settings-modal');
const modalTitle = modal.querySelector('.modal-title');
const modalBody = modal.querySelector('.modal-body');
const modalClose = modal.querySelector('.close-btn');
```

**Why this matters:**
- **Performance:** Searches a smaller tree
- **Correctness:** Won't accidentally match elements outside your intended scope
- **Component thinking:** Each container manages its own children
- **Maintainability:** If the container structure changes, you update one selector instead of many

**Real-world pattern:**
```javascript
class Modal {
    constructor(element) {
        this.element = element;
        this.title = element.querySelector('.modal-title');
        this.body = element.querySelector('.modal-body');
        this.closeBtn = element.querySelector('.close-btn');

        this.closeBtn.addEventListener('click', () => this.hide());
    }

    setTitle(text) { this.title.textContent = text; }
    setContent(html) { this.body.innerHTML = html; }
    show() { this.element.classList.add('visible'); }
    hide() { this.element.classList.remove('visible'); }
}

// Each modal is self-contained
const settingsModal = new Modal(document.querySelector('#settings-modal'));
const profileModal = new Modal(document.querySelector('#profile-modal'));
```

This is how you build component-like architecture without React, Vue, or Angular.

---

## Part 2: DOM Events Deep Dive

### What Is an Event, Really?

An event is a **signal** that something happened. That "something" could be:
- A user action (clicked, typed, moved the mouse)
- A browser action (finished loading, resized the window, an error occurred)
- A programmatic action (you dispatched a custom event)

Events are the **nervous system** of the browser. Without them, your page is a static document. With them, it's an application that responds to the world.

**The mental model:**
> The browser is constantly watching. When something noteworthy happens, it creates an **event object** — a package of data describing what occurred — and asks: "Does anyone care about this?" If you've registered a listener, the browser delivers that package to your function.

```
┌─────────────────────────────────────────────────────────────┐
│                    THE EVENT LIFECYCLE                       │
│                                                             │
│   1. SOMETHING HAPPENS                                      │
│      User clicks a button                                   │
│           ↓                                                 │
│   2. BROWSER DETECTS IT                                     │
│      Browser's event system notices the click               │
│           ↓                                                 │
│   3. EVENT OBJECT CREATED                                   │
│      { type: "click", target: <button>, clientX: 150, ... } │
│           ↓                                                 │
│   4. BROWSER CHECKS FOR LISTENERS                          │
│      "Does anyone care about 'click' on this element?"    │
│           ↓                                                 │
│   5. LISTENER FUNCTION CALLED                              │
│      Your function receives the event object               │
│           ↓                                                 │
│   6. YOUR CODE RUNS                                        │
│      You read event data, update DOM, call APIs, etc.      │
│           ↓                                                 │
│   7. USER SEES THE RESULT                                  │
│      The page updates, the user gets feedback              │
└─────────────────────────────────────────────────────────────┘
```

### Event-Driven Programming

Traditional programming is sequential:
```
Line 1 runs → Line 2 runs → Line 3 runs → Done
```

Event-driven programming is reactive:
```
Your code sits idle → Event happens → Specific function runs → Back to idle
```

**Why this matters:** Modern UIs are inherently event-driven. You cannot predict when a user will click. You cannot predict what they'll type. Your code must be structured as a set of responses, not a linear script.

**The shift in thinking:**

| Before (Sequential) | After (Event-Driven) |
|---|---|
| "Do this, then that, then the other thing." | "When X happens, do this. When Y happens, do that." |
| `const name = prompt("What's your name?")` | Input field + submit button + click listener |
| `alert("Done!")` | Toast notification triggered by an event |
| `while (true) { checkForInput() }` | `element.addEventListener('input', handler)` |

This is why callbacks, promises, and async/await exist — they all serve the same master: responding to things that happen outside your control.

**Real-world analogy:**
> Imagine a restaurant. The chef (your JavaScript) doesn't stand at the door asking "Is anyone hungry?" every second. Instead, the chef waits in the kitchen. When a customer orders (event), the waiter (browser) brings the ticket (event object) to the chef. The chef cooks (handler runs), the waiter delivers (DOM updates), and the chef waits for the next order.

### Why Modern Applications Rely on Events

1. **User unpredictability:** You don't control the user. Events let you react without polling or blocking.

2. **Decoupling:** The button doesn't know about your JavaScript. Your JavaScript doesn't know about the button until it listens. They're independent until connected by an event.

3. **Composition:** Multiple listeners can respond to the same event. A click can trigger validation, analytics, and UI updates simultaneously.
   ```javascript
   button.addEventListener('click', validateForm);
   button.addEventListener('click', trackAnalytics);
   button.addEventListener('click', showLoadingState);
   ```

4. **Browser integration:** Events bridge JavaScript and the browser's native behavior (form submission, link navigation, scrolling).

5. **Performance:** Events are efficient. The browser only calls your code when necessary. No wasted CPU cycles checking for changes.

### The Event Object: Your Crime Scene Report

When an event fires, the browser creates an object and passes it to your listener. This object is your **only** source of truth about what happened.

**Universal properties (all events):**

| Property | Description | Example |
|---|---|---|
| `type` | What happened? | `"click"`, `"keydown"`, `"input"` |
| `target` | The element that triggered the event (deepest in tree) | `<button id="submit">` |
| `currentTarget` | The element whose listener is currently running | `<div class="container">` |
| `timeStamp` | When did it happen? (ms since page load) | `12345.67` |
| `bubbles` | Does this event bubble up the DOM? | `true` for most events |
| `cancelable` | Can `preventDefault()` stop the default action? | `true` for most events |

**The mental model:**
> The event object is a crime scene report. It tells you exactly where, when, and how the incident occurred. Your job is to read the report and decide what to do.

```javascript
element.addEventListener('click', function(event) {
    // The event object is your only source of truth
    console.log(event.type);      // "click"
    console.log(event.target);    // The actual element clicked
    console.log(event.timeStamp); // When it happened
});
```

### Mouse Events

| Event | What Triggers It | Key Data |
|---|---|---|
| `click` | Primary mouse button pressed and released on element | `target`, `clientX/Y` |
| `dblclick` | Two rapid clicks | Same as click; use carefully |
| `mouseenter` | Mouse moves *onto* an element | `target`, `relatedTarget` |
| `mouseleave` | Mouse moves *off* an element | `target`, `relatedTarget` |
| `mouseover` | Mouse moves over element **or any descendant** | `target`, `relatedTarget` — bubbles! |
| `mouseout` | Mouse leaves element **or any descendant** | `target`, `relatedTarget` — bubbles! |
| `mousedown` | Mouse button pressed down | `button` (0=left, 1=middle, 2=right) |
| `mouseup` | Mouse button released | Same as mousedown |
| `mousemove` | Mouse moves *any amount* while over element | `clientX/Y`, `movementX/Y` — fires A LOT |

#### Critical Distinction: `mouseenter`/`mouseleave` vs `mouseover`/`mouseout`

```
┌─────────────────────────────────────────────────────────────┐
│  mouseenter / mouseleave (DO NOT BUBBLE)                   │
│                                                             │
│     ┌─────────────┐                                         │
│     │   PARENT    │  ← mouseenter fires here once          │
│     │  ┌───────┐  │                                         │
│     │  │ CHILD │  │  ← Moving to child does NOT trigger    │
│     │  └───────┘  │    mouseleave on parent                │
│     └─────────────┘                                         │
│                                                             │
│  mouseover / mouseout (DO BUBBLE)                           │
│                                                             │
│     ┌─────────────┐                                         │
│     │   PARENT    │  ← mouseover fires here                │
│     │  ┌───────┐  │                                         │
│     │  │ CHILD │  │  ← mouseout on PARENT,                │
│     │  └───────┘  │    mouseover on CHILD fires            │
│     └─────────────┘                                         │
│                                                             │
│  Use mouseenter/leave for hover effects on containers.     │
│  Use mouseover/out only if you need child boundary detection.│
└─────────────────────────────────────────────────────────────┘
```

**Real-world example:**
```javascript
// Tooltip on a card — use mouseenter/leave
const card = document.querySelector('.card');
card.addEventListener('mouseenter', showTooltip);
card.addEventListener('mouseleave', hideTooltip);

// Dropdown menu — use mouseover to highlight items
const menu = document.querySelector('.menu');
menu.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('menu-item')) {
        highlightItem(e.target);
    }
});
```

#### Mouse Position Properties

| Property | Description | Use Case |
|---|---|---|
| `clientX`, `clientY` | Position relative to viewport | Positioning fixed elements |
| `pageX`, `pageY` | Position relative to document | Positioning elements that scroll |
| `offsetX`, `offsetY` | Position relative to target element | Drawing on a canvas |
| `movementX`, `movementY` | Distance moved since last event | First-person camera controls |

```javascript
document.addEventListener('mousemove', (e) => {
    console.log('Viewport:', e.clientX, e.clientY);
    console.log('Document:', e.pageX, e.pageY);
    console.log('Inside element:', e.offsetX, e.offsetY);
});
```

### Keyboard Events

| Event | What Triggers It | Key Data |
|---|---|---|
| `keydown` | Any key pressed down | `key`, `code`, `ctrlKey`, `shiftKey`, `repeat` |
| `keyup` | Any key released | Same as keydown |

**Critical properties:**

| Property | Description | Example |
|---|---|---|
| `key` | Human-readable key name | `"a"`, `"Enter"`, `"ArrowUp"`, `"Backspace"` |
| `code` | Physical key location | `"KeyA"`, `"Enter"`, `"ArrowUp"` |
| `repeat` | Key is being held down (auto-repeat) | `true` / `false` |
| `ctrlKey`, `shiftKey`, `altKey`, `metaKey` | Modifier keys held | `true` / `false` |

**`keydown` vs `keyup`:**
- `keydown`: Fires when the key goes down. Use to **prevent default behavior** (e.g., stop Enter from submitting a form).
- `keyup`: Fires when the key is released. Use when you care about the **final character**, not the press itself.

```javascript
// Prevent form submission on Enter
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Stop the form from submitting
        handleCustomSubmit();
    }
});

// Detect keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveDocument();
    }
});
```

### Form Events

| Event | What Triggers It | Key Data |
|---|---|---|
| `input` | Value changes on every keystroke | `target.value` |
| `change` | Value committed (blur for text, immediately for checkboxes/radio/select) | `target.value`, `target.checked` |
| `focus` | Element gains focus | `target` |
| `blur` | Element loses focus | `target` |
| `submit` | Form submission triggered | `target` (the form), `preventDefault()` |

**`input` vs `change`:**

```
┌─────────────────────────────────────────────────────────────┐
│  input event: CONTINUOUS                                    │
│                                                             │
│  User types: "H" → "He" → "Hel" → "Hell" → "Hello"        │
│  Fires:       ↑      ↑       ↑       ↑        ↑            │
│  Use for: Live search, character counting, real-time val.  │
│                                                             │
│  change event: DISCRETE                                     │
│                                                             │
│  User types: "Hello" → clicks elsewhere (blur)              │
│  Fires:                                    ↑                │
│  Use for: Saving data, triggering searches, expensive ops  │
│                                                             │
│  For checkboxes/radio/select: change fires immediately!    │
└─────────────────────────────────────────────────────────────┘
```

```javascript
// Live character count
const input = document.querySelector('#username');
const counter = document.querySelector('#char-count');

input.addEventListener('input', (e) => {
    counter.textContent = `${e.target.value.length} / 50`;
});

// Validate on blur (when user is "done")
input.addEventListener('blur', (e) => {
    if (e.target.value.length < 3) {
        showError('Username must be at least 3 characters');
    }
});
```

### Event Flow: Capturing and Bubbling

When an event occurs, it doesn't just hit the target element. It travels through the DOM tree in two phases:

```
┌─────────────────────────────────────────────────────────────┐
│                    EVENT FLOW PHASES                         │
│                                                             │
│   CAPTURING PHASE (top-down)                                │
│   ───────────────────────────                               │
│   Document → html → body → div → button                     │
│        ↓       ↓      ↓     ↓      ↓                        │
│      (rarely used, set capture: true)                       │
│                                                             │
│   TARGET PHASE                                              │
│   ─────────────                                             │
│   Event reaches the actual element that was clicked        │
│                                                             │
│   BUBBLING PHASE (bottom-up)                                │
│   ───────────────────────────                               │
│   button → div → body → html → Document                     │
│      ↑      ↑     ↑      ↑       ↑                          │
│   (default! Most listeners attach here)                     │
│                                                             │
│   You can stop propagation: event.stopPropagation()          │
│   You can prevent default: event.preventDefault()            │
└─────────────────────────────────────────────────────────────┘
```

**Why bubbling matters:** This is what makes **event delegation** possible.

### Event Delegation

Instead of attaching a listener to every element, attach **one listener** to a parent and use `event.target` to figure out which child was actually clicked.

```
┌─────────────────────────────────────────────────────────────┐
│  WITHOUT EVENT DELEGATION (bad for dynamic lists)            │
│                                                             │
│  <ul>                                                       │
│    <li><button>Delete</button></li>  ← listener            │
│    <li><button>Delete</button></li>  ← listener            │
│    <li><button>Delete</button></li>  ← listener            │
│  </ul>                                                      │
│                                                             │
│  Problem: New items added later have NO listener!           │
│                                                             │
│  WITH EVENT DELEGATION (one listener handles all)          │
│                                                             │
│  <ul>  ← ONE listener here                                  │
│    <li><button>Delete</button></li>                         │
│    <li><button>Delete</button></li>                         │
│    <li><button>Delete</button></li>                         │
│  </ul>                                                      │
│                                                             │
│  The listener checks: event.target is a delete button?      │
│  Works for items added in the future!                        │
└─────────────────────────────────────────────────────────────┘
```

```javascript
// Event delegation pattern
const list = document.querySelector('.todo-list');

list.addEventListener('click', (e) => {
    // Check if the clicked element (or its ancestor) is a delete button
    const deleteBtn = e.target.closest('.delete-btn');

    if (deleteBtn) {
        // Find the parent todo item and remove it
        const todoItem = deleteBtn.closest('.todo-item');
        todoItem.remove();
    }
});
```

**When to use event delegation:**
- Lists with many items (one listener vs hundreds)
- Dynamic content (items added after page load)
- Memory-constrained environments (fewer listeners = less memory)

**When NOT to use event delegation:**
- Single elements (just attach directly)
- Events that don't bubble (focus, blur, mouseenter, mouseleave)
- When you need to remove listeners individually

---

## Part 3: Connecting Selection and Events

Selection and events are not separate topics. They are two sides of the same coin:

```
┌─────────────────────────────────────────────────────────────┐
│           SELECTION + EVENTS = INTERACTIVE UI               │
│                                                             │
│   1. SELECT the element(s) you care about                   │
│      const button = document.querySelector('#submit');     │
│                                                             │
│   2. ATTACH an event listener                               │
│      button.addEventListener('click', handler);             │
│                                                             │
│   3. In the HANDLER, use the event object                  │
│      function handler(event) {                              │
│          console.log(event.target); // The clicked element  │
│          console.log(event.type);   // "click"             │
│      }                                                      │
│                                                             │
│   4. UPDATE the DOM based on the event                     │
│      event.target.textContent = 'Loading...';               │
│                                                             │
│   This cycle: Select → Listen → React → Update             │
│   is the heartbeat of every interactive web app.          │
└─────────────────────────────────────────────────────────────┘
```

**The complete mental model for a real developer:**

> "I need to know when the user clicks this button. I'll use `querySelector` to get a reference to the button. I'll add a `click` listener. In the handler, I'll check `event.target` to confirm which button was clicked — because if I used event delegation, the target might be an icon inside the button, not the button itself. I'll read `event.clientX` and `event.clientY` if I need to position a tooltip. I'll call `event.preventDefault()` if this button is inside a form and I don't want it to submit. I'll update the DOM based on the button's `data-id` attribute, which I can read from `event.target.dataset.id`."

This is the flow: **Event happens → inspect event object → decide → act on DOM.**

---

## Part 4: Practice Challenges

### Level 1 — Element Selection

1. Select the first paragraph inside a section with class `intro`. Select the last paragraph in the same section using only `querySelector` and CSS pseudo-classes.
2. Select all buttons with the attribute `data-action` and count how many have `data-action="delete"`. Do this without converting the `NodeList` to an array.
3. Select every third list item in a `ul` with id `items`. Update the text of only those items.
4. Given a DOM structure where some elements have both class `active` and class `highlight`, select only elements that have `active` but NOT `highlight`.
5. Select all images that are direct children of a `figure` element and log their `alt` attributes.
6. Using `getElementsByClassName`, select elements with class `dynamic`. Add a new element with that class to the DOM. Verify whether your original collection automatically includes the new element. Explain why.
7. Select a form by its id, then select only the input elements *inside that form* without searching the entire document again.
8. Read the text content of an element, then update it to include the original text plus a suffix. Do this without using `innerHTML`.

### Level 2 — Basic Events

1. Add a `click` listener to a button. When clicked, the button should become unclickable for 2 seconds, then become clickable again.
2. Add a `dblclick` listener to an image. Ensure your implementation does not also trigger single-click behavior.
3. Create two overlapping `div` elements. Add `mouseenter` and `mouseleave` listeners to both. Observe and document the exact sequence of events when moving the mouse from the outer to the inner `div` and back.
4. Add a `mousedown` listener and a `mouseup` listener to the same element. Track whether the mouse button is currently held down, and update a status indicator on the page.
5. Add a `mousemove` listener to the document. Display the current mouse coordinates in a fixed-position element. Ensure the display updates smoothly without lag.
6. Add a `keydown` listener to the document. When the user presses the Escape key, remove a visible modal element from the page.
7. Add an `input` listener to a text field. Display the current character count below the field. Do not allow the count to exceed a maximum.
8. Add a `change` listener to a checkbox. Toggle the visibility of a related section based on whether the checkbox is checked.
9. Add `focus` and `blur` listeners to a password input. When focused, show a strength indicator. When blurred, hide it.
10. Add a `submit` listener to a form. Prevent the actual submission. Instead, collect all form data and display it in a read-only preview area.

### Level 3 — Event Object

1. Add a `click` listener to a container with multiple child buttons. Use `event.target` to determine which specific button was clicked, not `event.currentTarget`.
2. Add a `click` listener to a button that contains a nested `span` and `icon`. Click each part of the button and log `event.target` each time. Explain the pattern you observe.
3. Track the exact pixel position of every `click` on the document. Store the last 10 positions and display them as a list.
4. Add a `mousemove` listener to a specific `div`. Calculate the mouse position relative to the top-left corner of that `div` (not the viewport or document).
5. Add a `keydown` listener. When the user types, display the `key`, `code`, and whether `shiftKey` was held. Distinguish between left and right Shift using `code`.
6. Add a `keydown` listener to an input field. If the user presses Enter, prevent the default behavior and trigger a custom action instead.
7. Add a `mousedown` listener. Determine which mouse button was clicked (left, middle, right) and display a different message for each.
8. Add an `input` listener to a range slider. Read `event.target.value` and use it to update a progress bar's width in real time.
9. Add a `submit` listener to a form. Read `event.target` to access the form element, then extract values from named inputs using the form's elements collection.
10. Add a `dblclick` listener. Measure the time between the two clicks by comparing `event.timeStamp` of the two `click` events that compose it. Explain why this is unreliable.

### Level 4 — Multiple Elements

1. Select all elements with class `card`. Add the same `click` listener to each one. When any card is clicked, apply a visual "selected" state to only that card and remove it from all others.
2. Select all checkboxes in a group. Add a `change` listener to each. When any checkbox changes, update a counter showing how many are checked. Do not attach a listener to each checkbox individually — use a single listener on the parent.
3. Select all `button` elements inside a toolbar. Disable all buttons except the one that was just clicked.
4. Select all paragraphs in an article. Add a `mouseenter` listener to each. When the user hovers over a paragraph, highlight it and de-highlight all other paragraphs.
5. Select all elements with a `data-price` attribute. On `click`, sort these elements in the DOM based on their `data-price` value, from lowest to highest.
6. Select all `input` fields in a form. On `blur`, validate each field individually. Display an error message next to invalid fields and remove it when they become valid.
7. Select all images in a gallery. On `click`, display the clicked image in a main preview area. Ensure the preview updates correctly even if you add new images to the gallery later.
8. Select all tabs in a tab interface. On `click`, show the corresponding content panel and hide all others. Ensure only one panel is visible at a time.
9. Select all rows in a table body. On `click`, toggle a "selected" class on the row. Allow multiple rows to be selected. Add a button that counts how many rows are selected.
10. Select all elements with class `collapsible`. On `click` of the header, expand or collapse the body. Ensure clicking one does not affect the others.

### Level 5 — Dynamic UI

1. Build a toggle switch. It has two states: ON and OFF. Clicking it switches state and updates the visual appearance. The switch must be accessible via keyboard.
2. Build an accordion. Multiple sections, each with a header and body. Clicking a header expands its body and collapses all other bodies. Only one section open at a time.
3. Build a modal dialog. A button opens it. Clicking outside the modal content closes it. Pressing Escape closes it. Focus should move inside the modal when opened.
4. Build a dropdown menu. Clicking the trigger shows/hides the menu. Clicking outside closes it. Hovering over menu items highlights them.
5. Build a toast notification system. A function creates a toast, displays it for 3 seconds, then removes it from the DOM. Multiple toasts can exist simultaneously.
6. Build a sidebar that can be collapsed and expanded. When collapsed, only icons show. When expanded, icons and labels show. Animate the width transition.
7. Build a step wizard. Multiple steps, each with Next and Previous buttons. Track the current step. Show a progress indicator. Prevent advancing if current step is invalid.
8. Build a search-as-you-type interface. An input field filters a list of items in real time. Items that don't match are hidden, not removed from the DOM.
9. Build a color theme switcher. Multiple theme buttons. Clicking one applies a class to the `body` and updates the active button state. The theme should persist across the entire page.
10. Build a confirmation dialog that replaces the default browser `confirm()`. It should have Confirm and Cancel buttons, and the calling code should know which was clicked.

### Level 6 — Arrays + DOM

1. Given an array of strings, render them as list items in an existing `ul`. Each item should have a delete button that removes it from both the DOM and the array.
2. Given an array of objects representing products (name, price, category), render them as cards. Add a filter dropdown by category that shows only matching cards.
3. Given an array of numbers, render them as `div` bars where the height is proportional to the value. Add a button that sorts the array and re-renders the bars.
4. Given an array of todo objects (text, completed), render a todo list. Clicking a todo toggles its completed state in the array and updates its visual state.
5. Given an array of user objects, render a table. Clicking a column header sorts the table by that column. Clicking again reverses the sort order.
6. Given an array of tags (strings), render them as removable chips. Clicking the X on a chip removes it from the array and the DOM. Add an input to add new tags.
7. Given an array of messages (text, sender, timestamp), render a chat log. New messages are appended. Add a "Load More" button that prepends older messages.
8. Given an array of image URLs, render a grid. Clicking an image opens it in a lightbox. Add prev/next buttons in the lightbox that cycle through the array.
9. Given an array of search results, render them with highlighting. The search term should be wrapped in a `mark` element wherever it appears in the result text.
10. Given an array of notifications (message, type, read), render a notification bell with a badge count of unread items. Clicking the bell marks all as read and updates the badge.

### Level 7 — Objects + DOM

1. Create an object representing a counter with `value`, `increment()`, `decrement()`, and `reset()` methods. Wire these methods to buttons so the displayed value always reflects the object's state.
2. Create an object representing a timer with `seconds`, `start()`, `stop()`, and `reset()`. Display the time in `MM:SS` format. The start button becomes a stop button when running.
3. Create an object representing a shopping cart with `items` (array), `addItem(product)`, `removeItem(id)`, and `getTotal()`. Render the cart contents and total. Update both when items change.
4. Create an object representing a form validator with `rules` (an object mapping field names to validation functions) and `validate(formData)`. Apply it to a registration form and display field-specific errors.
5. Create an object representing a slideshow with `slides` (array of URLs), `currentIndex`, `next()`, `prev()`, and `goTo(index)`. Render the current slide and navigation controls.
6. Create an object representing a quiz with `questions`, `currentQuestion`, `score`, and `answer(selected)`. Render one question at a time. Show the final score when complete.
7. Create an object representing a drawing canvas state with `isDrawing`, `color`, `lineWidth`, and `strokes` (array of point arrays). Wire mouse events to record strokes and render them.
8. Create an object representing a music player with `playlist`, `currentTrack`, `isPlaying`, `play()`, `pause()`, and `next()`. Render the current track info and control buttons. Simulate progress with a timer.
9. Create an object representing a calculator with `currentValue`, `previousValue`, `operation`, and methods for digits, operations, equals, and clear. Render a working calculator UI.
10. Create an object representing a bookmark manager with `bookmarks` (array of URL/title objects), `add(url, title)`, `remove(url)`, and `search(query)`. Render the list and a search input that filters in real time.

### Level 8 — Classes + DOM

1. Create a `Counter` class. Each instance controls one counter UI. Multiple counters can exist on the same page, each with independent state and buttons.
2. Create a `TabPanel` class. Instantiate it on multiple container elements. Each instance manages its own tabs and content panels independently.
3. Create a `Modal` class with `open()`, `close()`, and `isOpen` properties. Multiple modals can exist. Opening one should optionally close others.
4. Create a `Tooltip` class. Instantiate it on elements with `data-tooltip`. It creates a tooltip element, positions it near the target on `mouseenter`, and removes it on `mouseleave`.
5. Create a `Dropdown` class. It manages its own trigger, menu, and open/close state. Clicking outside closes it. Support multiple dropdowns on the same page.
6. Create a `Carousel` class with `slides`, `autoplay` option, and `interval`. Methods: `next()`, `prev()`, `goTo()`, `play()`, `pause()`. Render dots indicating the current slide.
7. Create a `Form` class that wraps an HTML form element. It auto-collects named inputs, validates them on submit, and exposes `getData()` and `reset()`.
8. Create a `DataTable` class. It accepts an array of objects and column config. It renders a sortable, filterable table with pagination controls.
9. Create a `DragDropList` class. It wraps a `ul`. Items can be reordered by dragging. The class maintains an internal order array and exposes `getOrder()`.
10. Create a `Typewriter` class. It accepts an element and an array of strings. It types each string, pauses, deletes it, and types the next. Configurable typing speed and pause duration.

### Level 9 — Real Mini Projects

**For each project:** Build the complete UI and behavior. No external libraries. Use semantic HTML. Make it keyboard-accessible where applicable.

1. **Color Picker:** Display a grid of color swatches. Clicking a swatch shows the hex code, RGB values, and a large preview. Add a "random color" button and a "copy to clipboard" button. Maintain a history of recently picked colors.

2. **Character Viewer:** Display a grid of character cards (name, image, stats). Clicking a card opens a detailed view with a larger image and full stats. Add filters by role/affiliation. Add a search by name. Stats should be rendered as visual bars.

3. **Notes App:** A textarea for writing, a save button, and a list of saved notes. Each note shows a preview, timestamp, and delete button. Clicking a note loads it back into the textarea for editing. Add a character count and a "last edited" indicator.

4. **Student Directory:** A table of students (name, id, grade, email). Add sorting by any column. Add filtering by grade level. Add a search by name. Clicking a row opens a detail panel with full info. Add bulk selection with checkboxes.

5. **Inventory Viewer:** A grid of product cards (image, name, price, stock). Stock level determines a visual indicator (plenty/low/out). Add category filters. Add a price range slider. Add a "quick view" modal. Cart functionality: add items, show count, calculate total.

6. **Flashcard App:** A deck of flashcards (front/back). Show one card at a time. Click to flip. Buttons to mark as "known" or "study again." Track progress (cards remaining, mastered count). Shuffle deck. Keyboard shortcuts for all actions.

7. **Habit Tracker:** A weekly grid. Each habit is a row, each day is a column. Click a cell to toggle completion. Show streak count for each habit. Show weekly completion percentage. Add new habits. Delete habits. Persist state in memory for the session.

---

## Key Takeaways

### DOM Selection

1. **`querySelector`** and **`querySelectorAll`** are your primary tools. They speak CSS and return predictable results.
2. **`querySelectorAll`** returns a **static** `NodeList` — a snapshot that doesn't change when the DOM changes.
3. **`getElementsByClassName`** and **`getElementsByTagName`** return **live** `HTMLCollection`s that auto-update. This is powerful but dangerous in loops.
4. **Always check for `null`** when using `querySelector`. The element might not exist yet.
5. **Use scoped selection** — search within containers, not the entire document. It's faster and more robust.
6. **Cache your selections** in variables. Don't query the DOM repeatedly.
7. **Batch reads and writes** to the DOM. Interleaving them forces expensive reflows.

### DOM Events

1. **Events are signals**, not commands. The browser creates an event object and delivers it to your listeners.
2. **The event object** is your crime scene report. It contains everything you need to know about what happened.
3. **`event.target`** is the element that triggered the event. **`event.currentTarget`** is the element with the listener.
4. **Event delegation** lets you handle events for many elements with one listener. Essential for dynamic content.
5. **`mouseenter`/`mouseleave`** don't bubble. **`mouseover`/`mouseout`** do bubble. Choose based on whether child boundaries matter.
6. **`input`** fires continuously. **`change`** fires when the user is "done." Use the right one for your use case.
7. **`keydown`** is for preventing defaults. **`keyup`** is for reading final values.
8. **Event-driven programming** is reactive, not sequential. Your code responds to signals rather than executing linearly.

---

## When You'll Use This in Real Projects

| Scenario | Skills Used |
|---|---|
| **Building a modal system** | `querySelector`, `addEventListener('click')`, `event.target`, `event.key === 'Escape'` |
| **Form validation** | `querySelectorAll`, `addEventListener('input')`, `addEventListener('blur')`, `event.target.value` |
| **Dynamic lists (todos, comments)** | `querySelectorAll`, event delegation, `event.target.closest()` |
| **Shopping cart** | Object state + DOM updates, `addEventListener('click')`, dynamic rendering |
| **Image galleries / carousels** | `querySelectorAll`, `addEventListener('click')`, array indexing, class toggling |
| **Drag and drop interfaces** | `mousedown`, `mousemove`, `mouseup`, `event.clientX/Y`, element positioning |
| **Keyboard shortcuts** | `keydown`, `event.key`, `event.ctrlKey`, `event.preventDefault()` |
| **Real-time search** | `input` event, `event.target.value`, filtering arrays, re-rendering lists |
| **Theme switching** | `querySelector`, class toggling on `body`, CSS custom properties |
| **Data tables with sorting** | `querySelectorAll`, array sorting, DOM reordering, event delegation |
| **Toast notifications** | Dynamic element creation, `setTimeout`, DOM insertion/removal |
| **Autocomplete / typeahead** | `input` event, filtering, dynamic list rendering, keyboard navigation |

---

## Things Beginners Often Miss

1. **`querySelector` returns `null` if nothing matches.** Always guard against it or be certain the element exists.

2. **`querySelectorAll` is not an array.** It has `.forEach()` in modern browsers, but no `.map()` or `.filter()`. Use `[...nodeList]` to convert.

3. **Event listeners on dynamically added elements don't exist.** If you add a listener to `.item` and then add a new `.item`, the new one has no listener. Use event delegation or re-attach listeners.

4. **`this` inside an arrow function listener is NOT the element.** Arrow functions don't bind their own `this`. Use a regular function or `event.currentTarget`.
   ```javascript
   // WRONG: 'this' is not the button
   button.addEventListener('click', () => {
       this.classList.add('active'); // 'this' is window or undefined
   });

   // RIGHT: Use event.currentTarget or regular function
   button.addEventListener('click', (e) => {
       e.currentTarget.classList.add('active');
   });
   ```

5. **Forgetting `event.preventDefault()` on forms and links.** A form submit reloads the page. A link navigates. Stop these defaults when handling them with JavaScript.

6. **Not removing event listeners when components are destroyed.** This causes memory leaks. Use `removeEventListener` or consider using `{ once: true }` for one-time listeners.

7. **Confusing `event.target` with `event.currentTarget`.** `target` is what the user actually clicked (could be a child). `currentTarget` is the element with the listener.

8. **Attaching too many listeners.** One listener per element in a list of 1000 items = 1000 listeners. Use event delegation instead.

9. **Reading DOM properties inside loops.** `offsetHeight`, `clientWidth`, etc. force the browser to recalculate layout. Read once, then write.

10. **Not understanding that events are asynchronous.** Your event handler runs later, not immediately. Variables might have changed by the time it runs.
    ```javascript
    let count = 0;
    button.addEventListener('click', () => {
        console.log(count); // Might not be 0! Could have changed.
    });
    count = 5; // This runs BEFORE the click handler
    ```

---

## Summary for Quick Revision

### Selection Methods

| Method | Returns | Live? | Use When |
|---|---|---|---|
| `querySelector(css)` | First match or `null` | N/A | Single element, complex CSS selectors |
| `querySelectorAll(css)` | All matches as NodeList | No (static) | Multiple elements, batch operations |
| `getElementsByClassName(cls)` | HTMLCollection | Yes (live) | Legacy code, need live collection |
| `getElementsByTagName(tag)` | HTMLCollection | Yes (live) | Legacy code, selecting by tag |

### Event Types Quick Reference

| Category | Events | Key Properties |
|---|---|---|
| Mouse | `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseenter`, `mouseleave`, `mouseover`, `mouseout` | `clientX/Y`, `pageX/Y`, `offsetX/Y`, `button`, `target` |
| Keyboard | `keydown`, `keyup` | `key`, `code`, `ctrlKey`, `shiftKey`, `repeat` |
| Form | `input`, `change`, `focus`, `blur`, `submit` | `target.value`, `target.checked`, `preventDefault()` |

### The Event Object (Always Available)

```javascript
event.type          // "click", "keydown", etc.
event.target        // Element that triggered the event
event.currentTarget // Element with the listener
event.preventDefault()    // Stop default browser behavior
event.stopPropagation()   // Stop event from bubbling
```

### The Golden Rules

1. Select once, cache the reference
2. Use `querySelector` / `querySelectorAll` for new code
3. Check for `null` after `querySelector`
4. Use event delegation for dynamic lists
5. Batch DOM reads, then batch writes
6. Understand `event.target` vs `event.currentTarget`
7. Prevent defaults when handling forms and links
8. Remove listeners when components are destroyed

---

## Challenge Questions

Test your understanding before moving to the practice challenges:

1. **Why does `querySelectorAll` return a static collection while `getElementsByClassName` returns a live one? What problem does each approach solve?**

2. **You have a list of 500 items. Should you attach a click listener to each item, or one listener to the parent? Why?**

3. **A user clicks a button that contains an icon. What is `event.target`? What is `event.currentTarget`? How would you get the button element from inside the handler?**

4. **You need to track whether the Shift key is held during a click. Which event properties do you check?**

5. **You want to prevent a form from submitting and handle it with JavaScript instead. What two things must you do?**

6. **What's the difference between `mouseenter` and `mouseover`? In what scenario would you choose one over the other?**

7. **You select elements with `getElementsByClassName('item')` and then loop through them, removing the class `item` from each. What happens? Why is this dangerous?**

8. **You add 10 new elements to the DOM after calling `querySelectorAll('.card')`. Will your NodeList include the new elements? Why or why not?**

9. **A user types into an input field. You want to validate the input after every keystroke. Which event do you use? You want to validate only when they finish typing. Which event do you use?**

10. **You have a modal with a close button inside it. You add a click listener to the modal overlay to close it when clicking outside. Why might clicking the close button also trigger the overlay's click handler? How do you prevent this?**

---

*This document is designed as a long-term reference. Return to it whenever you need to refresh your mental model of DOM selection and events. The practice challenges in Part 4 are designed to be worked through repeatedly — each pass builds deeper intuition.*

*Remember: The goal is not to memorize methods. The goal is to think like a developer who naturally reaches for the right tool, understands the implications of each choice, and builds robust, maintainable interactive interfaces.*
