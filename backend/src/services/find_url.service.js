import { DeleteUser } from "../dao/delete_url.js";

export const advanced_features = (expirationDate, PassUrl, longUrl, pass, res) => {
    const now = new Date();
    if (expirationDate == null) {
        findUrlFeatures(PassUrl, longUrl, pass, res)
    }

    else if (expirationDate <= now) {
        DeleteUser(expirationDate);
    }

    else {
        findUrlFeatures(PassUrl, longUrl, pass, res)
    }
}


const findUrlFeatures = (PassUrl, longUrl, pass, res) => {
    if (PassUrl == null) {
        res.redirect(longUrl)
    }
    else {

        if (PassUrl == pass) {
            res.redirect(longUrl)
        }
        else {
            res.send("incorrect");
        }
    }
};
