export interface Endpoint {
    params?: Array<string>
    oneOf?: Array<string>
    path: string
    run(req: Request, params: URLSearchParams): any
}
