// It is fake for logger. Should be removed in future release.
export default class Logger {

    info(message) {
        console.info(message);
    }

    warn(message) {
        console.warn(message);
    }

    error(message) {
        console.error(message);
    }

    static getInstance() {
        return new Logger();
    }

}