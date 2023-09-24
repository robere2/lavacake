const token = process.env.API_TOKEN ?? ''
const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
if (!token || !uuidv4Regex.test(token)) {
    throw new Error('Invalid Hypixel API token. Please get a token from https://developer.hypixel.net/ and set it to your API_TOKEN environment variable. Check the README for more information.')
}

function get(endpoint: string) {
    return fetch(`https://api.hypixel.net` + endpoint, {
        method: 'GET',
        headers: { 'API-Key': token },
    })
}
export default { get }
