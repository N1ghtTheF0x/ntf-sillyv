import { fetchCharacters, ICharacter } from "./api/character"
import { SillyVUser } from "./user"

export class SillyVCharacter
{
    public static async fetch(username: string)
    {
        return (await fetchCharacters(username)).map((char) => new this(char))
    }
    public constructor(public readonly raw: ICharacter)
    {
        
    }
    public getUser()
    {
        return SillyVUser.fetch(this.raw.username)
    }
}