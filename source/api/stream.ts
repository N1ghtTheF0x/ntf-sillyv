import { IMetaResponse, IToken } from "./meta"
import { ActiveDay } from "./time"
import { BASE_URL } from "./url"

export interface IStream
{
    id: string
    streamDate: ActiveDay
    startTime: number
    endTime: number
    drawingCount: number
    participants: number
    isSaturday: boolean
    tags: Array<string>
    createdAt: number
    updatedAt: number
}

export interface IStreamResponse extends IMetaResponse
{
    streams: Array<IStream>
}

export interface IStreamsOptions extends IToken
{
    limit: number
}

export async function fetchStreams(options: IStreamsOptions)
{
    const params: Array<string> = []
    params.push(`limit=${options.limit}`)
    if(typeof options.nextToken == "string")
        params.push(`nextToken=${options.nextToken}`)
    const urlsp = `?${params.join("&")}`
    const response = await fetch(`${BASE_URL}/Prod/streams${urlsp}`)
    return await response.json<IStreamResponse>()
}