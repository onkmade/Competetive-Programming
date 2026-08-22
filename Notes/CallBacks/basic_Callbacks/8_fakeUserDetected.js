function fakeUser(id, callbackFN){
    setTimeout(() => {
        const user = {id: id, name: "Baka"};
        callbackFN(user);
    }, 2000);
}

function handleUser(user){
    console.log(user);
}

fakeUser("ZIB203", handleUser);