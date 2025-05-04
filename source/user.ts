import { fetchCharacters } from "./api/character"
import { fetchDrawings, IDrawingsOptions } from "./api/drawing"
import { fetchLayoutAvatars } from "./api/layout"
import { fetchUser, fetchUsers, IUserResponse } from "./api/user"
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
    export type DrawingFetchOptions = Omit<SillyVDrawing.FetchOptions,"username">
    export type FanartFetchOptions = Omit<SillyVDrawing.FetchOptions,"username" | "tag">
}