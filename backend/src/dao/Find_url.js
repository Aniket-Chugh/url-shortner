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
    const expirationDate = result[0].expiration_date;

    const now = new Date();
    console.log(now);
    console.log(expirationDate);



    if (expirationDate <= now) {
        console.log("the time is same");

    }
    else {
        console.log("not same");

    }








    const updateQuery = "UPDATE user_url SET clicks = ? WHERE short_url = ?";





db.query(updateQuery , [currentclicks+1 , id] , (err , result)=>{
    if (err) {
        console.error(err , "this is the error happens");

    }
    else {

        if (expirationDate == null) {

            res.redirect(longUrl)
        }
else {
if (expirationDate <= now) {
        const query = "DELETE FROM user_url where expiration_date = ?;"
        db.query(query , [expirationDate] , (err , result)=>{
            if (err) {
               console.log("error deleting the row");

            }
            else {
                console.log(result);

            }

        })

    }
else{
    res.redirect(longUrl);
}
}

    }
})





  });
};
