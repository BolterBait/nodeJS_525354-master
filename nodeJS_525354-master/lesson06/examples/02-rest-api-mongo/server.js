const mongoose = require("mongoose");
const { app } = require("./app");

const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", false);

const { HOST_URI } = process.env;

async function main() {
    try {
        await mongoose.connect(HOST_URI);
        console.log("connected to db");
        app.listen(3001, () => {
            console.log("server is running on port 3001");
        })
    } catch (error) {
        console.error("Main failed:", error.message);
    }
}
main();