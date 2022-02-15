const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
let { OAuth2Client } = require('google-auth-library');

const { getDotEnv } = require('./credentials')

console.log(getDotEnv)
const getApi = async (req, res, next) => {
    // create OAuth2 client
    const auth = new google.auth.GoogleAuth({
        keyFile: './src/json/credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    // create a new OAuth client instance
    const client = await auth.getClient();

    //intance of the Google sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    //read the spreadsheet
    const spreadsheetId = '1IwI4STY9b5Q5rglBCSQSmJc8rGexfYQvyzdXai-B7i0';

    // get metadata of the spreadsheet
    const metadata = await sheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })

    const getRows = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Hoja 1!A2:F',
    })

    // write rows to a file
    await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: 'Hoja 1!A2:F',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [
                ['Nicolas', 'male',	'3.Senior',	'WI', 'Spanish', 'Tennis'],
            ]
        }
    });

    res.send(getRows.data);

    next();
};

module.exports = {
    getApi,
};
