const express = require("express");
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user');
const book = require("./routes/book")
const review =require("./routes/review")
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("root is working");
});

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/bookHub');
}

app.use(cors());
app.use("/api", user);
app.use('/book',book);
app.use('/reviews',review);

app.listen(8080, () => console.log(`Server running on port 8080`));
