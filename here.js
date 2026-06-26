function sayHello(){
    console.log("Hello");
}

function executeAnything(fn){
    console.log("About to execute what you gave to me...");
    fn();
    console.log("Done Executing");
}

executeAnything(sayHello);