// @ts-check
const port = process.env.PORT || 8080;

const dataServices = require('./public/js/data-services');

const handlebars = require('express-handlebars');
const express = require('express');
const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    res
        .status(200)
        .render('home', { screenshotUrl: await dataServices.getUrl() });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));