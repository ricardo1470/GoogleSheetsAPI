const fs = require('fs');
const path = require('path');
require('dotenv');
const dotenv = require('GoogleSheetsAPI/.env');

console.log("este es dotenv ",dotenv)

const getDotEnv = () => {
    const dotenvKeys = dotenv();
    fs.writeFileSync((path.join(__dirname ,'../json/credentials.json')), JSON.stringify(dotenvKeys, null, '\t'), function (err) {
        if (err) throw err;
    });
}

module.exports = {
    getDotEnv
}