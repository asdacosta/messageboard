const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  console.log(rows);
  return rows;
}

async function insertMessage(username, message) {
  await pool.query("INSERT INTO messages (username, message) VALUES ($1, $2)", [
    username,
    message,
  ]);
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
