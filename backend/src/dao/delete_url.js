import db from "../Connection/db.connection.js";

export const DeleteUser = (expirationDate) => {
    const query = "DELETE FROM user_url where expiration_date = ?;"
    db.query(query, [expirationDate], (err, result) => {
        if (err) {
            console.log("error deleting the row");
        }
        else {
            console.log(result);
        }
    })
}
