// Library -----------------------
require("pidcrypt/seedrandom");
var pidCrypt = require("pidcrypt");

require("pidcrypt/aes_cbc");
var aes = new pidCrypt.AES.CBC();

const fs = require("fs");
// -------------------------------

const decryptFile = (filePath) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return console.error(err);

        const decryptedText = aes.decryptText(data);

        const newFilePath = filePath.replace(/\.enc$/, ".txt");

        fs.writeFile(newFilePath, decryptedText, (err) => {
            if (err) return console.error(err);

            console.log(`Текст у файлі "${filePath}" було успішно дешифровано та збережено у файлі "${newFilePath}".`);

            fs.unlink(filePath, (err) => {
                if (err) return console.error(err);
                
                console.log(`Файл "${filePath}" був успішно видалений.`);
            });
        });
    });
};

decryptFile("text.enc");