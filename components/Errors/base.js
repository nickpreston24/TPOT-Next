/** Base Extendable Error */
export default class ExtendableError extends Error {
    constructor(message = '', ...rest) {
        super(message, ...rest); // Rest is optional...I think.  SRC: https://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax-babel, https://javascript.info/custom-errors
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}
