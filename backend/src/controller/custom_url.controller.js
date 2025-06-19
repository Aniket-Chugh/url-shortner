import db from '../Connection/db.connection.js';
import { store_urls } from '../dao/store_url.js';

export const custom_short_url = async (
    res,
    url,
    id,
    expirationDate,
    passUrl,
    maxClicks,
    destroyAfterMaxClicks,
    RedirectTheLink,
    userid,
    qrcode
) => {
    const query = 'SELECT short_url FROM user_url WHERE short_url = ?;';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.length > 0) {
            return res.status(409).send({ error: 'Custom short URL already taken!' });
        }

        store_urls(
            id,
            url,
            expirationDate,
            passUrl,
            maxClicks,
            destroyAfterMaxClicks,
            RedirectTheLink,
            userid,
            qrcode,
            res
        );
    });
};
