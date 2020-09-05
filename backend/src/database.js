const { Sequelize, Op } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.DB_URL, {
    logging: false,
});

const File = (exports.File = sequelize.define("file", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    comment: {
        type: Sequelize.STRING,
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    group: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}));

exports.sync = (options) => sequelize.sync(options);
exports.Op = Op;
