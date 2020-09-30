// @ts-check
const port = process.env.PORT || 8080;
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
    res
        .status(200)
        .sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`app listening on port ${port}!`));