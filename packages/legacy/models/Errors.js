/** Base Extendable Error */
export default class ExtendableError extends Error {
    constructor(message = '', ...rest) {
        // super(message, ...rest) // Rest is optional...I think.  SRC: https://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax-babel, https://javascript.info/custom-errors
        super(message)
        this.name = this.constructor.name

        if (typeof Error.captureStackTrace === 'function')
            Error.captureStackTrace(this, this.constructor)
        else
            this.stack = (new Error(message)).stack
    }
}

/** The following are custom Exceptions/Errors for throwing in Scribe */

/** Messages */
const EditorStateNotFoundMessage = 'Editor state must be provided!'
const NullReferenceMessage = 'Value cannot be null or undefined!'
const ArgumentNullReferenceMessage = argName => `${argName || 'Argument'} cannot be null or undefined!`

/**Custom Errors */
export class EditorStateNotFoundError extends ExtendableError { constructor() { super(EditorStateNotFoundMessage) } }
export class NullReferenceError extends ExtendableError { constructor() { super(NullReferenceMessage) } }
export class ArgumentNullReferenceError extends ExtendableError { constructor(argname = null) { super(ArgumentNullReferenceMessage(argname)) } }
export default ExtendableError

