const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');


const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const controller404 = require('./controllers/404')


const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(shopRoutes)
app.use('/admin', adminRoutes)
app.use(controller404.get404Page)

app.listen(3000)
