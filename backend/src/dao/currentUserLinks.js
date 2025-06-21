import db from "../Connection/db.connection.js";

export const dashBoardDb = (userId, res) => {
    const query = "SELECT * FROM user_url WHERE link_id = ?;";
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.send(result);
    });
}
