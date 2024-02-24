const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",
    fgGray: "\x1b[90m",
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",
    bgGray: "\x1b[100m"
};

const log = msg => {
    console.log(`${colors.bgCyan}${colors.bright}[LOG]${colors.reset} ${msg}`);
};

const success = msg => {
    console.log(`${colors.bgGreen}${colors.bright}[SUCCESS]${colors.reset} ${msg}`);
};

const warning = msg => {
    console.log(`${colors.bgYellow}${colors.bright}[WARNING]${colors.reset} ${msg}`);
};

const danger = msg => {
    console.log(`${colors.bgRed}${colors.bright}[DANGER]${colors.reset} ${msg}`);
};

module.exports = { log, success, warning, danger, colors };
