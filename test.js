function addTimeStamp(user){
    user.lastLoggined = new Date();
    return user;
}

const user = { name: "Alice" };
addTimeStamp(user);

console.log(user);

