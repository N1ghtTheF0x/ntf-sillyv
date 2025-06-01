import { IMessage } from "./message"
import { BASE_URL } from "./url"

export interface ILayoutAvatar
{
    url: string
    layout_id: string
    username: string
}

export interface ILayoutAvatarsResponse extends IMessage
{
    count: number
    items: Array<ILayoutAvatar>
}

export async function fetchLayoutAvatars(username?: string)
{
    let resource = `${BASE_URL}/Prod/layout-avatars`
    if(typeof username == "string")
        resource += `?username=${username}`
    const response = await fetch(resource)
    return await response.json<ILayoutAvatarsResponse>()
}