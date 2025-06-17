import dotenv from "dotenv";
dotenv.config("./.env");

const config = {
    port: 3000,
    dbConfig: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
};

export default config;
