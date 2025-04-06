export class ResultModel<T>{
    isSucceded?: boolean
    data?: T
    message?: string
    errors?: any[]
    httpStatusCode?: number
}