import { fetchDrawings, IDrawing, IDrawingsOptions } from "./api/drawing"
import { SillyVUser } from "./user"

export class SillyVDrawing
{
    public static async fetch(options: IDrawingsOptions)
    {
        const drawings: Array<SillyVDrawing> = []
        let nextToken = options.nextToken
        while(true)
        {
            const response = await fetchDrawings({
                ...options,
                nextToken: nextToken
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