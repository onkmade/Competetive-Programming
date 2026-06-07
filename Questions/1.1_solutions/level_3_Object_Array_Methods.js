// LEVEL 3: Objects + Arrays + Methods

let num = 0;
function lineS(){
    return `\n\n\n================= Challenge 3.${++num} =================\n`
}

// Challenge 3.1
console.log(lineS());
const school = {
    name: "Tech Institute", 
    departments: [],

    addDepartment(deptName){
        const newDepartment = { name: deptName, courses: [] };
        this.departments.push(newDepartment);
    },

    addCourseToDept(deptName, courseName, credits){
        const department = this.departments.find( dept => dept.name === deptName );

        if(department){
            const newCourse = { courseName, credits, enrolledStudents: [] }
            department.courses.push(newCourse);

            return `${newCourse} has been added in the ${deptName}`
        }

        return `${deptName} not found`;
    },

    enrolledStudentsToCourse(deptName, courseName, studentName){
        const department = this.departments.find( d => d.name === deptName );
        if(!department) return `Invalid ${deptName}`
        
        const course = department.courses.find( c => c.courseName === courseName);
        if(!course) return `Invalid ${courseName}`

        return course.enrolledStudents.push(studentName);
    },
    
    
    getAllStudents(deptName){
        const department = this.departments.find( dept => dept.name === deptName);
        if(!department) return `Invalid ${deptName}`

        return department.courses.flatMap(course => course.enrolledStudents);
    }

}

school.addDepartment("Engg");
school.addDepartment("Science");
school.addCourseToDept("Engg", "Web", 4);
school.addCourseToDept("Engg", "JS", 4);
school.addCourseToDept("Science", "Go", 4);
school.enrolledStudentsToCourse("Engg", "Web", "Baka");
school.enrolledStudentsToCourse("Engg", "Web", "Nooxie");
school.enrolledStudentsToCourse("Engg", "JS", "Ne Zha");
school.enrolledStudentsToCourse("Engg", "JS", "Esmo");
school.enrolledStudentsToCourse("Engg", "JS", "Ciel");
school.enrolledStudentsToCourse("Science", "Go", "Kupe");

console.log(school.departments[0].courses);

console.log(school.getAllStudents("Engg"));



// Challenge 3.2
console.log(lineS());
const library = {
    name: "Central Library",
    books: [
        { title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "978-0261102217", borrowedBy: null, isAvailable: true },
        { title: "Animal Farm", author: "George Orwell", isbn: "978-0451526342", borrowedBy: null, isAvailable: true }, // New
        { title: "1984", author: "George Orwell", isbn: "978-0451524935", borrowedBy: "Baka", isAvailable: false },
        { title: "The Silmarillion", author: "J.R.R. Tolkien", isbn: "978-0345325815", borrowedBy: "Ciel", isAvailable: false }, // New
        { title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0446310789", borrowedBy: null, isAvailable: true },
        { title: "The Illustrated Man", author: "Ray Bradbury", isbn: "978-1451678185", borrowedBy: null, isAvailable: true }, // New
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", borrowedBy: "Ciel", isAvailable: false },
        { title: "Brave New World", author: "Aldous Huxley", isbn: "978-0060850524", borrowedBy: null, isAvailable: true },
        { title: "Dune Messiah", author: "Frank Herbert", isbn: "978-0441172696", borrowedBy: "Esmo", isAvailable: false }, // New
        { title: "Fahrenheit 451", author: "Ray Bradbury", isbn: "978-1451673319", borrowedBy: "Baka", isAvailable: false },
        { title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "978-0316769174", borrowedBy: null, isAvailable: true },
        { title: "Dune", author: "Frank Herbert", isbn: "978-0441172719", borrowedBy: "Baka", isAvailable: false },
        { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", isbn: "978-0618346257", borrowedBy: null, isAvailable: true }, // New
        { title: "Neuromancer", author: "William Gibson", isbn: "978-0441569595", borrowedBy: null, isAvailable: true },
        { title: "Foundation", author: "Isaac Asimov", isbn: "978-0553293357", borrowedBy: "Ne Zha", isAvailable: false }
    ],

    borrowBookByISBN(isbn, borrowerName){
        const book = this.books.find( book => book.isbn === isbn);

        if(!book) return `Invalid ${isbn}`;
        if(book.borrowedBy !== null) return `${book.title} is already borrowed, find another`;
        
        book.borrowedBy = borrowerName;
        book.isAvailable = false;;
    
        return book;
    },

    getAllBooks(personName){
        return this.books.filter( book => book.borrowedBy === personName)
        .map( book => book.title );
    },

    getAvailableBooksByAuthor(authorName){
        const authorbooks = this.books.filter( book => book.author === authorName && book.isAvailable === true);

        return authorbooks.length > 0 ? authorbooks : `Not Found Any`;
    }
};

// Check the books array reference
// console.log(library.borrowBookByISBN("978-0441569595", "Kami"));
// console.log(library.getAllBooks("Baka"));
console.log(library.getAvailableBooksByAuthor("George Orwell"));


// Challenge 3.3
console.log(lineS());
const restaurant = {
    // pre-populated menu: [...] array so you have plenty of data to test
    // your complex lookup and filtering methods right away.
    name: "Flavour Disc",
    menu: [
        {
            category: "Appetizers",
            items: [
                { name: "Garlic Bread", price: 5.99, isVegetarian: true },
                { name: "Chicken Wings", price: 9.99, isVegetarian: false },
                { name: "Stuffed Mushrooms", price: 7.49, isVegetarian: true }
            ]
        },
        {
            category: "Main Course",
            items: [
                { name: "Margherita Pizza", price: 12.99, isVegetarian: true },
                { name: "Beef Burger", price: 14.50, isVegetarian: false },
                { name: "Paneer Tikka Masala", price: 13.99, isVegetarian: true },
                { name: "Grilled Salmon", price: 18.99, isVegetarian: false }
            ]
        },
        {
            category: "Sides",
            items: [
                { name: "French Fries", price: 3.99, isVegetarian: true },
                { name: "Caesar Salad", price: 6.50, isVegetarian: false }
            ]
        },
        {
            category: "Desserts",
            items: [
                { name: "Chocolate Brownie", price: 6.99, isVegetarian: true },
                { name: "Apple Pie", price: 5.50, isVegetarian: true }
            ]
        }
    ],

    addItemToCategory(categoryName, itemName, price, isVegetarian){
        const category = this.menu.find( c => c.category === categoryName);
        if(!category) return `${categoryName} is not the menu`;

        const newItem = {name: itemName, price, isVegetarian};
        category.items.push(newItem);

        return {
            status: "Success", 
            toCategory: category.category,
            itemAdded: itemName, 
            itemPrice: `$${price}`, 
            isVegetarian, 

        };
    },

    getVegetarianItems() {
        const grouped = {};

        this.menu.forEach(c => {
            const veggiesItem = c.items.filter(item => item.isVegetarian);

            if(veggiesItem.length > 0){
                grouped[c.category] = veggiesItem.map( item => item.name);
            }
        });


        return grouped;
    },

    getPriceRange(min, max){
        const allItems = this.menu.flatMap( c => c.items );
        return allItems.filter( item => item.price >= min && item.price <= max );
    },

    getTotalOrder(orderedItems){
        const allItems = this.menu.flatMap( c => c.items);
        return orderedItems.reduce((sum, orderedItem) =>{
            const menuItem = allItems.find( item => item.name === orderedItem);

            if(menuItem){
                sum += menuItem.price;
            }

            return sum;
        }, 0);

        /* 
        1. Flatten all separate menu categories into a single 'allItems' array using .flatMap().
        2. Use .reduce() on the input 'order' array to accumulate the total cost.
        3. For each ordered item name, look up its corresponding object in 'allItems' to retrieve its price and add it to the sum.
        */
    }
}

// console.log(restaurant.addItemToCategory("Sides", "Chicken Burger", 2.99, false));
console.log(restaurant.getVegetarianItems());
console.log(restaurant.getPriceRange(5.5, 9.2));
console.log(restaurant.getTotalOrder(["Caesar Salad", "Caesar Salad"]));


// Challenge 3.4
console.log(lineS());
const hospital = {
    name: "Hospital",
    patients: [
        {
            id: 101,
            name: "Alice Smith",
            records: [
                { date: "2025-03-12", diagnosis: "Acute Bronchitis", treatment: "Antibiotics and rest" },
                { date: "2025-11-05", diagnosis: "Seasonal Allergies", treatment: "Antihistamines" }
            ]
        },
        {
            id: 102,
            name: "Bob Jones",
            records: [
                { date: "2024-08-19", diagnosis: "Hypertension", treatment: "Beta-blockers and low-sodium diet" },
                { date: "2025-02-14", diagnosis: "Hypertension Checkup", treatment: "Adjusted dosage" },
                { date: "2026-05-20", diagnosis: "Type 2 Diabetes", treatment: "Metformin and glucose tracking" }
            ]
        },
        {
            id: 103,
            name: "Charlie Brown",
            records: [
                { date: "2026-01-10", diagnosis: "Fractured Radius", treatment: "Cast application and pain management" }
            ]
        },
        {
            id: 104,
            name: "Diana Prince",
            records: [
                { date: "2025-07-22", diagnosis: "Migraine", treatment: "Triptans and dark room rest" },
                { date: "2026-04-11", diagnosis: "Migraine", treatment: "Preventative medication review" }
            ]
        },
        {
            id: 105,
            name: "Evan Wright",
            records: [
                { date: "2025-09-30", diagnosis: "Gastroenteritis", treatment: "IV Fluids and bland diet" }
            ]
        }
    ],

    admitPatient(id, name){
        const newPatient = { id, name, records: [] };
        this.patients.push(newPatient);

        return {
            status: "Success", 
            id, 
            name
        }
    },

    addRecordToPatient(id, date, diagnosis, treatment){
        const patientId = this.patients.find( p => p.id === id );
        if(!patientId) return `${id} not found`;

        const newRecord = { date, diagnosis, treatment};
        patientId.records.push(newRecord);

        return {
            status: "Success", 
            patientId: id, 
            date, 
            diagnosis,
            treatment
        }
    },

    getPatientsByDiagnosis(diagnosisName){
        const patients = this.patients.filter( p => {
            return p.records.some( r => r.diagnosis === diagnosisName );
        });

        return patients.length > 0 ? patients : `Not Found`;
    },

    /* 
    Mistake: Using Filter Method Incorrectly
    -----------------------------------------------------------------

    THE MISTAKE:
    Using an inner `p.records.filter(...)` inside an outer `this.patients.filter(...)`.

    WHY IT BROKE:
    1. The inner `.filter()` returns a new array (either full of records or empty `[]`).
    2. In JavaScript, ALL arrays—including an empty array `[]`—evaluate to TRUTHY.
    3. Because an empty array is truthy, the outer filter's callback function 
    received a `true` signal for every single iteration.
    4. Consequently, the outer filter blindly kept every single patient in the system,
    regardless of whether they actually had the matching diagnosis.

    THE FIX:
    Swap the inner `.filter()` out for `.some()`. 
    Unlike `.filter()`, `.some()` returns a strict primitive boolean (`true` or `false`).
    The moment it finds a matching record, it hands a true boolean back to the 
    outer filter, ensuring only the correct patients are kept.
    -----------------------------------------------------------------
    */

    getPatientsWithNoRecords(){
        const patient = this.patients.filter( p => p.records.length === 0 );
        return patient;
    }

};

console.log(hospital.admitPatient(106, "Example"));
console.log(hospital.admitPatient(107, "Ex12"));
console.log(hospital.addRecordToPatient(106, "2026-06-07", "HSAM Diseases", "Natural Treatment"));
console.log(hospital.getPatientsByDiagnosis("Migraine"));
console.log(hospital.getPatientsWithNoRecords());
// console.log(hospital.patients);


// Challenge 3.15
console.log("\n\n\n================= Challenge 3.15 =================\n");
const gradebook = {
    assignments: [
        {
            name: "JS WorkBook",
            totalPoints: 100, 
            grades: {
                "Baka": 90, 
                "Esmo": 85,
                "CornPotato": 60,
                "ChessBurga": 100,
                "Maxwell": 100
            }
        }, 

        {
            name: "Web-Development",
            totalPoints: 100, 
            grades: {
                "Baka": 95, 
                "Melody": 98,
                "Ciel": 92,
                "Etsi": 100,
                "Eb": 100
            }
        }
    ],
}

