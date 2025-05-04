import { fetchLayoutAvatars, ILayoutAvatar } from "./api/layout"
import { SillyVUser } from "./user"

export class SillyVLayoutAvatar
{
    public static async fetch(username: string)
    {
        return (await fetchLayoutAvatars(username)).items.map((layout) => new this(layout))
    }
    public constructor(public readonly raw: ILayoutAvatar)
    {
        
    }
    public getUser()
    {
        return SillyVUser.fetch(this.raw.username)
    }
}