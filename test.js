const hero = {
    name: "Ne Zha",
    health: 100,
    level: 1,

    // Hero is an entity which has another sub entity called weapon
    // It's an entity with its own properties.
    weapon: {
        name: "Argon Thunder",
        damage: 15,
        durability: 100, 
        type: "sword"
    },

    // Armor is an another entity

    armor: {
        name: "Iron-Chest",
        defense: 20, 
        durability: 100, 
        type: "chest"
    },

    inventory: [
        {name: "Healing Spell", type: "healer", effect: { heal: 50}},
        {name: "Poison", type: "destroy", effect: { damage: 40}},
        {name: "Golden Coin", currency: 100, quantity: 150}
    ],
};


const item = [...hero.inventory];
item.push( { name: "New Item" });

console.log(item);
console.log(hero.inventory);
