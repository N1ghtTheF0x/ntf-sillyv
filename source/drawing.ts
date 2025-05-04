import { fetchDrawings, IDrawing, IDrawingsOptions } from "./api/drawing"
import { SillyVUser } from "./user"

export class SillyVDrawing
{
    public static async fetch(options: SillyVDrawing.FetchOptions)
    {
        const drawings: Array<SillyVDrawing> = []
        let nextToken: string | null = null
        while(true)
        {
            const response = await fetchDrawings({
                ...options,
                nextToken: nextToken ?? undefined
            })
            drawings.push(...response.drawings.map((drawing) => new this(drawing)))
            const token = response.meta.nextToken
            if(token === null)
                break
            nextToken = token
        }
        return drawings
    }
    public constructor(public readonly raw: IDrawing)
    {
        
    }
    public getUser()
    {
        return SillyVUser.fetch(this.raw.creator.name)
    }
}

export namespace SillyVDrawing
{
    export type FetchOptions = Omit<IDrawingsOptions,"nextToken">
}