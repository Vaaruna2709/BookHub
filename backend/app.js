require("dotenv").config();
// console.log("Mongo URL:", process.env.MONGO_URL);
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

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Image too large. Max allowed size is 5MB.' });
  }
  next(err);
});

app.get("/", (req, res) => {
    res.send("root is working");
});

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/bookHub');
    await  mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
}

app.use(cors());
app.use("/api", user);
app.use('/book',book);
app.use('/reviews',review);

app.listen(8080, () => console.log(`Server running on port 8080`));
