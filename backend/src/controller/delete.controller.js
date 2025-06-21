import { deleteLink } from "../dao/delete_url.js";

export const delete_link = (req, res) => {
    const { id } = req.body;

    deleteLink(id, res);
}
