const express = require('express');
const path = require('path');
const open = require('open');

const port = 4000;
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/:filename', (req, res) => {
    const { filename } = req.params;
    res.sendFile(path.join(__dirname, './' + filename));
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
})