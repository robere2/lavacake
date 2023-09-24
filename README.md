<div style="text-align:center">
    <img alt="Made for Bun" src="https://img.shields.io/badge/made%20for-bun-peru">
    <img alt="Apache 2.0 License" src="https://img.shields.io/badge/license-Apache_2.0-blue">
    <img alt="Star Count" src="https://img.shields.io/github/stars/NoahTheNerd/lavacake">
    <br/><br/>
    <img alt="Lavacake Logo" src="https://cdn.discordapp.com/attachments/1071274344019398748/1153760402799349760/lavacake.png" height="100">
    <br/>
    <b>Lavacake</b><br>
    <i>A freshly baked Hypixel webserver!</i>
</div>

## 🍰 Introduction
Lavacake is a drop in & use Hypixel API webserver, so you can rest easy knowing you have time to work on your Hypixel projects without spending time coding a pesky API.
- **It's fast!** Lavacake runs on Bun, making it lightning fast for users & developers alike.
- **It's clean!** Lavacake cleans up the Hypixel API, adding more wrapping & removing the [junk.](#-faq)
- **Very tasty!** Every instance of Lavacake is guaranteed to taste good. Make sure to enjoy!

Looking for something with a broken scrollwheel? Check these links out to quickly jump:

- [Installation Guide](#-installation)
- [Contributing](#-contributing)
- [FAQ](#-faq)

## 🗺️ Roadmap
| ? | Feature             |
|---|---------------------|
| ✅ | Network XP Wrapping |
| ✅ | Housing Wrapping    |
| ⌛ | Bed Wars Wrapping   |
| ⌛ | SkyWars Wrapping    |
| ⌛ | Pit Wrapping        |

## 📦 Installation

### With Docker

Docker is the easiest way to install and deploy Lavacake.

### Manual Installation

If you are not able to use Docker or plan on contributing to Lavacake, you can install manually.

#### Prerequisites

> ℹ️ Lavacake runs on the Bun runtime (it does not work with Node.js). Bun support for Windows is currently
> experimental. If you are on Windows, we recommend using WSL.

> ⚠️ Lavacake requires a reverse proxy such as NGINX in order to use IP-based rate limiting. The Docker container comes
> with NGINX pre-installed and configured. If you opt to not use a reverse proxy, you MUST keep rate limiting disabled.

##### 1. Install Bun

[Bun](https://bun.sh/) provides an install script which you can run for MacOS and Linux:

```bash
curl -fsSL https://bun.sh/install | bash
```

Alternative installation methods are outlined in their [documentation](https://bun.sh/docs/installation).

##### 2. Download Lavacake

Official releases of Lavacake can be downloaded from the 
[releases page](https://github.com/NoahTheNerd/lavacake/releases). Extract your download and change directories to the
one that contains the `package.json` file.

Alternatively, clone this Git repository locally:

```bash
git clone https://github.com/NoahTheNerd/lavacake.git
cd lavacake
```

##### 3. Install Dependencies

Run the following command to install project dependencies from NPM:

```bash
bun install
```

##### 4. Provide your API key

Your Hypixel API key needs to be stored in the `API_TOKEN` environment variable. The easiest way to do this is to create
a `.env` file in the root of your clone. For example:

```dotenv
API_TOKEN=aabe94fb-6250-4f0e-bc99-8787ef741b6c
```

##### 5. Configure Lavacake (Optional)

Lavacake generally requires no additional configuration, but has a slew of options in case they are needed for your 
use-case. Check out the [Configuration](#-configuration) section for more information.

##### 6. Start Lavacake

Lavacake can be started with the `start` script:

```bash
bun start
```

You may wish to install a process manager such as [PM2](https://www.npmjs.com/package/pm2) to manage your Lavacake
server and restart it in the event of any crashes. PM2 supports directly passing environment variables to your process,
which is safer than using a `.env` file. If you are using PM2, consider passing the environment variables directly.
Check the [PM2 documentation](https://pm2.io/docs/runtime/best-practices/environment-variables/) for more information.

## ⚙️ Configuration

Lavacake requires a Hypixel API key to function properly. You can get your API key on the 
[Hypixel Developer Dashboard](https://developer.hypixel.net/dashboard) by creating a new "app". Once you have an API 
key, provide it to Lavacake in the environment variable `API_TOKEN`. If your app has not yet been approved, you can use
your developer token temporarily. Developer tokens reset every three days.

Lavacake takes a number of additional configuration options. Options can be configured either through a `config.json` 
file or environment variables. Your `config.json` file should be formatted with individual options at the top-level of 
the object:

```json
{
  "port": 9753,
  "hostname": "localhost"
}
```

If you aren't able to provide a `config.json`, or would simply prefer to use environment variables, Lavacake will
attempt to load a config from the environment variables if a `config.json` file is not present. Configuration option
names are the same, but formatted in `CAPS_SNAKE_CASE`. Environment variables are recommended when using Docker.

Check the table below for a full list of options.

| JSON Name          | Env Variable Name    | Description                                                                                                                                                                             | Default       |
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `port`             | `PORT`               | Port to run the Lavacake HTTP server on.                                                                                                                                                | `9753`        |
| `hostname`         | `HOSTNAME`           | Hostname to bind the HTTP server to.                                                                                                                                                    | `"localhost"` |
| `tlsEnabled`       | `TLS_ENABLED`        | Boolean flag whether TLS/SSL should be enabled and Lavacake served over HTTPS.                                                                                                          | `false`       |
| `tlsCertPath`      | `TLS_CERT_PATH`      | Relative or absolute path to the SSL certificate PEM file for HTTPS. Ignored if TLS is disabled.                                                                                        | `undefined`   |
| `tlsKeyPath`       | `TLS_KEY_PATH`       | Relative or absolute path to the SSL private key PEM file for HTTPS. Ignored if TLS is disabled.                                                                                        | `undefined`   |
| `tlsPassphrase`    | `TLS_PASSPHRASE`     | Passphrase to use to decrypt the SSL private key, if set.                                                                                                                               | `undefined`   |
| `rateLimitEnabled` | `RATE_LIMIT_ENABLED` | Boolean flag whether rate limiting clients is enabled. Rate limiting is based on IP address, which means you should only use this option if Lavacake is running behind a reverse proxy. | `false`       |
| `rateLimitCap`     | `RATE_LIMIT_CAP`     | The maximum number of requests a single client can send within the configured timespan.                                                                                                 | `10`          |
| `rateLimitExpires` | `RATE_LIMIT_EXPIRES` | The amount of time in seconds before a request no longer contributes towards the rate limit.                                                                                            | `10`          |

## 💖 Contributing
Contributing is simple, make a fork & merge it when you're done. We do request you to please run `bun run pretty` to format your code to be in line with our style guidelines.

- [Open a pull request](https://github.com/NoahTheNerd/lavacake/pulls)
- [Make a fork](https://github.com/NoahTheNerd/lavacake/fork)

## ❓ FAQ
- What "junk" is being removed by Lavacake?
    - At the minute, we're looking at only implementing core statistics for games & wrapping what's most used (e.g. levels & coins). It might seem generic to say junk, but not enough people will be checking the Mega SkyWars Quit Count for it to be wrapped. If there's anything missing that you would like included in Lavacake you can open an [issue](https://github.com/NoahTheNerd/lavacake/issues) at our issues page.
- How do I access the raw, unwrapped API data?
    - Just put "raw" before an endpoint name, e.g. player -> rawPlayer (camelCase)
