const express = require("express");
const mongoose = require("mongoose");

const passport = require("./scripts/passport")
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/jobSearchDB'), mongooseOptions);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3001;


app.use(routes);

app.listen(PORT, () => console.log("Server listening on http://localhost:" + PORT));