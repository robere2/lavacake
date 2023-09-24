import hypixelApi from '../../../utils/hypixelApi'
import { Res } from '../../../utils/util.ts'

// cacheless
export default {
    path: '/rawVanityCompanions',
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/resources/vanity/companions`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
