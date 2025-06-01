import { fetchAvatars } from "./api/avatar"
import { fetchCharacters } from "./api/character"
import { fetchDrawings, IDrawingsOptions } from "./api/drawing"
import { fetchLayoutAvatars } from "./api/layout"
import { fetchTopList, fetchUser, fetchUsers, IUserResponse, IUserTopListResponse } from "./api/user"
import { SillyVCharacter } from "./character"
import { SillyVDrawing } from "./drawing"
import { SillyVLayoutAvatar } from "./layout"

export class SillyVUser
{
    public get username()
    {
        return this.raw.username ?? this.raw.PK
    }
    public static async fetch(username: string)
    {
        return new this(await fetchUser(username))
    }
    public static async fetchByFirstLetter(firstLetter: string)
    {
        return (await fetchUsers(firstLetter)).map((user) => new this(user))
    }
    public constructor(public readonly raw: IUserResponse)
    {

    }
    public getCharacters()
    {
        return SillyVCharacter.fetch(this.username)
    }
    public getLayoutAvatars()
    {
        return SillyVLayoutAvatar.fetch(this.username)
    }
    public async getAvatarUrl()
    {
        const avatars = await fetchAvatars()
        return avatars[this.username] as string | undefined
    }
    public getDrawings(options: SillyVUser.DrawingFetchOptions)
    {
        return SillyVDrawing.fetch({
            ...options,
            username: this.username
        })
    }
    public getFanart(options: SillyVUser.FanartFetchOptions)
    {
        return SillyVDrawing.fetch({
            ...options,
            tag: this.username
        })
    }
}

export namespace SillyVUser
{
    export class TopList
    {
        public static async fetch()
        {
            return new this(await fetchTopList())
        }
        public readonly monthly: Array<SillyVUser>
        public readonly allTime: Array<SillyVUser>
        public constructor(public readonly raw: IUserTopListResponse)
        {
            this.monthly = raw.topMonthlyArtists.map((user) => new SillyVUser(user))
            this.allTime = raw.topAllTimeArtists.map((user) => new SillyVUser(user))
        }
    }
    export type DrawingFetchOptions = Omit<IDrawingsOptions,"username">
    export type FanartFetchOptions = Omit<IDrawingsOptions,"username" | "tag">
}