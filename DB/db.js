import mongoose from "mongoose";
import TextLogger from "../controllers/logger.js";
import {DB_URI} from "../config.js";

mongoose.Promise = global.Promise;

mongoose.connect(DB_URI, { useNewUrlParser: true });

mongoose.connection.on("error", async (err) => {
    TextLogger.error(`Mongoose connection error ${err}`);
    process.exit(0);
});

mongoose.connection.on("open", () => {
    TextLogger.add("Connect to MongoDB.");
});

mongoose.connection.on('disconnected', function () {
    TextLogger.add('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        TextLogger.add('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});