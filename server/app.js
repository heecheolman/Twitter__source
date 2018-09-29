const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./route/index');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use('/api', router);
app.use('/static', express.static(path.join(__dirname, '../client/dist/static')));
app.use('/static/images', express.static(path.join(__dirname, '../client/static/images')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
    console.log('server starting');
});