import { generateId } from "../utils/generate_nanoid.util.js";
import { store_urls } from "../dao/store_url.js";
import { custom_short_url } from "./custom_url.controller.js";
import { find_url_trough_short_url } from "../dao/Find_url.js";
import { generateQr } from "./qrgenerate.controller.js";

export const create_short_url = async (req, res) => {
    const userid = req.user.user_id;



    const { url, isprotected, id, expirationDate, passUrl, maxClicks, destroyAfterMaxClicks, RedirectTheLink } = req.body;

    const qrcode = await generateQr(url, res);

    console.log(qrcode);


    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }


    if (isprotected && id) {
        custom_short_url(res, url, id, expirationDate, passUrl, maxClicks, destroyAfterMaxClicks, RedirectTheLink, userid, qrcode);
    }

    else if (isprotected && id.length == 0) {
        return res.json("Write some password.")
    }

    else {
        const generatedId = generateId(7);
        store_urls(generatedId, url, expirationDate, passUrl, maxClicks, destroyAfterMaxClicks, RedirectTheLink, userid, qrcode, res);
    }
};



export const find_url_from_short_url = async (req, res) => {
    const { id, pass } = req.params;
    find_url_trough_short_url(id, pass, res);
}
