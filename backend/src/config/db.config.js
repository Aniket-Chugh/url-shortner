import dotenv from "dotenv";
dotenv.config("./.env");

const config = {
    port: 3000,
    dbConfig: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Aniket12@540',
        database: process.env.DB_NAME  || 'url_shortner_db',
    },
};

export default config;
