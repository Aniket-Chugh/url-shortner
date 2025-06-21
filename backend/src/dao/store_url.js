import db from "../Connection/db.connection.js";

export const store_urls = (id, url, expirationDate, passUrl, maxClicks, destroyAfterMaxClicks, RedirectTheLink, userid, qrcode, res) => {
    const query = `
    INSERT INTO user_url
    (short_url, long_url, expiration_date, pass_url, max_clicks , destroythelink , redirectionLink , link_id , qrcode)
    VALUES (?, ?, ?, ?, ? , ? , ? , ? , ?)
  `;



    db.query(
        query,
        [id, url, expirationDate, passUrl, maxClicks, destroyAfterMaxClicks, RedirectTheLink, userid, qrcode],
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
