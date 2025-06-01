import { AVATAR_URL } from "./url"

export type Avatars = Record<string,string>

export async function fetchAvatars()
{
    const response = await fetch(AVATAR_URL)
    return await response.json<Avatars>()
}