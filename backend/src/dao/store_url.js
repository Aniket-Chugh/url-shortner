import db from "../Connection/db.connection.js";

export const store_urls = (id, url, expirationDate, passUrl, maxClicks, destroyAfterMaxClicks, res) => {
    const query = `
    INSERT INTO user_url
    (short_url, long_url, expiration_date, pass_url, max_clicks , destroythelink)
    VALUES (?, ?, ?, ?, ? , ?)
  `;

    db.query(
        query,
        [id, url, expirationDate, passUrl, maxClicks, destroyAfterMaxClicks],
        (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Failed to save URL" });
            }

            res.json({
                shortUrl: id,
                id: result.insertId,
            });


        }
    );
};
