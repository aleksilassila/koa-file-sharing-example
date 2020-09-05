const bodyParser = require("koa-bodyparser");
const crypto = require("crypto");
const Koa = require("koa");
const multer = require("@koa/multer");
const cors = require("@koa/cors");
const path = require("path");
const Router = require("koa-router");

const database = require("./database");
const config = require("./config");
const files = require("./controllers/files");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.UPLOAD_DIRECTORY);
    },
    filename: (req, file, cb) => {
        const randomKey = crypto.randomBytes(32);
        cb(null, randomKey.toString("hex") + path.extname(file.originalname));
    },
});

const app = (module.exports = new Koa());
const router = new Router({ prefix: "/api" });
const upload = multer({
    storage,
    limits: {
        fileSize: 1.5e7, // Filesize 15MB
        parts: 30,
    },
});

// CORS
app.use(cors());

app.use(bodyParser());

router.get("/file/:name", files.get);

router.get("/upload/:filename", files.group);

router.post(
    "/upload-multiple",
    upload.array("files", 10),
    files.uploadMultiple
);

app.use(router.routes()).use(router.allowedMethods());
