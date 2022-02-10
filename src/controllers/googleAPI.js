const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
let { OAuth2Client } = require('google-auth-library');

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
                ['Alexandra', 'Female',	'4.Senior',	'CA', 'English', 'Drama Club'],
                ['Carlos', 'male',	'1.Senior',	'ND', 'English', 'Debate'],
                ['Julia', 'Female',	'2.Senior',	'WI', 'English', 'Tennis'],
            ]
        }
    });

    res.send(getRows.data);
    console.log(getRows.data);

    next();
};

module.exports = {
    getApi,
};
