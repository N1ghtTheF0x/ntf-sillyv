import { BASE_URL } from "./url"

export interface ICharacter
{
    id: string
    name: string
    description: string
    restrictions: string
    images: Array<string>
    username: string
    uploadDate: string
    isSelected: boolean
}

export type CharacterResponse = Array<ICharacter>

export async function fetchCharacters(username: string)
{
    const response = await fetch(`${BASE_URL}/Prod/characters?username=${username}`)
    return await response.json<CharacterResponse>()
}