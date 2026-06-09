const user = {
    name: "Baka",
    age: Infinity,
    email: "baka@gmail.com"
};

const userProfile = document.getElementById('profile');

// 1. targetContainer makes the function reusable for ANY element on your page
function displayUser(profileData, targetContainer) {
    
    // 2. Dynamically loop through the object properties [key, value]
    // Example: ["name", "Baka"], ["age", Infinity]
    Object.entries(profileData).forEach(([key, value]) => {
        
        const propParagraph = document.createElement('p');
        
        // Capitalize the first letter of the key dynamically (e.g., "name" -> "Name")
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        
        propParagraph.textContent = `${formattedKey}: ${value}`;
        
        // Apply your Tailwind styles to each element inside the loop
        propParagraph.classList.add(
            'bg-slate-400',
            'w-60',
            'text-white',
            'rounded-sm',
            'm-1',
            'p-2'
        );
        
        // 3. Append to the specific container passed into the function
        targetContainer.appendChild(propParagraph);
    });
}

// Call it correctly by passing the data object and the DOM element container
displayUser(user, userProfile);