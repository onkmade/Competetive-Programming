const foodMenu = [
    { name: "Grilled Chicken Breast", calories: 165, protein: 31, carb: 0 },
    { name: "Brown Rice (1 cup cooked)", calories: 215, protein: 5, carb: 45 },
    { name: "Atlantic Salmon", calories: 206, protein: 22, carb: 0 },
    { name: "Sweet Potato (medium)", calories: 103, protein: 2, carb: 24 },
    { name: "Whole Egg", calories: 78, protein: 6, carb: 0.6 },
    { name: "Greek Yogurt (Plain, Non-fat)", calories: 100, protein: 17, carb: 6 },
    { name: "Almonds (1 oz / 23 nuts)", calories: 164, protein: 6, carb: 6 },
    { name: "Avocado (medium)", calories: 240, protein: 3, carb: 12 },
    { name: "Oatmeal (1 cup cooked)", calories: 166, protein: 6, carb: 28 },
    { name: "Banana (medium)", calories: 105, protein: 1.3, carb: 27 },
    { name: "Broccoli (1 cup chopped)", calories: 31, protein: 2.5, carb: 6 },
    { name: "Spinach (2 cups raw)", calories: 14, protein: 2, carb: 2 },
    { name: "Quinoa (1 cup cooked)", calories: 222, protein: 8, carb: 39 },
    { name: "Cottage Cheese (1% fat, 1 cup)", calories: 163, protein: 28, carb: 6.1 },
    { name: "Apple (medium)", calories: 95, protein: 0.5, carb: 25 },
    { name: "Peanut Butter (2 tbsp)", calories: 188, protein: 8, carb: 6 },
    { name: "Black Beans (1 cup cooked)", calories: 227, protein: 15, carb: 41 },
    { name: "White Bread (1 slice)", calories: 75, protein: 2, carb: 15 },
    { name: "Dark Chocolate (1 oz)", calories: 170, protein: 2, carb: 13 },
    { name: "Whey Protein Isolate (1 scoop)", calories: 120, protein: 25, carb: 2 }
];

const selectedItems = ["Almonds", "Grilled Chicken" , "Brown Rice"];


function check(arr, selectedItems){
    let newfood = { totalProtein: 0, totalCalories: 0, totalCarbs: 0};
    for(let {name, protein, calories, carb} of arr){ // this is filter methods if I use filter
        for(let item of selectedItems){ // inside the filter method this is some methods which verifies the name are matching or not
            if(name.startsWith(item)){
                newfood.totalCalories += calories;
                newfood.totalProtein += protein;
                newfood.totalCarbs += carb;
            }
        }
    }
    
    return newfood;
}

const getHighProteinItems = minProtein => {
    // Strictly greater than minProtein matches your filter perfectly
    return foodMenu.filter(food => food.protein > minProtein);
};

const getDailyTotals = (selectedItems) => {
    // We loop over what the user ATE (selectedItems)
    return selectedItems.reduce((totals, itemName) => {
        
        // Find the matching food item in our master menu
        const match = foodMenu.find(food => food.name.startsWith(itemName));
        console.log("Match: ", match);
        
        // Safety check: If the item exists, add its macros to our running totals
        if (match) {
            totals.calories += match.calories;
            totals.protein += match.protein;
            totals.carbs += match.carbs; // Fixed typo from 'crabs'
        }
        
        return totals;
    }, { calories: 0, protein: 0, carbs: 0 }); // Starting values for our totals
};

// Usage: Pass an array directly as requested by the prompt
console.log(getDailyTotals(["Grilled Chicken Breast", "Whole Egg", "Whole Egg"])); 
// Correctly doubles the egg values!

console.log(getHighProteinItems(12));
console.log(check(foodMenu, selectedItems));