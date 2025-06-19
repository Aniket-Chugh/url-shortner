import { dashBoardDb } from "../dao/currentUserLinks.js";

export const Userdashboard = async (req, res) => {


    const userId = req.user.user_id;
    dashBoardDb(userId, res);

}
