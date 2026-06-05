// LEVEL 3: Objects + Arrays + Methods

let num = 0;
function lineS(){
    return `\n\n\n================= Challenge 3.${++num} =================\n`
}

console.log(lineS());


// Challenge 3.1
const school = {
    name: "Baka Institute of Technology",
    departments: [
        {
            deptName: "Computer Science & Engineering",
            courses: [
                {
                    courseName: "Web Development",
                    credits: 4,
                    enrolledStudents: ["Luffy", "Zoro", "Nami"]
                },
                {
                    courseName: "Data Structures",
                    credits: 3,
                    enrolledStudents: ["Zoro", "Robin"]
                }
            ]
        },
        {
            deptName: "Electronics & Telecommunication",
            courses: [
                {
                    courseName: "Microcontrollers",
                    credits: 4,
                    enrolledStudents: ["Chopper", "Franky"]
                },
                {
                    courseName: "Signal Processing",
                    credits: 3,
                    enrolledStudents: ["Sanji", "Usopp", "Nami"]
                }
            ]
        }
    ]
};

const addDepartment = (deptName, courses, obj) => {
    if(obj.departments){
        departments[deptName] = deptName;
        departments[courses] = {};
    }

    return obj;
}

console.log(addDepartment("Mechnical Engineering", { courseName: "Rigid Bodies", credits: 5, enrolledStudents: ["Baka", "Sonu", "Tapu"]}))