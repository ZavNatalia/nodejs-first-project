const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const {getNotFoundPage} = require("./controllers/error");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        req.user = user;
        next();
    }).catch((err) => {
        console.log("Error occurred:", err);
        next(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(getNotFoundPage);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize.sync({force: true})
    .then(result => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({name: 'Natalia', email: 'n111@test.com'})
        }
        return user;
    })
    .then((user) => {
        // console.log('User: ', user);
        app.listen(3000);
    })
    .catch(err => {
    console.log('Error: ', err);
});


