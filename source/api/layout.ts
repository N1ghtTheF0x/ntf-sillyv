import { BASE_URL } from "./url"

export interface ILayoutAvatar
{
    url: string
    layout_id: string
    username: string
}

export interface ILayoutAvatarsResponse
{
    message: string
    count: number
    items: Array<ILayoutAvatar>
}

export async function fetchLayoutAvatars(username: string)
{
    const response = await fetch(`${BASE_URL}/Prod/layout-avatars?username=${username}`)
    return await response.json<ILayoutAvatarsResponse>()
}