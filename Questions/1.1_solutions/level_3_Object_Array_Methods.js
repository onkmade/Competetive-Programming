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

// console.log(library.books);