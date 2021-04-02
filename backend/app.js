require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const cors = require('cors');
const mongoose = require("mongoose");
const adminRoute = require('./routes/admin');
const port = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './src/pages');

app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));

mongoose
.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(() => {
    app.listen(port, () => console.log(`Connection to Mongo DB established successfully. Server is running on ${port}, http://localhost:${port}`));
})
.catch((err) => {
    console.log(err);
});

app.use('/', adminRoute);

// app.get("/", (req, res) => {
//     res.send("Hello there");
// })