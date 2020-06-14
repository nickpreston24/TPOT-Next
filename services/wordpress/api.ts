import WPAPI from 'wpapi'

// TODO: Temporary - Refactor this to be DB configurable:
export const wpapi = new WPAPI({
    endpoint: 'https://www.thepathoftruth.com/wp-json',
    username: 'michael.n.preston@gmail.com',
    password: 'Mercury2020!!' //TODO: init w/ process.env or firebase
})