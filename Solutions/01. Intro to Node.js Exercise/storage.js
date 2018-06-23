let data = {};
const path = "./storage.json"
const fs = require("fs");

function storage() {
    //"put", "get", "update", "delete", "clear", "save" and "load"
    function put(key, value) {
        if (typeof key !== "string") {
            throw new Error("The key must be a string!");
        } else if (data.hasOwnProperty(key)) {
            throw new Error("Key already exists!");
        }

        data[key] = value;
    }

    function get(key) {
        if (typeof key !== "string") {
            throw new Error("The key must be a string!");
        } else if (!data.hasOwnProperty(key)) {
            throw new Error("Key does not exist!");
        }

        return data[key];
    }

    function getAll() {
        if (Object.keys(data).length > 0) {
            console.log("Storage is Empty!")
        }

        return Object.assign({}, data);
    }

    function update(key, value) {
        if (typeof key !== "string") {
            throw new Error("The key must be a string!");
        } else if (!data.hasOwnProperty(key)) {
            throw new Error("Key does not exists!");
        }

        data[key] = value;
    }

    function remove(key) {// delete (I delete could be made a property, but to me it is cleaner this way)
        if (typeof key !== "string") {
            throw new Error("The key must be a string!");
        } else if (!data.hasOwnProperty(key)) {
            throw new Error("Key does not exists!");
        }

        delete data[key];
    }

    function clear() {
        data = {};
    }

    function saveSync() {
        fs.writeFileSync(path, JSON.stringify(data));
    }

    function loadSync() {
        try {
            let content = fs.readFileSync(path, "utf8");

            data = JSON.parse(content);
        } catch (error) {
            console.log(error);
        }
    }

    function save() {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(data),(err) => {
                if(err){
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    function load() {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, resData) => {
                if (err) {
                    reject(err);
                    return;
                } else {
                    data = JSON.parse(resData);
                    resolve();
                }
            });
        });
    }

    return {
        put,
        get,
        getAll,
        update,
        remove,
        clear,
        save,
        saveSync,
        load,
        loadSync,
    };
}

module.exports = storage();