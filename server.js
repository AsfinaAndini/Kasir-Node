const bodyParser = require("body-parser");
const express = require(`express`);
const app = express();
const PORT = 8000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

const routes = require("./routes/route");
app.use(routes)

app.listen(PORT, () => {
  console.log(`🚀 Server up and running on port ${PORT}`);
});