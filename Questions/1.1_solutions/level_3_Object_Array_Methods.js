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