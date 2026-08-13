function repeat(n){
    for(let i = 1; i <= n; i++){
        console.log(i);
    }
}

function repeatAction(n, callback){
    return callback(n);
}

repeatAction(10, repeat);