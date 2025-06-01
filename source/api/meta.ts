export interface IMeta
{
    count: number
    nextToken: string | null
    hasMore: boolean
}

export interface IMetaResponse
{
    meta: IMeta
}

export interface IToken
{
    nextToken?: string
}