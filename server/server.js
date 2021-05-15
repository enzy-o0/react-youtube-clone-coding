const express = require('express')
const app = express()
const api = require('./routes/index');
const bodyParser = require('body-parser');
const config = require('./config/key')

app.use('/api', api);

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const port = 3001;
app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
})

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
