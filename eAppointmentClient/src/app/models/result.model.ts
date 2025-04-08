export class ResultModel<T>{
    isSucceded?: boolean
    data?: any
    message?: string
    errors?: any[]
    httpStatusCode?: number
}