import WPAPI from 'wpapi'

const config = {
    // endpoint: process.env.NEXT_PUBLIC_WP_ENDPOINT,
    endpoint: "https://www.thepathoftruth.com/wp-json",
    // username: process.env.NEXT_PUBLIC_WP_USERNAME,
    // password: process.env.NEXT_PUBLIC_WP_PASSWORD,
}

// TODO: Temporary - Refactor this to be DB configurable:
export const wpapi = new WPAPI(config)