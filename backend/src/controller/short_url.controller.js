import { generateId } from "../utils/generate_nanoid.util.js";
import { store_urls } from "../dao/store_url.js";
import { custom_short_url } from "./custom_url.controller.js";
import { find_url_trough_short_url } from "../dao/Find_url.js";
export const create_short_url = async (req, res) => {
    const { url, isprotected, id, expirationDate, passUrl, maxClicks } = req.body;
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    if (isprotected && id) {
        custom_short_url(req, res, url, id, expirationDate, passUrl, maxClicks);
    }

    else if (isprotected && id.length == 0) {
        return res.json("Write some password.")
    }

    else {
        const generatedId = generateId(7);
        store_urls(generatedId, url, expirationDate, passUrl, maxClicks , res);
    }
};





export const find_url_from_short_url = async (req, res) => {
    const { id, pass } = req.params;
    find_url_trough_short_url(id, pass, res);
}
