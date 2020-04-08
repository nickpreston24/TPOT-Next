const AsyncObject = require('@cuties/cutie').AsyncObject
const fs = require('fs')

// Represents file as path
class WrittenFile extends AsyncObject {
    constructor(path, content) { super(path, content) }

    asyncCall() {
        return (path, content, callback) => {
            this.path = path
            fs.writeFile(path, content, callback)
        }
    }

    onResult() {
        return this.path
    }
}

class ReadDataByPath extends AsyncObject {

    constructor(path, encoding) { super(path, encoding); }

    asyncCall = () => fs.readFile
}