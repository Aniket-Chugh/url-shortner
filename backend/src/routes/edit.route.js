import express from "express";
import db from "../Connection/db.connection.js";

const editRouter = express.Router();

editRouter.post("/", (req, res) => {
    const {
        short_url,
        expiration_date,
        max_clicks,
        redirectionLink,
        destroythelink,
    } = req.body;

    if (!short_url) {
        return res.status(400).json({ error: "Short URL is required." });
    }

    const updateQuery = `
    UPDATE user_url
    SET
      expiration_date = ?,
      max_clicks = ?,
      redirectionLink = ?,
      destroythelink = ?
    WHERE short_url = ?
  `;

    const values = [
        expiration_date || null,
        max_clicks || null,
        redirectionLink || null,
        destroythelink || false,
        short_url,
    ];

    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error("Database update error:", err);
            return res.status(500).json({ error: "Failed to update link." });
        }

        res.status(200).json({ message: "Link updated successfully." });
    });
});

export default editRouter;
