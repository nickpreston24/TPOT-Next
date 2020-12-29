const diff = require('diff')

function difference(one, two) {
    return diff.diffChars(one, two)
}

module.exports = {
    difference
}