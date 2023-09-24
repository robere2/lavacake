import hypixelApi from '../../../utils/hypixelApi'
import { Res } from '../../../utils/util.ts'

// cacheless
export default {
    path: '/rawCounts',
    params: [],
    async run(req: Request, params: URLSearchParams) {
        const APIPromise = await hypixelApi.get(`/counts`)
        const HypixelData = await APIPromise.json()

        return Res(HypixelData)
    },
}
