// It is fake for logger. Should be removed in future release.
export default class Logger {
  info(error) {
    console.info(error.message);
  }

  warn(error) {
    console.warn(error.message);
  }

  error(error) {
    console.error(error.message);
  }

  static getInstance() {
    return new Logger();
  }
}
