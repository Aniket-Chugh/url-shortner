import { advanced_features } from "../services/find_url.service.js";
import db from "../Connection/db.connection.js";
import { linkAllData } from "./link_data.js";
export const find_url_trough_short_url = async (id, pass, res) => {

    const data = await linkAllData(id);
    console.log(data);

    const longUrl = data.longUrl;
    const currentclicks = data.currentClicks;
    const expirationDate = data.expirationDate;
    const PassUrl = data.passUrl;


    const updateQuery = "UPDATE user_url SET clicks = ? WHERE short_url = ?";
    db.query(updateQuery, [currentclicks + 1, id], (err, result) => {
        if (err) {
            console.error(err, "This is the error happens");
        }
        else {
            advanced_features(expirationDate, PassUrl, longUrl, pass, res)
        }
    })
}
