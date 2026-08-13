// Basic Callback func - 1
function greetName(name){
    return name + ", Welcome to Javascript Learning!"
    // a function must return something if possible
}

// Basic Callback func - 2
function farewellUser(name){
    return "Thanks for leaving us, " + name;
}

// Basic Callback func - 3
function welcomeBackUser(name){
    return "Welcome Back to the Javascript Learning!, " + name;
}


// Define an another function that accept an another function (a callback)
function processUser(name, callbackFn){
    const result = callbackFn(name);
    return console.log(result);
}

processUser("Baka", greetName); // this is the 1st line get executed
processUser("Baka", farewellUser);
processUser("Baka", welcomeBackUser);