const send = require("koa-send");

const config = require("../config");
const database = require("../database");

exports.group = async (ctx) => {
    const files = await database.File.findAll({
        where: {
            group: ctx.params.filename,
        },
    });

    if (files.length === 0) {
        ctx.status = 404;
    }

    ctx.body = files;
};

exports.get = async (ctx) => {
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    await send(ctx, ctx.params.name, {
        root: config.UPLOAD_DIRECTORY,
        immutable: true,
        maxage: oneWeekInMs,
    });
};

exports.uploadMultiple = async (ctx) => {
    if (!ctx.files || ctx.files.length === 0) {
        ctx.status = 400;
        return;
    }

    const group = ctx.files[0].filename;

    ctx.files.forEach(async (file, index) => {
        await database.File.create({
            name: file.originalname,
            comment:
                index === 0 && ctx.request.body.comment
                    ? ctx.request.body.comment
                    : null,
            path: file.filename,
            group,
        }).then(() => {
            console.log("Created file", file.originalname, file.filename);
        });
    });

    ctx.body = group;

    ctx.status = 200;
};
