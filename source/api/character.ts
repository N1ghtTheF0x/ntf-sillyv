import { IMessage } from "./message"
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

export interface ISelectedCharacterResponse extends IMessage
{
    selectedCharacter: string
}

export async function selectCharacter(authToken: string,id: string)
{
    const payload = JSON.stringify({
        characterId: id
    })
    const response = await fetch(`${BASE_URL}/Prod/characters/select`,{
        method: "POST",
        body: payload,
        headers: {
            "Content-Type": "application/json",
            "Content-Length": payload.length,
            "Authorization": `Bearer ${authToken}`
        }
    })
    return await response.json<IMessage | ISelectedCharacterResponse>()
}

export interface ICreateCharacterPayload
{
    description: string
    imageUrls: Array<string>
    name: string
    restrictions: string
}

export interface ICreatedCharacterResponse
{
    characterId: string
    name: string
    description: string
    restrictions: string
    imageUrls: Array<string>
    username: string
    createdDate: number
}

export async function createCharacter(authToken: string,payload: ICreateCharacterPayload)
{
    const body = JSON.stringify(payload)
    const response = await fetch(`${BASE_URL}/Prod/characters`,{
        method: "POST",
        body: body,
        headers: {
            "Content-Type": "application/json",
            "Content-Length": body.length,
            "Authorization": `Bearer ${authToken}`
        }
    })
    return await response.json<ICreatedCharacterResponse | IMessage>()
}

export interface IUploadImagePayload
{
    base64Data: string
    contentType: string
    filename: string
}

export interface IUploadedImageResponse extends IMessage
{
    publicUrl: string
    imageUrls: Array<string>
}

export async function uploadCharacterImage(authToken: string,id: string,payload: IUploadImagePayload)
{
    const body = JSON.stringify(payload)
    const response = await fetch(`${BASE_URL}/Prod/characters/${id}/image-upload-url`,{
        method: "POST",
        body: body,
        headers: {
            "Content-Type": "application/json",
            "Content-Length": body.length,
            "Authorization": `Bearer ${authToken}`
        }
    })
    return await response.json<IMessage | IUploadedImageResponse>()
}

export interface IDeletedImageResponse extends IMessage
{
    imageUrl: string
    remainingImages: Array<string>
}

export async function deleteCharacterImage(authToken: string,id: string,image: string)
{
    const payload = JSON.stringify({
        imageUrl: image
    })
    const response = await fetch(`${BASE_URL}/Prod/characters/${id}/images`,{
        method: "DELETE",
        body: payload,
        headers: {
            "Content-Type": "application/json",
            "Content-Length": payload.length,
            "Authorization": `Bearer ${authToken}`
        }
    })
    return await response.json<IMessage | IDeletedImageResponse>()
}

export interface IDeletedCharacterResponse extends IMessage
{
    s3Result: IDeletedCharacterResponse.S3Result
    dbResult: IDeletedCharacterResponse.DatabaseResult
    characterId: string
}

export namespace IDeletedCharacterResponse
{
    export interface S3Result extends IMessage
    {

    }
    export interface DatabaseResult extends IMessage
    {
        deletedItem: ICreatedCharacterResponse
    }
}

export async function deleteCharacter(authToken: string,id: string)
{
    const response = await fetch(`${BASE_URL}/Prod/characters/${id}`,{
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    return await response.json<IMessage | IDeletedCharacterResponse>()
}