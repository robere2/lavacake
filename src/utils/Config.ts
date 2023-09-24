export class Config {
    protected _port: number
    protected _rateLimitEnabled: boolean
    protected _rateLimitExpires: number
    protected _rateLimitCap: number

    constructor() {
        this._port = 9753
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
        config._port = json.port
        config._rateLimitEnabled = json.rateLimitEnabled
        config._rateLimitExpires = json.rateLimitExpires
        config._rateLimitCap = json.rateLimitCap

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
        config._port = Number(process.env.PORT) || 9753
        config._rateLimitEnabled = process.env.RATE_LIMIT_ENABLED == 'true'
        config._rateLimitExpires = Number(process.env.RATE_LIMIT_EXPIRES) || 10
        config._rateLimitCap = Number(process.env.RATE_LIMIT_CAP) || 10

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

    public get port(): number {
        return this._port
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
