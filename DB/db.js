import mongoose from "mongoose";
import Logger from "../controllers/logger.js";
import {DB_URI} from "../config.js";

mongoose.Promise = global.Promise;

mongoose.connect(DB_URI, { useNewUrlParser: true });

mongoose.connection.on("error", async (err) => {
    Logger.error(`Mongoose connection error ${err}`);
});

mongoose.connection.on("open", () => {
    Logger.add("Connect to MongoDB.");
});

mongoose.connection.on('disconnected', function () {
    Logger.add('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        Logger.add('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});