# image-proxy
Proxy images requiring headers with JavaScript.

## Usage
1. Clone via `git clone https://github.com/Eltik/image-proxy`.
2. Run `npm i` or `yarn install`.
3. Run `npm run build`.
4. Add `PORT` to your `.env` file (see `.env.example`).
5. Run `npm run start`.

After you setup the proxy, to proxy images just use `https://<PROXY_URL_HERE>/image-proxy?url=<encoded_url_here_>&headers=<stringified_and_encoded_headers_here>`. For example:
```javascript
const image = `http://localhost:3000/image-proxy?url=${encodeURIComponent("https://scans-ongoing-1.lastation.us/manga/Kubo-san-wa-Boku-Mobu-wo-Yurusanai/0144-019.png")}&headers=${encodeURIComponent(JSON.stringify({ Referer: "https://mangasee123.com" }))}`;

// Output: http://localhost:3061/image-proxy?url=https%3A%2F%2Fscans-ongoing-1.lastation.us%2Fmanga%2FKubo-san-wa-Boku-Mobu-wo-Yurusanai%2F0144-019.png&headers=%7B%22Referer%22%3A%22https%3A%2F%2Fmangasee123.com%22%7D
```
Then on your website, the images should appear normally.