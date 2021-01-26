// @ts-check
const port = process.env.PORT || 8080;

const dataServices = require('./public/js/data-service');

const handlebars = require('express-handlebars');
const express = require('express');

const app = express();
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const { screenShotUrl, modifiedDate } = await dataServices.getUrl();
    res
        .status(200)
        .render('home', {
            title: modifiedDate,
            screenshotUrl: screenShotUrl
        });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));