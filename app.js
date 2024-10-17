const express = require("express");
const app = express();
const path = require("node:path");
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
const control = require("./controllers/control");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.get("/", control.renderMessages);

router.get("/new", (req, res) => {
  res.render("form", { feedback: "" });
});

router.post("/new", control.postMessage);

app.get("/:userName", control.searchMessage);

app.use("/", router);

const PORT = process.env.DB_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Port ${PORT} ongoing.`);
});
