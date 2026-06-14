# From JavaScript Syntax to Software Thinking
## A Curriculum in Architectural Decision-Making

> **For developers who know how to write code, but want to learn how to *think* in code.**

---

## Table of Contents

1. [Core Mental Models](#core-mental-models)
2. [The Decision Matrix](#the-decision-matrix)
3. [Project 1: Smart Counter](#project-1-smart-counter)
4. [Project 2: Habit Tracker](#project-2-habit-tracker)
5. [Project 3: Flashcard App](#project-3-flashcard-app)
6. [Project 4: Expense Tracker](#project-4-expense-tracker)
7. [Project 5: Notes App](#project-5-notes-app)
8. [Universal Patterns Summary](#universal-patterns-summary)
9. [Refactoring Triggers](#refactoring-triggers)
10. [The Pre-Coding Checklist](#the-pre-coding-checklist)
11. [Your Next Steps](#your-next-steps)

---

## Core Mental Models

Before any project, internalize these five questions. They are your new default mode when seeing a feature request:

### The Five Universal Questions

| Question | What It Reveals | Example Decision Trigger |
|----------|----------------|------------------------|
| **What is the truth?** | Where does the authoritative data live? | If data must survive page refresh → `localStorage` |
| **Who changes it?** | Where do mutations originate? | If multiple components modify data → centralize in a class/module |
| **Who needs to know?** | Which parts of the app react to changes? | If UI must sync with data → separate state from DOM |
| **How does time affect this?** | Is this transient or persistent? | If temporary → variable; if permanent → storage |
| **What is the scope of responsibility?** | Should this know about that? | If a function needs 5+ parameters → probably an object/class |

### Reactive vs. Intentional Thinking

| Reactive (Avoid) | Intentional (Develop) |
|-----------------|----------------------|
| "I'll make a `let count = 0` and two buttons..." | "What is the truth here? A number that changes. Who changes it? User clicks. Who needs to know? The display." |
| "I need an array for history..." | "History is derived from state mutations. Should I store every state or just deltas?" |
| "This is getting complex, I'll add a class." | "What behavior is coupled to what data? Is the complexity in the data relationships or the operations?" |

---

## The Decision Matrix

When you see a piece of data or behavior, run it through this:

```
Is it a single value that never changes alone? → Variable
Is it grouped data with no behavior?          → Object literal
Is it grouped data WITH behavior?            → Class or Factory function
Is it a list of similar things?              → Array
Must it survive a page refresh?              → localStorage
Is it visual-only, no logic needed?          → DOM attribute/CSS
Does multiple UI parts depend on it?         → Central state object
Is it computed from other data?              → Function (not stored)
```

### Quick Reference: Data Structure Selection

| Need | Structure | Why |
|------|-----------|-----|
| Fast lookup by key | `Map` | O(1) access, any key type |
| Unique values only | `Set` | Automatic deduplication |
| Ordered list, duplicates allowed | `Array` | Index access, iteration |
| Key-value, infrequent changes | `Object` | Literal syntax, JSON-native |
| Hierarchical/tree data | Nested objects/arrays | Natural representation |

---

## Project 1: Smart Counter
### Learning: When to evolve from variables to objects to classes

---

### Version 1: The Naive Beginning

**Problem:** Build a counter that increments and decrements.

#### Intentional Analysis

| Question | Analysis |
|----------|----------|
| What is the truth? | The current count value |
| Who changes it? | User clicks |
| Who needs to know? | The display number |
| How does time affect this? | Resets on refresh (acceptable for now) |
| Scope of responsibility? | One number, one display |

#### Architecture Decision
- **Variable:** `count` (single value, simple)
- **Function:** `updateDisplay()` (separates DOM concern)
- **No class needed:** One piece of data, no relationships

```javascript
// Version 1: Intentionally simple
let count = 0;

function updateDisplay() {
    document.getElementById('count').textContent = count;
}

document.getElementById('increment').addEventListener('click', () => {
    count++;
    updateDisplay();  // Why separate? DOM logic might grow
});

document.getElementById('decrement').addEventListener('click', () => {
    count--;
    updateDisplay();
});
```

#### Tradeoff Analysis

| Question | Answer |
|----------|--------|
| Why not a class? | One variable doesn't justify the mental overhead of `this.count`, constructor, instantiation. |
| Why separate `updateDisplay`? | Today it's one line. Tomorrow it might format numbers, add colors, log analytics. Separation costs nothing now, saves refactoring later. |

---

### Version 2: New Requirement — History

**Requirement:** Show a history of all values the counter has held.

#### Intentional Analysis

| Question | Analysis |
|----------|----------|
| What is the truth? | Current count + full history |
| Who changes it? | Still user clicks, but now history is derived |
| Who needs to know? | Display + history list |
| How does time affect this? | Still transient (acceptable) |
| Scope? | Two related pieces of data that must stay synchronized |

#### Architecture Decision
- **Object:** Group `count` and `history` together (they're related)
- **No class yet:** Still just data grouping, no complex behavior
- **Array:** `history` is a list of similar items

```javascript
// Version 2: Data grouping emerges
const counterState = {
    current: 0,
    history: [0]  // Start with initial value
};

function updateDisplay() {
    document.getElementById('count').textContent = counterState.current;

    const historyList = document.getElementById('history');
    historyList.innerHTML = '';
    counterState.history.forEach(val => {
        const li = document.createElement('li');
        li.textContent = val;
        historyList.appendChild(li);
    });
}

function increment() {
    counterState.current++;
    counterState.history.push(counterState.current);  // Mutating state together
    updateDisplay();
}

function decrement() {
    counterState.current--;
    counterState.history.push(counterState.current);
    updateDisplay();
}
```

#### Tradeoff Analysis

| Question | Answer |
|----------|--------|
| Why an object? | `current` and `history` must stay synchronized. If they were separate variables, you could forget to update history. |
| Why not a class? | The behavior is still trivial. A class would add `this` complexity for no gain. |
| Why is history stored, not derived? | We need the full sequence of values. If we only needed "how many times clicked," we'd calculate that from history length. **Key insight:** Ask "do I need the full data or a summary?" |

---

### Version 3: New Requirement — Undo

**Requirement:** Add an "Undo" button that reverts to previous values.

#### Intentional Analysis

| Question | Analysis |
|----------|----------|
| What is the truth? | The history stack is the truth; current is just the top |
| Who changes it? | User clicks, but also "undo" which manipulates history |
| Scope? | History manipulation logic is growing; state management is becoming a real concern |

#### Architecture Decision
- **Class emerges:** The counter now has *behavior* (undo logic, history management) tightly coupled to its *data*
- **Why now?** We have: (1) private state that must be protected, (2) methods that must coordinate, (3) risk of external code corrupting history

```javascript
// Version 3: Class emerges from behavior complexity
class SmartCounter {
    constructor() {
        this._history = [0];  // _prefix = convention for "don't touch directly"
        this._currentIndex = 0;
    }

    // Getter: computed property, no storage needed
    get current() {
        return this._history[this._currentIndex];
    }

    // Getter: derived data
    get canUndo() {
        return this._currentIndex > 0;
    }

    get history() {
        return [...this._history];  // Return copy to protect internal state
    }

    increment() {
        const newValue = this.current + 1;
        // If we were in middle of history, truncate future
        this._history = this._history.slice(0, this._currentIndex + 1);
        this._history.push(newValue);
        this._currentIndex++;
    }

    decrement() {
        const newValue = this.current - 1;
        this._history = this._history.slice(0, this._currentIndex + 1);
        this._history.push(newValue);
        this._currentIndex++;
    }

    undo() {
        if (this.canUndo) {
            this._currentIndex--;
        }
    }

    // Why this method? UI shouldn't know internal structure
    getHistoryEntries() {
        return this._history.map((val, idx) => ({
            value: val,
            isCurrent: idx === this._currentIndex
        }));
    }
}

// Usage: UI layer is thin because logic lives in class
const counter = new SmartCounter();

function render() {
    document.getElementById('count').textContent = counter.current;
    document.getElementById('undo').disabled = !counter.canUndo;

    const list = document.getElementById('history');
    list.innerHTML = '';
    counter.getHistoryEntries().forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry.value;
        if (entry.isCurrent) li.classList.add('current');
        list.appendChild(li);
    });
}

document.getElementById('increment').addEventListener('click', () => {
    counter.increment();
    render();
});
// ... etc
```

#### Critical Tradeoff Analysis

| Decision | Why |
|----------|-----|
| **Why class now?** | Behavior (`undo`, `increment` with history truncation) must coordinate with data. A class enforces "only these methods can touch this state." |
| **Why `_history` with underscore?** | JavaScript doesn't have true private fields (pre-2022). Convention signals "don't touch." Modern JS uses `#history`. |
| **Why `getHistoryEntries()` instead of exposing raw history?** | **Separation of concerns:** The class decides *how* to present data. UI shouldn't know that history is an array with an index. If we change to a linked list later, UI doesn't break. |
| **Why slice before push in increment?** | This is architectural thinking: "What if user undoes, then increments?" The future history becomes invalid. Handling this edge case in the class keeps UI code clean. |

---

### Version 4: New Requirement — Persistence

**Requirement:** Counter survives page refresh.

#### Intentional Analysis

| Question | Analysis |
|----------|----------|
| What is the truth? | localStorage becomes the persistent truth; memory is a cache |
| Who changes it? | Same methods, but now must sync to storage |
| How does time affect this? | Data must survive indefinitely |

#### Architecture Decision
- **Storage is a side effect, not the source:** Methods still modify memory first (fast), then sync to storage
- **Class handles its own serialization:** It knows its shape best
- **Why not separate Storage class?** Not yet. One entity, one storage key. If we had 10 entities sharing storage patterns, then abstract.

```javascript
class SmartCounter {
    constructor() {
        const saved = localStorage.getItem('smartCounter');
        if (saved) {
            const parsed = JSON.parse(saved);
            this._history = parsed.history;
            this._currentIndex = parsed.currentIndex;
        } else {
            this._history = [0];
            this._currentIndex = 0;
        }
    }

    _save() {  // "Private" method convention
        localStorage.setItem('smartCounter', JSON.stringify({
            history: this._history,
            currentIndex: this._currentIndex
        }));
    }

    increment() {
        const newValue = this.current + 1;
        this._history = this._history.slice(0, this._currentIndex + 1);
        this._history.push(newValue);
        this._currentIndex++;
        this._save();  // Every mutation persists
    }

    // ... decrement, undo also call this._save()
}
```

#### Tradeoff Analysis

| Question | Answer |
|----------|--------|
| Why not read from localStorage every time in `get current()`? | Synchronous storage reads are fast but blocking. Memory is the working set; storage is backup. |
| Why `JSON.stringify` in the class? | The class knows its shape. A generic storage utility wouldn't know which fields matter. |
| Why not event-driven storage? | ("Save only when page unloads") — Risk of losing data on crash. Explicit saves after mutations are predictable. |

---

### Version 5: New Requirement — Multiple Counters

**Requirement:** User wants separate counters for "Pushups," "Meditation Minutes," etc.

#### Intentional Analysis

| Question | Analysis |
|----------|----------|
| What is the truth? | A collection of counters, each with its own history |
| Who changes it? | User selects a counter, then operates on it |
| Scope? | We now have TWO levels: CounterManager (collection) + SmartCounter (individual) |

#### Architecture Decision
- **Two classes:** `CounterManager` (collection logic) and `SmartCounter` (individual logic)
- **Manager pattern:** When you have a collection of similar things, something must manage CRUD operations
- **Why not one mega-class?** A counter shouldn't know about other counters. Single Responsibility Principle.

```javascript
class SmartCounter {
    constructor(name, initialValue = 0) {
        this.name = name;
        this._history = [initialValue];
        this._currentIndex = 0;
    }

    // ... previous methods, but _save() removed
    // Counter doesn't know about storage anymore!
}

class CounterManager {
    constructor() {
        this._counters = new Map();  // Map is better than object for frequent additions/removals
        this._activeCounterName = null;
        this._load();
    }

    _load() {
        const saved = localStorage.getItem('counterManager');
        if (saved) {
            const parsed = JSON.parse(saved);
            parsed.counters.forEach(c => {
                const counter = new SmartCounter(c.name, 0);
                counter._history = c.history;  // Friend-class pattern
                counter._currentIndex = c.currentIndex;
                this._counters.set(c.name, counter);
            });
            this._activeCounterName = parsed.activeCounterName;
        }
    }

    _save() {
        const data = {
            counters: Array.from(this._counters.values()).map(c => ({
                name: c.name,
                history: c._history,
                currentIndex: c._currentIndex
            })),
            activeCounterName: this._activeCounterName
        };
        localStorage.setItem('counterManager', JSON.stringify(data));
    }

    createCounter(name) {
        if (this._counters.has(name)) return false;
        const counter = new SmartCounter(name);
        this._counters.set(name, counter);
        this._activeCounterName = name;
        this._save();
        return true;
    }

    get activeCounter() {
        return this._counters.get(this._activeCounterName);
    }

    selectCounter(name) {
        if (this._counters.has(name)) {
            this._activeCounterName = name;
            this._save();
            return true;
        }
        return false;
    }

    deleteCounter(name) {
        // Can't delete active? Or auto-switch? Business logic lives here.
        const deleted = this._counters.delete(name);
        if (deleted && this._activeCounterName === name) {
            this._activeCounterName = this._counters.keys().next().value || null;
        }
        this._save();
        return deleted;
    }

    get counterNames() {
        return Array.from(this._counters.keys());
    }
}
```

#### Evolution Summary

| Version | Trigger for Change | New Abstraction |
|---------|-------------------|---------------|
| 1 | Simple problem | Variable |
| 2 | Related data emerges | Object literal |
| 3 | Complex behavior + state protection needed | Class |
| 4 | Persistence needed | Storage method in class |
| 5 | Collection + relationships needed | Manager class, Map data structure |

---

## Project 2: Habit Tracker
### Learning: Entity relationships, state normalization, derived data

---

### Version 1: Single Habit

**Problem:** Track whether I did a habit today.

#### Entity Discovery

| Entity | Data | Behavior |
|--------|------|----------|
| Habit | name, completionDates[] | checkIn(), uncheck() |
| Day | date | (no behavior, just a value) |

**Decision:** Habit is a class. Day is just a string in an array.

```javascript
class Habit {
    constructor(name) {
        this.name = name;
        this.completionDates = [];  // Array of "YYYY-MM-DD" strings
    }

    checkIn(date = new Date().toISOString().split('T')[0]) {
        if (!this.completionDates.includes(date)) {
            this.completionDates.push(date);
            this.completionDates.sort();  // Keep chronological
        }
    }

    uncheck(date) {
        this.completionDates = this.completionDates.filter(d => d !== date);
    }

    isCompletedOn(date) {
        return this.completionDates.includes(date);
    }

    // Derived data: don't store, calculate
    get currentStreak() {
        // Calculate streak from completionDates
        // ... logic omitted for brevity
    }

    get longestStreak() {
        // Another calculation
    }
}
```

**Key Decision:** `currentStreak` is a **getter**, not a stored property. Why? It changes when `completionDates` changes. Storing it creates synchronization risk (two sources of truth). Calculate on demand.

---

### Version 2: Multiple Habits + Calendar View

**Requirement:** Show a calendar. Each cell shows all habits and whether they were done.

#### Intentional Analysis

| Question | Analysis |
|----------|----------|
| What is the truth? | Each habit's completion dates |
| Who needs to know? | Calendar needs a *matrix* view: date → habit → boolean |
| Derived vs Stored? | Calendar view is 100% derived from habit data |

#### Architecture Decision
- **Normalize state:** Don't store calendar matrix. Derive it.
- **Separate presentation from state:** A `CalendarRenderer` class that takes `Habit[]` and produces DOM

```javascript
class HabitTracker {
    constructor() {
        this.habits = new Map();  // name -> Habit
    }

    addHabit(name) { /* ... */ }
    removeHabit(name) { /* ... */ }
    getHabit(name) { return this.habits.get(name); }

    // This is the key architectural method
    getCalendarData(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const calendar = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            calendar.push({
                date: dateStr,
                habits: Array.from(this.habits.values()).map(habit => ({
                    name: habit.name,
                    completed: habit.isCompletedOn(dateStr)
                }))
            });
        }
        return calendar;
    }
}

class CalendarRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(calendarData) {
        // Pure function: takes data, produces DOM
        // No state mutation here
        this.container.innerHTML = '';
        calendarData.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            // ... render habits for this day
            this.container.appendChild(dayEl);
        });
    }
}
```

#### Tradeoff Analysis

| Decision | Why |
|----------|-----|
| **Why `getCalendarData` in tracker, not renderer?** | Renderer should be "dumb" — it knows DOM, not business rules. Tracker knows business rules, not DOM. |
| **Why not store calendar state?** | If you store it, every habit check-in requires updating calendar. One bug = inconsistent data. Derive it = impossible to be inconsistent. |
| **Why Map for habits?** | Fast lookup by name. Array would require `.find()` every time. |

---

## Project 3: Flashcard App
### Learning: Spaced repetition algorithms, state machines, undo/redo patterns

---

### The Core Problem

Not just "show cards." The truth is: **when should this card appear again?**

### Version 1: Naive Queue

```javascript
class Flashcard {
    constructor(front, back) {
        this.front = front;
        this.back = back;
        this.nextReviewDate = new Date();  // Now
        this.interval = 1;  // Days
    }

    review(result) {  // 'again' | 'hard' | 'good' | 'easy'
        const multipliers = {
            again: 0.5,
            hard: 1.2,
            good: 2.0,
            easy: 3.0
        };

        this.interval = Math.ceil(this.interval * multipliers[result]);
        const next = new Date();
        next.setDate(next.getDate() + this.interval);
        this.nextReviewDate = next;
    }
}
```

**Architecture Decision:** The algorithm lives in the card. Why? Each card has its own interval history. The card *is* the spaced repetition unit.

---

### Version 2: Session State Machine

**Requirement:** During a review session, show cards due today. Don't recalculate queue after every answer.

#### Intentional Analysis

| State | Meaning | Valid Transitions |
|-------|---------|-------------------|
| `idle` | No session active | → `reviewing` |
| `reviewing` | Showing card front | → `revealed` |
| `revealed` | Showing card back, waiting for rating | → `reviewing` (next card) or `idle` (done) |
| `complete` | No more cards due | → `idle` |

#### Architecture Decision

State machine class manages session flow. Flashcard class manages learning algorithm. Separation of concerns.

```javascript
class ReviewSession {
    constructor(flashcards) {
        this.cards = flashcards.filter(card => card.isDueToday());
        this.currentIndex = 0;
        this.state = 'idle';  // State machine
        this.history = [];    // For undo
    }

    start() {
        if (this.cards.length === 0) return false;
        this.state = 'reviewing';
        return true;
    }

    reveal() {
        if (this.state !== 'reviewing') return false;
        this.state = 'revealed';
        return true;
    }

    rate(result) {
        if (this.state !== 'revealed') return false;

        const card = this.cards[this.currentIndex];
        const previousState = {
            cardId: card.id,
            interval: card.interval,
            nextReviewDate: card.nextReviewDate
        };

        card.review(result);
        this.history.push(previousState);

        this.currentIndex++;
        if (this.currentIndex >= this.cards.length) {
            this.state = 'complete';
        } else {
            this.state = 'reviewing';
        }
        return true;
    }

    undo() {
        if (this.history.length === 0 || this.state === 'reviewing') return false;

        const previous = this.history.pop();
        const card = this.cards.find(c => c.id === previous.cardId);

        // Revert
        card.interval = previous.interval;
        card.nextReviewDate = previous.nextReviewDate;

        this.currentIndex--;
        this.state = 'reviewing';
        return true;
    }
}
```

**Critical Insight:** The session doesn't modify cards directly except through `card.review()`. It *orchestrates*. The card *calculates*. This is the **Command Pattern** — storing operations for undo.

---

## Project 4: Expense Tracker
### Learning: Data relationships, computed aggregates, import/export architecture

---

### Entity Discovery

When someone says "track expenses," what entities exist?

| Noun | Likely Entity | Relationships |
|------|--------------|---------------|
| Expense | Class | Belongs to Category, has Tags |
| Category | Class/Object | Has many Expenses |
| Tag | Object/Value | Many-to-many with Expense |
| Budget | Class | References Categories |
| Report | Derived | Computed from Expenses |

### Version 1: Expense + Category Relationship

```javascript
class Category {
    constructor(name, budgetLimit = null) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.budgetLimit = budgetLimit;  // null = no budget
    }
}

class Expense {
    constructor({ amount, description, categoryId, date = new Date(), tags = [] }) {
        this.id = crypto.randomUUID();
        this.amount = amount;           // Number: cents or dollars? Decision: store cents (integer)
        this.description = description;
        this.categoryId = categoryId;   // Reference, not embedded object
        this.date = date;
        this.tags = tags;               // Array of strings
    }

    get formattedAmount() {
        return (this.amount / 100).toFixed(2);
    }
}

class ExpenseTracker {
    constructor() {
        this.expenses = new Map();
        this.categories = new Map();
    }

    // Why methods instead of direct map access?
    // Validation, side effects, derived updates

    addCategory(name, budgetLimit) {
        const category = new Category(name, budgetLimit);
        this.categories.set(category.id, category);
        return category.id;
    }

    addExpense(data) {
        if (!this.categories.has(data.categoryId)) {
            throw new Error('Invalid category');
        }
        const expense = new Expense(data);
        this.expenses.set(expense.id, expense);
        return expense.id;
    }

    // Derived data: Category spending report
    getCategoryReport(categoryId, month, year) {
        const category = this.categories.get(categoryId);
        if (!category) return null;

        const relevant = Array.from(this.expenses.values()).filter(e => {
            const d = new Date(e.date);
            return e.categoryId === categoryId && 
                   d.getMonth() === month && 
                   d.getFullYear() === year;
        });

        const total = relevant.reduce((sum, e) => sum + e.amount, 0);

        return {
            categoryName: category.name,
            budgetLimit: category.budgetLimit,
            totalSpent: total,
            remaining: category.budgetLimit ? category.budgetLimit - total : null,
            percentageUsed: category.budgetLimit ? (total / category.budgetLimit) * 100 : null,
            transactions: relevant.sort((a, b) => b.date - a.date)
        };
    }
}
```

#### Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Store `categoryId`, not category object** | If category name changes, expenses don't need updating. Single source of truth. |
| **Store amount in cents** | Floating point math is imprecise. `0.1 + 0.2 !== 0.3`. Integers avoid this. |
| **UUIDs over auto-increment** | Allows offline creation, merging data later, no collision risk. |
| **Tracker validates category exists** | Prevent invalid states at the boundary. |

---

## Project 5: Notes App (Final Boss)
### Learning: Composition over inheritance, plugin architecture, optimistic UI

---

### The Architecture Challenge

A note is not just text. It might have:
- Rich text
- Checklists
- Images
- Tags
- Reminders
- Collaborators

**Bad approach:** `class Note` with 20 properties, half null most of the time.

**Good approach:** Composition.

```javascript
// Blocks compose a note
class TextBlock {
    constructor(content = '') {
        this.type = 'text';
        this.content = content;
    }

    render() {
        const div = document.createElement('div');
        div.contentEditable = true;
        div.textContent = this.content;
        return div;
    }

    serialize() {
        return { type: 'text', content: this.content };
    }
}

class ChecklistBlock {
    constructor(items = []) {
        this.type = 'checklist';
        this.items = items;  // [{ text: string, checked: boolean }]
    }

    addItem(text) {
        this.items.push({ text, checked: false, id: crypto.randomUUID() });
    }

    toggleItem(id) {
        const item = this.items.find(i => i.id === id);
        if (item) item.checked = !item.checked;
    }

    render() {
        const ul = document.createElement('ul');
        this.items.forEach(item => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.checked;
            checkbox.addEventListener('change', () => this.toggleItem(item.id));
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(item.text));
            ul.appendChild(li);
        });
        return ul;
    }

    serialize() {
        return { type: 'checklist', items: this.items };
    }
}

class Note {
    constructor(title = '') {
        this.id = crypto.randomUUID();
        this.title = title;
        this.blocks = [];  // Composition: array of block instances
        this.tags = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    addBlock(block, index = this.blocks.length) {
        this.blocks.splice(index, 0, block);
        this.touch();
    }

    removeBlock(index) {
        this.blocks.splice(index, 1);
        this.touch();
    }

    moveBlock(fromIndex, toIndex) {
        const [block] = this.blocks.splice(fromIndex, 1);
        this.blocks.splice(toIndex, 0, block);
        this.touch();
    }

    touch() {
        this.updatedAt = new Date();
    }

    serialize() {
        return {
            id: this.id,
            title: this.title,
            blocks: this.blocks.map(b => b.serialize()),
            tags: this.tags,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    static deserialize(data) {
        const note = new Note(data.title);
        note.id = data.id;
        note.tags = data.tags;
        note.createdAt = new Date(data.createdAt);
        note.updatedAt = new Date(data.updatedAt);

        note.blocks = data.blocks.map(blockData => {
            switch(blockData.type) {
                case 'text': return new TextBlock(blockData.content);
                case 'checklist': return new ChecklistBlock(blockData.items);
                default: throw new Error(`Unknown block type: ${blockData.type}`);
            }
        });

        return note;
    }
}
```

#### Why This Architecture

| Principle | Implementation |
|-----------|---------------|
| **Open/Closed** | New block types added without changing Note class |
| **Single Responsibility** | Each block handles its own rendering/serialization |
| **Composition** | Note *has* blocks, isn't a type of block |
| **Polymorphism** | All blocks implement `render()` and `serialize()` |

---

## Universal Patterns Summary

After these projects, you should recognize these patterns instantly:

### When to Use What

| Situation | Structure | Example |
|-----------|-----------|---------|
| Single value, no behavior | Variable | Loop counter, flag |
| Grouped data, no methods | Object literal | Configuration options |
| Grouped data + methods | Class | Counter, Habit, Expense |
| Collection of unique items | `Set` | Tags, categories |
| Collection with fast lookup | `Map` | Entities by ID |
| List with order | `Array` | History, blocks, queue |
| Must survive refresh | `localStorage` | All user data |
| Derived from other data | Function/Getter | Streak, calendar, report |
| Visual only, no logic | DOM/CSS | Layout, colors |

### The Refactoring Triggers

| Smell | Solution |
|-------|----------|
| Function has 5+ parameters | Create an options object/class |
| Two functions always called together | They probably belong in a class |
| Duplicated logic across functions | Extract into method or utility |
| Function does two different things | Split into two functions |
| `if/else` chain checking types | Polymorphism (different classes) |
| Data inconsistent after operation | Centralize mutations in one method |
| DOM manipulation mixed with logic | Separate renderer from state |

---

## The Pre-Coding Checklist

Before writing any code, answer these questions:

```
□ What is the smallest piece of truth here?
□ Who creates it? Who modifies it? Who reads it?
□ Will this data outlive the page?
□ Is this calculated or stored?
□ If I change X, what breaks?
□ Can I test this without the DOM?
□ Does this function know too much?
```

### Decision Flowchart

```
START: You need to represent something in code
│
├─ Is it a single primitive value?
│  └─ YES → Variable
│
├─ Is it grouped data with NO associated behavior?
│  └─ YES → Object literal
│
├─ Is it grouped data WITH behavior?
│  └─ YES → Class or Factory Function
│
├─ Is it a collection of similar items?
│  ├─ Need fast lookup by key? → Map
│  ├─ Need uniqueness guarantee? → Set
│  └─ Otherwise → Array
│
├─ Must it survive page refresh?
│  └─ YES → localStorage (with serialization)
│
├─ Is it computed from other data?
│  └─ YES → Function or Getter (don't store)
│
└─ Is it purely visual?
   └─ YES → DOM/CSS (no JS state needed)
```

---

## Your Next Steps

1. **Build Version 1 of each project** in 30 minutes. Intentionally under-engineer.
2. **Add one feature** that forces architectural change. Feel the pain.
3. **Refactor** using the patterns above. Feel the relief.
4. **Compare** your before/after. That's where learning lives.

The goal isn't to write perfect code immediately. It's to **feel** when code is fighting you — that's your intuition developing. Eventually, you'll look at a feature request and see the architecture before the syntax.

---

## Appendix A: Common Architectural Patterns

### The Manager Pattern
When you have a collection of entities that need CRUD operations, lifecycle management, or cross-entity logic.

```javascript
class EntityManager {
    constructor() {
        this.entities = new Map();
    }

    create(data) { /* validate, instantiate, store */ }
    get(id) { return this.entities.get(id); }
    update(id, changes) { /* merge, validate, persist */ }
    delete(id) { /* cleanup relationships, remove */ }

    // Cross-entity queries
    findBy(criteria) { /* filter logic */ }
}
```

### The Repository Pattern
When storage mechanism might change (localStorage today, API tomorrow).

```javascript
class LocalStorageRepository {
    constructor(key) {
        this.key = key;
    }

    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    load() {
        const raw = localStorage.getItem(this.key);
        return raw ? JSON.parse(raw) : null;
    }
}

// Later: swap for ApiRepository without changing business logic
```

### The Renderer Pattern
When you want to test business logic without a browser.

```javascript
class TodoRenderer {
    constructor(container) {
        this.container = container;
    }

    render(todos) {
        // Pure transformation: data → DOM
        // No state changes, no side effects
    }
}
```

---

## Appendix B: Evolution Decision Tree

| Current State | New Requirement | Likely Evolution |
|---------------|----------------|------------------|
| Variable | Related data appears | Object literal |
| Object literal | Behavior needed | Class |
| Class | Persistence needed | Serialization methods |
| Single class | Collection needed | Manager class + Map |
| Manager | Cross-entity queries | Repository pattern |
| Repository | API integration | Adapter pattern |
| Simple rendering | Complex UI updates | State → Renderer separation |

---

*Document Version: 1.0*
*Created: 2026-06-15*
*Purpose: Bridge from JavaScript syntax knowledge to software architecture thinking*
