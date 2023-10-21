const fs = require('fs');
const path = require('path');

let fileArray = [];

function readDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            readDir(fullPath);
        } else {
            fileArray.push(fullPath);
        }
    });
}

readDir('./'); // Substitua pelo caminho da pasta que deseja ler

console.log(fileArray);
