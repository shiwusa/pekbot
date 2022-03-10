import mongoose from "mongoose";
import Logger from "../controllers/logger";

mongoose.Promise = global.Promise;

const DB_USER = "shiwusa";
const DB_PASSWORD = "shiwusa123";

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vxkvc.mongodb.net/pekbot?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on("error", async (err) => {
    Logger.add(`Connection error ${err}`);
});

mongoose.connection.on("open", () => {
    Logger.add("Connect to MongoDB.");
});
