declare function fetch(resource: string,options?: IFetchOptions): Promise<IFetchResponse>

declare type TypedArray = Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | BigUint64Array | BigInt64Array | Float16Array | Float32Array | Float64Array

declare interface IFetchOptions
{
    attributionReporting?: IFetchOptions.IAttributeReporting
    body?: string | ArrayBuffer | DataView | Uint8Array | TypedArray
    browsingTopics?: boolean
    cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached"
    credentials?: "omit" | "same-origin" | "include"
    headers: Record<string,any>
    integrity?: string
    keepalive?: boolean
    method?: string
    mode?: "same-origin" | "cors" | "no-cors" | "navigate"
    priority?: "high" | "low" | "auto"
    redirect?: "follow" | "error" | "manual"
    referrer?: string
    referrerPolicy?: "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"
}
declare interface IHeaders
{

}

declare namespace IFetchOptions
{
    export interface IAttributeReporting
    {
        eventSourceEligible: boolean
        triggerEligible: boolean
    }
}

declare interface IFetchResponse
{
    readonly headers: IHeaders
    readonly body: any
    readonly ok: boolean
    readonly redirected: boolean
    readonly status: number
    readonly statusText: string
    readonly type: "basic" | "cors" | "error" | "opaque" | "opaqueredirect"
    arrayBuffer(): Promise<ArrayBuffer>
    blob(): Promise<any>
    bytes(): Promise<Uint8Array>
    clone(): IFetchResponse
    formData(): Promise<any>
    json<T>(): Promise<T>
    text(): Promise<string>
}