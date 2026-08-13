function myForEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i, arr); // send one item at a time
    }
}

function printElement(item, index) {
    console.log(index, item);
}

const arr = ["Baka", "Ciel", "Tron"];
myForEach(arr, printElement);