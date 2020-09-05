const database = require("./src/database");
const app = require("./src/app");

const port = process.env.PORT || 9000;

database.sync().then(() => {
    app.listen(port);
    console.log(`App listening on port ${port}`);
});
