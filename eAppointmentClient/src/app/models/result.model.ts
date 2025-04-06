export class ResultModel<T>{
    isSucceded?: boolean;
    data?: T | null;
    message?: string;
    httpStatusCode?: number;
}