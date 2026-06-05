const users = [
  { id: 1, name: "Alice Johnson", age: 28, email: "alice@example.com" },
  { id: 2, name: "Bob Smith", age: 34, email: "bob.smith@example.com" },
  { id: 3, name: "Charlie Brown", age: 19, email: "charlie@example.com" },
  { id: 4, name: "Diana Prince", age: 31, email: "diana@example.com" },
  { id: 5, name: "Evan Wright", age: 25, email: "evan.w@example.com" },
  { id: 6, name: "Fiona Gallagher", age: 0, email: "fiona@example.com" },
  { id: 7, name: "George Clark", age: 42, email: "" }
];

const config = {
    sortBy: "age",
    order: "desc"
}

function sortUser(users, config){
    return users.sort((a, b) => {
        const field = config.sortBy;
        const aVal = a[field];
        const bVal = b[field];

        return config.order === 'desc' ? bVal - aVal : aVal - bVal;
    });
}

console.log(sortUser(users, config));