import { BASE_URL } from "./url"
import { IUserResponse } from "./user"

export interface IDrawing
{
    id: string
    title: string
    imageUrl: string
    createdAt: IUserResponse.ActiveDay
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

export interface IDrawingsResponse
{
    drawings: Array<IDrawing>
    meta: IDrawingsResponse.IMeta
}

export namespace IDrawingsResponse
{
    export interface IMeta
    {
        count: number
        nextToken: string | null
        hasMore: boolean
    }
}

export interface IDrawingsOptions
{
    username?: string
    showNsfw: boolean
    startDate?: IUserResponse.ActiveDay
    endDate?: IUserResponse.ActiveDay
    sortBy: "newest" | "oldest" | "popular"
    limit: number
    nextToken?: string
    tag?: string
}

export async function fetchDrawings(options: IDrawingsOptions)
{
    const params: Array<string> = []
    if(typeof options.tag == "string")
        params.push(`tag=${options.tag}`)
    if(typeof options.username == "string")
        params.push(`username=${options.username}`)
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