const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/jobSearchDB'), mongooseOptions);
const app = express();

app.use(routes);

app.listen(PORT, () => console.log("Server listening on http://localhost:" + PORT));