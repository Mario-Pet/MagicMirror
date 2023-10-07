// server.js
const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 8080;

app.get('/add-call', (req, res) => {
    exec('DISPLAY=:0 npm start -- --send-notification "ADD_CALL"', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });
    res.send('Notification sent!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
