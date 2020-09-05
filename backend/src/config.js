module.exports = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FRONTEND_ENDPOINT: process.env.FRONTEND_ENDPOINT || "http://localhost:3000",
    ENDPOINT: process.env.ENDPOINT || "http://localhost:9000/api",
    DB_URL: process.env.DB_URL || "postgres://post:post@db/post",
    UPLOAD_DIRECTORY: "./uploads",
};
