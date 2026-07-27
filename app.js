const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const {getNotFoundPage} = require("./controllers/error");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(getNotFoundPage);

sequelize.sync().then(result => {
    // console.log('Success: ', result);
    app.listen(3000);
}).catch(err => {
    console.log('Error: ', err);
});


