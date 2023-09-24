import { Endpoint } from './types/endpoint.ts'
import { endpoints } from './routes'
import { Config } from './utils/Config.ts'
import { Res } from './utils/util.ts'

const rateLimits: Record<string, number> = {} // Track User Ratelimits

const config = await Config.load()

// TLS enables HTTPS and can be configured in the config
let tlsSettings = undefined
if (config.tlsEnabled) {
    if (!config.tlsCertPath || !config.tlsKeyPath) {
        throw new Error('When TLS is enabled, both a certificate path and private key path need to be provided in ' + 'the config.')
    }
    tlsSettings = {
        cert: Bun.file(config.tlsCertPath),
        key: Bun.file(config.tlsKeyPath),
        passphrase: config.tlsPassphrase,
    }
}

Bun.serve({
    port: config.port,
    tls: tlsSettings,
    fetch(req) {
        // Check if ratelimited
        const consumerIP = req.headers.get('x-forwarded-for') || '0.0.0.0' // Fallback to prevnet TS annotation freakout
        if (config.rateLimitEnabled) {
            if (!consumerIP) {
                throw new Error('x-forwarded-for header is required but not provided. Disable userRatelimit in config.json to solve this.')
            }
            if (rateLimits[consumerIP] >= config.rateLimitCap) return Res({ success: false, code: 429, error: 'You are being ratelimited' })
        }

        // Format data
        const reqUrl = new URL(req.url)
        const EndpointData: Endpoint = endpoints[reqUrl.pathname.replace('/', '') || 'root']

        // Check for valid arguments
        if (!EndpointData) return Res({ success: false, code: 404, error: 'Not found' })
        if (EndpointData.params?.length && !EndpointData.params.every((key) => reqUrl.searchParams.has(key))) return Res({ success: false, code: 400, error: 'Missing parameters', required: EndpointData.params })
        if (EndpointData.oneOf?.length && !EndpointData.oneOf.some((key) => reqUrl.searchParams.has(key))) return Res({ success: false, code: 400, error: 'Specify one of these parameters', oneOf: EndpointData.oneOf })

        // Manage ratelimit addition
        if (config.rateLimitEnabled) {
            if (!rateLimits[consumerIP]) rateLimits[consumerIP] = 0
            rateLimits[consumerIP]++
            setTimeout(() => {
                rateLimits[consumerIP] -= 1
            }, config.rateLimitExpires * 1000)
        }

        // Run endpoint code
        return EndpointData.run(req, reqUrl.searchParams)
    },
})

const url = `${config.tlsEnabled ? 'https://' : 'http://'}${config.hostname}:${config.port}/`
console.log(`🚀 Lavacake server running at ${url}`)
