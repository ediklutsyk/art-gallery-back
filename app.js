const express = require('express')
const mongoose = require('mongoose')
const configs = require('./configs')
const cors = require('cors')
const port = 3002
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const userRouter = require('./routes/users')
const categoriesRouter = require('./routes/categories')
const imagesRouter = require('./routes/images')

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/categories', categoriesRouter);
app.use('/images', imagesRouter);

//DB
mongoose.connect(configs.mongoURL, configs.mongoData)
    .then(() => console.log('connected to the db'))
    .catch((err) => console.log(err))

app.listen(port, () => {
    console.log(`Example apps listening at http://localhost:${port}`)
})

