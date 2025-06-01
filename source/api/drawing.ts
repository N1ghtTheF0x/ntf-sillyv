import { IMetaResponse, IToken } from "./meta"
import { ActiveDay } from "./time"
import { BASE_URL } from "./url"

export interface IDrawing
{
    id: string
    title: string
    imageUrl: string
    createdAt: ActiveDay
    nsfw: boolean
    tags: Array<string>
    description: string
    creator: IDrawing.ICreator
}

export namespace IDrawing
{
    export interface ICreator
    {
        name: string
        id: string
        avatarUrl: string
    }
}

export interface IDrawingsResponse extends IMetaResponse
{
    drawings: Array<IDrawing>
}

export interface IDrawingsOptions extends IToken
{
    username?: string
    showNsfw?: boolean
    startDate?: ActiveDay
    endDate?: ActiveDay
    sortBy: "newest" | "oldest" | "popular"
    limit: number
    tag?: string
}

export async function fetchDrawings(options: IDrawingsOptions)
{
    const params: Array<string> = []
    if(typeof options.tag == "string")
        params.push(`tag=${options.tag}`)
    if(typeof options.username == "string")
        params.push(`username=${options.username}`)
    if(typeof options.showNsfw == "string")
        params.push(`showNsfw=${options.showNsfw}`)
    if(typeof options.startDate == "string")
        params.push(`startDate=${options.startDate}`)
    if(typeof options.endDate == "string")
        params.push(`endDate=${options.endDate}`)
    params.push(`sortBy=${options.sortBy}`,`limit=${options.limit}`)
    if(typeof options.nextToken == "string")
        params.push(`nextToken=${options.nextToken}`)
    const urlsp = `?${params.join("&")}`
    const response = await fetch(`${BASE_URL}/Prod/drawings${urlsp}`)
    return await response.json<IDrawingsResponse>()
}