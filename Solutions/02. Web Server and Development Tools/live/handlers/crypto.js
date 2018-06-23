const crypto = require("crypto");

function generateSalt() {
    return crypto.randomBytes(128).toString("base64");
}

function generateHash(salt, pwd) {
    let hmac = crypto.createHmac("sha1", salt);

    return hmac.update(pwd).digest("hex");
}

let salt = "F4mVJHM5iCopYmB0GY/HaMYicyTwLoQTdjb7AbhqLD4TQxoZeHIjs1775fdu2CBWmbtLtukxrUF0ATFg69jBCo7fgw7km3KIxALRvv49fSCOosjvQeXj/1TruWgU/cmRs5fao57Qx6YnCYRlVE6ud3H5ZFCrvEg7mZR1+6OGYA0=";
let password = "pesho11";
let hashed = generateHash(salt, password);

console.log(hashed);