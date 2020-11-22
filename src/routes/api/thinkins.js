const db = require("../../../db/connection");

export function get(req, res, next) {
  getThinkins().then((data) => {
    const thinkins = data;
    res.setHeader("Content-Type", "application/json");
    res.send(thinkins);
  })
}

function getThinkins() {
  return db
    .query("SELECT * FROM tortoise_sessions ORDER BY start_date ASC")
    .then((name) => name.rows)
    .catch((error) => error);
}
