// Library -----------------------
require("pidcrypt/seedrandom");
var pidCrypt = require("pidcrypt");

require("pidcrypt/aes_cbc");
var aes = new pidCrypt.AES.CBC();

const fs = require("fs");
// -------------------------------



const decryptFile = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return console.error(err);
        
        const decryptedText = aes.decryptText(data);
        
        fs.writeFile(filePath, decryptedText, (err) => {
            if (err) return console.error(err);
            
            console.log(`Текст у файлі "${filePath}" було успішно дешифровано!`);
        });
    });
};

decryptFile("text.txt");