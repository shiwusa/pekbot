import fs from "fs";

class Logger {
    constructor() {
        if (!Logger.instance) {
            this.logs = [];
            this.filepath = "./logs/logs.txt";
            this.add = this.add.bind(this);
            this.toFile = this.toFile.bind(this);
            Logger.instance = this;
            this.add(`Start writing logs to ${this.filepath}`);
        }
        return Logger.instance;
    }

    add(text) {
        const date = new Date();
        const logDate = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}]`;
        const log = `${text}`;
        this.logs.push(log);
        if (!fs.existsSync("./logs")) {
            fs.mkdirSync("logs");
        }
        fs.appendFileSync(this.filepath, `${logDate} ${text}\n`);
        console.log(`\x1b[34m${logDate} \x1b[33m${text}\x1b[0m`);
    }

    error(error) {
        const text = error.message ? error.message : error;
        this.add(`Error! Error text:\n${text}`);
    }

    toFile(filepath) {
        this.filepath = filepath;
    }
}

export default new Logger();
