import { createCharacter, deleteCharacter, deleteCharacterImage, fetchCharacters, ICharacter, ICreateCharacterPayload, ICreatedCharacterResponse, IUploadImagePayload, selectCharacter, uploadCharacterImage } from "./api/character"
import { isNotOnlyMessage, MessageError } from "./api/message"
import { SillyVUser } from "./user"

export class SillyVCharacter
{
    public static async fetch(username: string)
    {
        return (await fetchCharacters(username)).map((char) => new this(char))
    }
    public static fromCreatedCharacter(raw: ICreatedCharacterResponse)
    {
        return new this({
            id: raw.characterId,
            name: raw.name,
            description: raw.description,
            restrictions: raw.restrictions,
            images: raw.imageUrls,
            username: raw.username,
            uploadDate: new Date(raw.createdDate).toISOString(),
            isSelected: false
        })
    }
    public static async create(authToken: string,payload: ICreateCharacterPayload,required?: true): Promise<SillyVCharacter>
    public static async create(authToken: string,payload: ICreateCharacterPayload,required?: false): Promise<SillyVCharacter | undefined>
    public static async create(authToken: string,payload: ICreateCharacterPayload,required = false)
    {
        const result = await createCharacter(authToken,payload)
        if(!isNotOnlyMessage(result))
        {
            if(required)
                throw new MessageError(result.message)
            return undefined
        }
        return this.fromCreatedCharacter(result)
    }
    public constructor(public readonly raw: ICharacter)
    {
        
    }
    public getUser()
    {
        return SillyVUser.fetch(this.raw.username)
    }
}

export namespace SillyVCharacter
{
    export type CharacterLike = string | ICharacter | ICreatedCharacterResponse | SillyVCharacter
    export function resolveCharacter(value: unknown): string
    {
        if(typeof value == "string")
            return value
        if(typeof value == "object" && value !== null)
        {
            if("id" in value && typeof value.id == "string")
                return value.id
            if("characterId" in value && typeof value.characterId == "string")
                return value.characterId
        }
        if(value instanceof SillyVCharacter)
            return value.raw.id
        throw new TypeError(`cannot resolve ${value} to character id`)
    }
    export class Creator
    {
        private readonly _auth_token: string
        public constructor(authToken: string)
        {
            this._auth_token = authToken
        }
        public async createCharacter(payload: ICreateCharacterPayload,required?: true): Promise<SillyVCharacter>
        public async createCharacter(payload: ICreateCharacterPayload,required?: false): Promise<SillyVCharacter | undefined>
        public async createCharacter(payload: ICreateCharacterPayload,required = false)
        {
            const result = await createCharacter(this._auth_token,payload)
            if(!isNotOnlyMessage(result))
            {
                if(required)
                    throw new MessageError(result.message)
                return undefined
            }
            return SillyVCharacter.fromCreatedCharacter(result)
        }
        public async selectCharacter(char: CharacterLike,required = false)
        {
            const result = await selectCharacter(this._auth_token,resolveCharacter(char))
            if(!isNotOnlyMessage(result) && required)
                throw new MessageError(result.message)
        }
        public async deleteCharacter(char: CharacterLike,required = false)
        {
            const result = await deleteCharacter(this._auth_token,resolveCharacter(char))
            if(!isNotOnlyMessage(result) && required)
                throw new MessageError(result.message)
        }
        public async uploadImage(char: CharacterLike,payload: IUploadImagePayload,required = false)
        {
            const result = await uploadCharacterImage(this._auth_token,resolveCharacter(char),payload)
            if(!isNotOnlyMessage(result) && required)
                throw new MessageError(result.message)
        }
        public async deleteImage(char: CharacterLike,image: string,required = false)
        {
            const result = await deleteCharacterImage(this._auth_token,resolveCharacter(char),image)
            if(!isNotOnlyMessage(result) && required)
                throw new MessageError(result.message)
        }
    }
}