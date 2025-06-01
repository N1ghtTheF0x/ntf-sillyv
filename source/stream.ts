import { fetchStreams, IStream, IStreamsOptions } from "./api/stream"

export class SillyVStream
{
    public static async fetch(options: IStreamsOptions)
    {
        const streams: Array<SillyVStream> = []
        let nextToken = options.nextToken
        while(true)
        {
            const response = await fetchStreams({
                ...options,
                nextToken: nextToken
            })
            streams.push(...response.streams.map((stream) => new this(stream)))
            const token = response.meta.nextToken
            if(token === null)
                break
            nextToken = token
        }
        return streams
    }
    public constructor(public readonly raw: IStream)
    {

    }
}