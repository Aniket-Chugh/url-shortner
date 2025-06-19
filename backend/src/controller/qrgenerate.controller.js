import QRCode from "qrcode";

export const generateQr = async (url, res) => {
    console.log(url);

    try {
        const qrCodeImage = await QRCode.toDataURL(url);
        return qrCodeImage;
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send('Internal Server Error');
    }
};
