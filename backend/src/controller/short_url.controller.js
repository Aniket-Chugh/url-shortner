import { generateId } from "../utils/generate_nanoid.util.js";
import { store_urls } from "../dao/store_url.js";
import { find_url_trough_short_url } from "../dao/Find_url.js";
import db from "../Connection/db.connection.js";
export const create_short_url = async (req, res) => {
  const { url, isprotected, id } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  if (isprotected && id) {
    custom_short_url(req, res, url, id);
  }

else if(isprotected && id.length == 0){
    return res.json("Write some password.")
}

else {
    const generatedId = generateId(7);
    store_urls(generatedId, url, res);
  }
};



export const custom_short_url = async (req, res, url, id) => {
  const query = "SELECT short_url FROM user_url WHERE short_url = ?;";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length > 0) {
      return res.status(409).json({ error: "Custom short URL already taken!" });
    }

   
    store_urls(id, url, res);
  });
};


export const find_url_from_short_url = async (req, res) => {
  const { id } = req.params;
  find_url_trough_short_url(id, res);
};
