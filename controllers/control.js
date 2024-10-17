const db = require("../db/queries");

async function renderMessages(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { messages: messages || [] });
}

async function postMessage(req, res) {
  const userName = req.body.name;
  const userMessage = req.body.message;
  const messages = await db.getAllMessages();

  if (userName === "" || userMessage === "") {
    return res.render("form", { feedback: "Please fill in all fields!" });
  }
  for (let message of messages) {
    if (userName === message.usernmae) {
      return res.render("form", { feedback: "Username already in use." });
    }
  }

  await db.insertMessage(userName, userMessage);
  res.redirect("/");
}

async function searchMessage(req, res, next) {
  const userName = req.params.userName;
  if (userName === "new") return next();
  let userMessage = null;
  let date = null;
  let foundUser = false;
  const searchResult = await db.searchUsername(userName);
  const messages = await db.getAllMessages();

  messages.forEach((message) => {
    if (message.username === userName) {
      foundUser = true;
      userMessage = message.message;
      date = message.date;
    }
  });

  if (!foundUser) res.status(404).send("User not found!");

  res.render("detail", {
    userName: userName,
    userMessage: userMessage,
    date: date,
  });
}

module.exports = {
  renderMessages,
  postMessage,
  searchMessage,
};
