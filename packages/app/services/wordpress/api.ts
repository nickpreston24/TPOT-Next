import WPAPI from 'wpapi'

const config = {
    // endpoint: process.env.REACT_APP_WP_ENDPOINT,
    endpoint: "https://www.thepathoftruth.com/wp-json",
    // username: process.env.REACT_APP_WP_USERNAME,
    // password: process.env.REACT_APP_WP_PASSWORD,
}

// TODO: Temporary - Refactor this to be DB configurable:
export const wpapi = new WPAPI(config)