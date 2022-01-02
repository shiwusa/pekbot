const mongoose = require('mongoose');
const Logger = require('../controllers/logger');

mongoose.Promise = global.Promise;
const DB_USER = "shiwusa";
const DB_PASSWORD = "shiwusa123";

//mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds054128.mlab.com:54128/pokerbot`, { useNewUrlParser: true });
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vxkvc.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });


mongoose.connection.on('error', async (err) => {
    Logger.add(`Connection error ${err}`);
});

mongoose.connection.on('open', () => {
    Logger.add('Connect to MongoDB.');
});
