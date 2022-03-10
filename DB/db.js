import mongoose from "mongoose";
import Logger from "../controllers/logger";
import {DB_URI} from "../config";

mongoose.Promise = global.Promise;

mongoose.connect(DB_URI, { useNewUrlParser: true });

mongoose.connection.on("error", async (err) => {
    Logger.add(`Connection error ${err}`);
});

mongoose.connection.on("open", () => {
    Logger.add("Connect to MongoDB.");
});
