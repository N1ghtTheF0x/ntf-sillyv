import { BASE_URL } from "./url"

export interface IUserResponse
{
    GSI1PK: "ALL"
    PK: string
    username?: string
    oldUsernames?: Array<string>
    activeDays: Array<IUserResponse.ActiveDay>
    activeDaysCount: number
    characters?: number
    drawingsByMonth: Record<IUserResponse.ActiveMonth,number>
    drawingsOnLastActiveMonth: number
    firstLetter: string
    gamesSinceWin: number
    lastActiveMonth: IUserResponse.ActiveMonth
    lastDrawingUrl: string
    lastWinDate: string | null
    selectedCharacter: string
    totalDrawings: number
    updatedAt?: number
    createdAt?: number
    userId?: string
}

export namespace IUserResponse
{
    export type ActiveDay = `${number}-${number}-${number}`
    export type ActiveMonth = `${number}`
}

export async function fetchUser(username: string)
{
    const response = await fetch(`${BASE_URL}/Prod/user?username=${username}`)
    return response.json<IUserResponse>()
}

export async function fetchUsers(firstLetter: string)
{
    const response = await fetch(`${BASE_URL}/Prod/user?firstLetter=${firstLetter.substring(0,1)}`)
    return response.json<Array<IUserResponse>>()
}