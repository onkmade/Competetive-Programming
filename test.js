function showFormat(name, superhero, code) {
    return {name, superhero, code};
}

const {name, superhero, code} = showFormat("Baka", "IronMan", "ZIB14440xAD");
console.log(`name is ${name}`);