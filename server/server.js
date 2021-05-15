const express = require('express')
const app = express()
const api = require('./routes/index');
const mongoURI = 'mongodb+srv://root:31021@cluster0.luybf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use('/api', api);

const port = 3001;
app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
})

const mongoose = require('mongoose')
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
