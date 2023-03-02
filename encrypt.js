// Library -----------------------
require("pidcrypt/seedrandom");
var pidCrypt = require("pidcrypt");

require("pidcrypt/aes_cbc");
var aes = new pidCrypt.AES.CBC();

const fs = require("fs");
// -------------------------------



var cryptText;

function readFile(filePath) {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            cryptText = aes.encryptText(data);

            var decrypted = aes.decryptText(cryptText);
            console.log(`Текстовий документ містить: "${decrypted}"`);
            createFile("text.txt", cryptText);
        }
    });
}

function createFile(filePath, fileContent) {
    fs.writeFile(filePath, fileContent, () => {
        console.log(`Текст у файлі "${filePath}" був зашифрований, як: "${fileContent}"`);
    });
}

readFile("text.txt"); // reading a file