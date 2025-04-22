const fs = require('fs');
const glob = require('glob');
const path = require('path');

let classList = [];
glob.sync(path.join(__dirname, '*.scss')).forEach(filePath => {
    const contents = fs.readFileSync(filePath, 'utf-8');

    const result = contents.match(/\.+[a-zA-Z-0-9\\\/]*\s({|>)/g);
    const regex = /\.|\s|{|>|\\/g;
    if (result) result.forEach(str => classList.push(str.replace(regex,'')) );
});

console.log(JSON.stringify(classList));