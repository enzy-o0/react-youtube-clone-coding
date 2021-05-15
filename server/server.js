const express = require('express');
const app = express();
const api = require('./routes/index');
const config = require('./config/key');

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', api);


const port = 5000;
app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
})
