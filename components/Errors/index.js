import ExtendableError from './base'

/** The following are custom Exceptions/Errors for throwing in Scribe */

/** Messages */
const EditorStateNotFoundMessage = "Editor state must be provided!"
const NullReferenceMessage = "Value cannot be null or undefined!"
const ArgumentNullReferenceMessage = argName => `${argName || "Argument"} cannot be null or undefined!`

/**Custom Errors */
export class EditorStateNotFoundError extends ExtendableError { constructor() { super(EditorStateNotFoundMessage) } }
export class NullReferenceError extends ExtendableError { constructor() { super(NullReferenceMessage) } }
export class ArgumentNullReferenceError extends ExtendableError { constructor(argname = null) { super(ArgumentNullReferenceMessage(argname)) } }

