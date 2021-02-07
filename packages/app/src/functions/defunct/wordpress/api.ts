import WPAPI from 'wpapi'

const config = {
  endpoint: 'https://www.thepathoftruth.com/wp-json',
}
export const wpapi = new WPAPI(config)
