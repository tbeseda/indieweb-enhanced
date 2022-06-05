import { list } from '@architect/shared/notes.mjs'
import render from '@architect/views/index.mjs'

/** note; we are using a plugin for multiValueheaders */
export async function handler (req) {
  let data = await list()
  let meta = `<https://${process.env.DOMAIN}/meta>; rel="indieauth-metadata"`
  let auth = `<https://${process.env.DOMAIN}/auth>; rel="authorization_endpoint"`
  let token = `<https://${process.env.DOMAIN}/token>; rel="token_endpoint"`
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    multiValueHeaders: {
      'Link': [meta, auth, token]
    },
    body: render(data)
  }
}
