import { ActiveDay, ActiveMonth } from "./time"
import { BASE_URL } from "./url"

export interface IUserResponse
{
    GSI1PK: "ALL" | "USER#ALL"
    PK: string
    username?: string
    oldUsernames?: Array<string>
    activeDays: Array<ActiveDay>
    activeDaysCount: number
    characters?: number
    drawingsByMonth: Record<ActiveMonth,number>
    drawingsOnLastActiveMonth: number
    firstLetter: string
    gamesSinceWin: number
    lastActiveMonth: ActiveMonth
    lastDrawingUrl: string
    lastDrawingDate: ActiveDay
    lastWinDate: string | null
    selectedCharacter: string
    totalDrawings: number
    updatedAt?: number
    createdAt?: number
    userId?: string
    participations: Array<IUserResponse.IParticipation>
    wins: Array<ActiveDay>
}

export namespace IUserResponse
{
    export interface IParticipation
    {
        date: ActiveDay
        subject: string
        url: string
    }
}

export interface IUserTopListResponse
{
    topMonthlyArtists: Array<IUserResponse>
    topAllTimeArtists: Array<IUserResponse>
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

export async function fetchTopList()
{
    const response = await fetch(`${BASE_URL}/Prod/user?topLists=true`)
    return response.json<IUserTopListResponse>()
}