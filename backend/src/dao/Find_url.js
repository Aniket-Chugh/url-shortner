import { advanced_features } from "../services/find_url.service.js";
import db from "../Connection/db.connection.js";
import { linkAllData } from "./link_data.js";

export const find_url_trough_short_url = async (id, pass, res) => {
    const data = await linkAllData(id);

    if (!data || !data.longUrl) {
        return res.redirect("http://localhost:3000/");
    }

    const longUrl = data.longUrl;
    const currentclicks = data.currentClicks;
    const expirationDate = data.expirationDate;
    const PassUrl = data.passUrl;
    const destroyAfterMaxClicks = data.destroyAfterMaxClicks;
    const maxClicks = data.maxClicks;
    const redirectionLink = data.redirectionLink;

    const updateQuery = "UPDATE user_url SET clicks = ? WHERE short_url = ?";

    db.query(updateQuery, [currentclicks + 1, id], (err) => {
        if (err) {
            console.error("Error updating clicks:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (redirectionLink != null) {

            if (currentclicks >= maxClicks) {

                const query = "UPDATE user_url SET long_url = ? WHERE short_url = ?;";
                db.query(query, [redirectionLink, id], (err, result) => {
                    if (err) {
                        console.log("Error updating long_url:", err);
                        return res.status(500).json({ message: "Internal server error" });
                    }
                    return advanced_features(expirationDate, PassUrl, longUrl, pass, res);
                });

                return;
            }
            else {
                return advanced_features(expirationDate, PassUrl, longUrl, pass, res);
            }
        }

        if (destroyAfterMaxClicks === true && currentclicks === maxClicks) {
            const deleteQuery = "DELETE FROM user_url WHERE short_url = ?";
            db.query(deleteQuery, [id], (err) => {
                if (err) {
                    console.log("Error deleting after max clicks:", err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                return advanced_features(expirationDate, PassUrl, longUrl, pass, res);
            });

            return;
        }

        return advanced_features(expirationDate, PassUrl, longUrl, pass, res);
    });
};
