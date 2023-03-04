// Library -----------------------
require("pidcrypt/seedrandom");
var pidCrypt = require("pidcrypt");

require("pidcrypt/aes_cbc");
var aes = new pidCrypt.AES.CBC();

const fs = require("fs");
// -------------------------------


function encryptFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return console.error(err);

    const encryptedText = aes.encryptText(data);

    const newFilePath = filePath.replace(/\.txt$/, ".enc");

    fs.writeFile(newFilePath, encryptedText, (err) => {
      if (err) return console.error(err);

      console.log(`Текст у файлі "${filePath}" було успішно зашифровано та збережено у файлі "${newFilePath}".`);

      fs.unlink(filePath, (err) => {
        if (err) return console.error(err);

        console.log(`Файл "${filePath}" був успішно видалений.`);
      });
    });
  });
}

encryptFile("text.txt");