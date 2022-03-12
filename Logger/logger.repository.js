import {Log} from "../DB/models/index.js";

class LoggerRepository {
    write(logObj) {
        const log = new Log(logObj);
        log.save()
            .catch(console.log);
    }
}

export default new LoggerRepository();