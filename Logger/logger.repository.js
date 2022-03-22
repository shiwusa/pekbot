import {Log} from "../DB/models/index.js";
import Logger from "../controllers/logger.js";

class LoggerRepository {
    write(logObj) {
        const log = new Log(logObj);
        log.save()
            .catch(console.log);
    }

    getLogs (perPage, page) {
        return Log.find({})
            .select('text user_id chat_id message')
            .limit(perPage)
            .skip(perPage * (page - 1))
            .catch(Logger.error);
    }
}

export default new LoggerRepository();