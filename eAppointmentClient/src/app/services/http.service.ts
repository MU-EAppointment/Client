import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../models/result.model';
import { api } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post<T>(apiUrl: string, body: any, callback: (res: ResultModel<T>) => void, errCallBack?: (err: HttpErrorResponse) => void) {
    this.http.post<ResultModel<T>>(`${api}/${apiUrl}`, body)
      .subscribe({
        next: (res => {
          if (res.data !== undefined || res.data !== null) {
            callback(res)
          }
        }),
        error: ((err: HttpErrorResponse) => {
          if (errCallBack !== undefined) {
            errCallBack(err)
          }
        })
      })
  }
  getWithBody<T>(apiUrl: string, body: number | null, callback: (res: ResultModel<T>) => void, errCallBack?: (err: HttpErrorResponse) => void) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.request<ResultModel<T>>('GET', `${api}/${apiUrl}`, {
      headers: headers
    }).subscribe({
      next: (res => {
        if (res.data !== undefined || res.data !== null) {
          callback(res);
        }
      }),
      error: ((err: HttpErrorResponse) => {
        if (errCallBack !== undefined) {
          errCallBack(err);
        }
      })
    });
  }
  delete<T>(apiUrl: string, callback: (res: ResultModel<T>) => void, errCallBack?: (err: HttpErrorResponse) => void) {
    this.http.delete<ResultModel<T>>(`${api}/${apiUrl}`)
      .subscribe({
        next: (res => {
          if (res.data !== undefined || res.data !== null) {
            callback(res);
          }
        }),
        error: ((err: HttpErrorResponse) => {
          if (errCallBack !== undefined) {
            errCallBack(err);
          }
        })
      });
  }
}
