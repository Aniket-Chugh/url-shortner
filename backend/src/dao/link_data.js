import db from "../Connection/db.connection.js";

export const linkAllData = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM user_url WHERE short_url = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return reject("Internal Server Error");
            }

            if (result.length === 0) {
                return resolve(null);
            }

            const longUrl = result[0].long_url;
            const currentClicks = result[0].clicks;
            const expirationDate = result[0].expiration_date;
            const passUrl = result[0].pass_url;
            const maxClicks = result[0].max_clicks;
            const destroyAfterMaxClicks = result[0].destroythelink
            const redirectionLink = result[0].redirectionLink;

            resolve({
                longUrl,
                currentClicks,
                expirationDate,
                passUrl,
                maxClicks,
                destroyAfterMaxClicks,
                redirectionLink
            });
        });
    });
};
