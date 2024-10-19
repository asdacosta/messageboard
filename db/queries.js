const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(username, message, date) {
  await pool.query(
    "INSERT INTO messages (username, message, date) VALUES ($1, $2, $3)",
    [username, message, date]
  );
}

async function searchUsername(searchValue) {
  const searchResult = await pool.query(
    "SELECT * FROM messages WHERE username ILIKE $1",
    [`%${searchValue}%`]
  );
  return searchResult;
}

module.exports = {
  getAllMessages,
  insertMessage,
  searchUsername,
};
