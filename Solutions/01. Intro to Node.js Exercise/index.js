const storage = require("./storage.js");

storage.load()
    .then(() => {
        console.log(storage.getAll());
        console.log("Successfully loaded!")
    })
    .catch(e => {
        console.log(e);
    });
storage.put('first', 'firstValue');
storage.put('second', 'secondValue');
storage.put('third', 'thirdValue');
storage.put('fouth', 'fourthValue');
console.log(storage.get('first'));
console.log(storage.getAll());
storage.remove('second');
storage.update('first', 'updatedFirst');
storage.save()
    .then(() => {
        storage.clear();

        storage.load()
            .then(() => {
                console.log(storage.getAll());
                console.log("Successfully loaded!")
            })
            .catch(e => {
                console.log(e);
            });
    })
    .catch(e => {
        console.log(e);
    });