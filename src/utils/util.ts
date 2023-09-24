import Cache from './Cache'

export function Res(obj: object) {
    return new Response(JSON.stringify(obj))
}

/**
 * Checks cache + Queries Mojang API for uuid
 * @param playerName Player name
 * @returns UUID string
 */
export async function getUUID(playerName: string) {
    if (Cache[playerName]) return Cache[playerName].uuid
    fetch(`https://api.mojang.com/users/profiles/minecraft/${playerName}`).then(async (finishedPromise) => {
        await finishedPromise.json().then((result) => {
            return result.uuid
        })
    })
}
