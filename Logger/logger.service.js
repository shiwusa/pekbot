import {LogTypes} from "./types/LogTypes.js";
import LoggerRepository from "./logger.repository.js";

class LoggerService {
    write(logObj) {
        const newLog = {
            ts: logObj.ts ? logObj.ts : Date.now(),
            type: logObj.type ? logObj.type : LogTypes.SYSTEM_ACTION,
            text: logObj.text ? logObj.text : `Unknown action`
        };
        LoggerRepository.write(newLog);
    }

    error(err) {
        const logObj = {
            ts: Date.now(),
            type: LogTypes.ERROR,
            text: JSON.stringify(err)
        }
        console.log(JSON.stringify(err));
        LoggerRepository.write(logObj);
    }
}

export default new LoggerService();