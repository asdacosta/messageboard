const express = require("express");
const app = express();
const path = require("node:path");
const router = express.Router();
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const messages = [
  {
    text: "Nice express project!",
    user: "Ace",
    added: new Date(),
  },
  {
    text: "Another time.",
    user: "Nii",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

router.get("/new", (req, res) => {
  res.render("form", { feedback: "" });
});

router.post("/new", (req, res) => {
  const userName = req.body.name;
  const userMessage = req.body.message;

  if (userName === "" || userMessage === "") {
    return res.render("form", { feedback: "Please fill in all fields!" });
  }

  messages.forEach((message) => {
    if (userName === message.user) {
      return res.render("form", { feedback: "Username already in use." });
    }
  });

  messages.push({ text: userMessage, user: userMessage, added: new Date() });

  res.redirect("/");
});

app.get("/:userName", (req, res, next) => {
  const userName = req.params.userName;
  let userMessage = null;
  let date = null;
  let foundUser = false;

  if (userName === "new") return next();

  messages.forEach((message) => {
    if (message.user === userName) {
      foundUser = true;
      userMessage = message.text;
      date = message.added;
    }
  });

  if (!foundUser) res.status(404).send("User not found!");

  res.render("detail", {
    userName: userName,
    userMessage: userMessage,
    date: date,
  });
});

app.use("/", router);

app.listen(8080);
