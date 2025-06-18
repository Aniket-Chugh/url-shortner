import { DeleteUser } from "../dao/delete_url.js";

export const advanced_features = (expirationDate, PassUrl, longUrl, pass, res) => {
    const now = new Date();

    // if (destroylink == true) {
    //     if (clicks == maxclicks) {
    //         deletethelink
    //     }
    // }
    // else {
    //     res.redirect
    // }


    // // second the redirection :

    // if (redirection == true || redirectionlink == "link") {

    //     if (clicks == maxclicks) {

    //         updatequesry update the long_url to this redirection link

    //     }

    // }


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
