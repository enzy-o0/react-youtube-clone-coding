const express = require('express');
const app = express();
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

app.use('/videoFiles', express.static('videoFiles')); // 내부 폴더

app.use('/api/user', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/like', require('./routes/like'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

    // Set static folder   
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
    
        // index.html for all page routes    html or routing and naviagtion
        // app.get("*", (req, res) => {
        //   res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
        // });
    
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});
