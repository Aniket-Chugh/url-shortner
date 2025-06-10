import db from "../Connection/db.connection.js";
export const find_url_trough_short_url = (id, res) => {
  const query = "SELECT * FROM user_url WHERE short_url = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (result.length === 0) {
      return res.status(404).send("URL not found");
    }

    const longUrl = result[0].long_url;
    const currentclicks = result[0].clicks;

    const updateQuery = "UPDATE user_url SET clicks = ? WHERE short_url = ?";

db.query(updateQuery , [currentclicks+1 , id] , (err , result)=>{
    if (err) {
        console.error(err , "this is the error happens");

    }
    else {

        res.redirect(longUrl)

    }
})





  });
};
