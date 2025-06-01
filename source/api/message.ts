export interface IMessage
{
    message: string
}

export class MessageError extends Error implements IMessage
{
    public constructor(public readonly message: string,options?: ErrorOptions)
    {
        super(message,options)
    }
}

export function isMessage(obj: unknown): obj is IMessage
{
    return obj !== null && typeof obj == "object" && "message" in obj
}

export function isNotOnlyMessage<T>(obj: T | IMessage): obj is T
{
    return isMessage(obj) && Object.keys(obj).length > 1
}