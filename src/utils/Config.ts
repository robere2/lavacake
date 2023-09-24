export class Config {
    protected _hostname: string
    protected _port: number
    protected _tlsEnabled: boolean
    protected _tlsCertPath?: string
    protected _tlsKeyPath?: string
    protected _tlsPassphrase?: string
    protected _rateLimitEnabled: boolean
    protected _rateLimitExpires: number
    protected _rateLimitCap: number

    constructor() {
        this._hostname = 'localhost'
        this._port = 9753
        this._tlsEnabled = false
        this._rateLimitEnabled = false
        this._rateLimitExpires = 10
        this._rateLimitCap = 10
    }

    /**
     * Load the config from a file, or from environment variables if the file does not exist.
     * @param path Path of the file to load the config from. Defaults to 'config.json'.
     * @throws Error if a nullish config path is provided.
     * @throws Error if the config file exists but cannot be parsed as JSON.
     * @returns Config An instance of Config with values loaded from the file or the environment variables.
     */
    public static async load(path = 'config.json'): Promise<Config> {
        if (!path) throw new Error('No config path provided')
        if (await Bun.file(path).exists()) {
            return Config.loadFile(path)
        } else {
            return Config.loadEnvironmentVariables()
        }
    }

    /**
     * Load the config from a file. Config values that are not present in the file will be set to their default values.
     *  Values which are present in the file but not used by the Config class will be ignored.
     * @param path Path of the file to load the config from. Defaults to 'config.json'.
     * @throws Error if a nullish config path is provided.
     * @throws Error if the config file exists but cannot be parsed as JSON.
     * @returns Config An instance of Config with values loaded from the file.
     */
    public static async loadFile(path = 'config.json'): Promise<Config> {
        if (!path) {
            throw new Error('No config path provided')
        }
        const json = await Bun.file(path).json()

        const config = new Config()
        config._hostname = json.hostname ?? config._hostname
        config._port = json.port ?? config._port
        config._tlsEnabled = json.tlsEnabled ?? config._tlsEnabled
        config._tlsCertPath = json.tlsCertPath ?? config._tlsCertPath
        config._tlsKeyPath = json.tlsKeyPath ?? config._tlsKeyPath
        config._tlsPassphrase = json.tlsPassphrase ?? config._tlsPassphrase
        config._rateLimitEnabled = json.rateLimitEnabled ?? config._rateLimitEnabled
        config._rateLimitExpires = json.rateLimitExpires ?? config._rateLimitExpires
        config._rateLimitCap = json.rateLimitCap ?? config._rateLimitCap

        return config
    }

    /**
     * Load the config from environment variables. Config values that are not present in the environment will be set to
     *  their default values. Environment variable names are equivalent to the config property names, but in
     *  UPPER_SNAKE_CASE (e.g. rateLimitEnabled -> RATE_LIMIT_ENABLED).
     * @returns Config An instance of Config with values loaded from environment variables.
     */
    public static async loadEnvironmentVariables(): Promise<Config> {
        const config = new Config()
        config._hostname = process.env.HOSTNAME ?? config._hostname
        config._port = process.env.PORT ? Number(process.env.PORT) : config._port
        config._tlsEnabled = process.env.TLS_ENABLED ? process.env.TLS_ENABLED === 'true' : config._tlsEnabled
        config._tlsCertPath = process.env.TLS_CERT_PATH ? process.env.TLS_CERT_PATH : config._tlsCertPath
        config._tlsKeyPath = process.env.TLS_KEY_PATH ? process.env.TLS_KEY_PATH : config._tlsKeyPath
        config._tlsPassphrase = process.env.TLS_PASSPHRASE ? process.env.TLS_PASSPHRASE : config._tlsPassphrase
        config._rateLimitEnabled = process.env.RATE_LIMIT_ENABLED ? process.env.RATE_LIMIT_ENABLED === 'true' : config._rateLimitEnabled
        config._rateLimitExpires = process.env.RATE_LIMIT_EXPIRES ? Number(process.env.RATE_LIMIT_EXPIRES) : config._rateLimitExpires
        config._rateLimitCap = process.env.RATE_LIMIT_CAP ? Number(process.env.RATE_LIMIT_CAP) : config._rateLimitCap

        return config
    }

    /**
     * Save the config to a file in JSON.
     * @param path Path of the file to save the config to. Defaults to 'config.json'.
     * @throws Error if a nullish config path is provided.
     */
    public async save(path = 'config.json'): Promise<void> {
        if (!path) {
            throw new Error('No config path provided')
        }

        // We need to go over the config properties and remove the prefix underscore from their names, as the config
        //  file does not use the underscore prefix.
        const newObject: Record<string, any> = {}
        for (const key in this) {
            if (key.startsWith('_') && Object.prototype.hasOwnProperty.call(this, key)) {
                const value = this[key]
                const newKey = key.replace('_', '')
                newObject[newKey] = value
            }
        }

        await Bun.write(path, JSON.stringify(newObject))
    }

    public get hostname(): string {
        return this._hostname
    }

    public get port(): number {
        return this._port
    }

    public get tlsEnabled(): boolean {
        return this._tlsEnabled
    }

    public get tlsCertPath(): string | undefined {
        return this._tlsCertPath
    }

    public get tlsKeyPath(): string | undefined {
        return this._tlsKeyPath
    }

    public get tlsPassphrase(): string | undefined {
        return this._tlsPassphrase
    }

    public get rateLimitEnabled(): boolean {
        return this._rateLimitEnabled
    }

    public get rateLimitExpires(): number {
        return this._rateLimitExpires
    }

    public get rateLimitCap(): number {
        return this._rateLimitCap
    }

    public set rateLimitEnabled(value: boolean) {
        this._rateLimitEnabled = value
    }

    public set rateLimitExpires(value: number) {
        this._rateLimitExpires = value
    }

    public set rateLimitCap(value: number) {
        this._rateLimitCap = value
    }
}
