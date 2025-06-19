import db from "../Connection/db.connection.js";

export const Userdashboard = async (req, res) => {


    const userId = req.user.user_id;
    const query = "SELECT * FROM user_url WHERE link_id = ?;";
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        res.json(result);
    });

}
