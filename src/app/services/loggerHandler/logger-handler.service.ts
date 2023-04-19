import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerHandlerService {

  apiUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { 
      if(!isDevMode()) {
          this.apiUrl = 'https://zesty-blush-anger.glitch.me/'
      }
  }

  uploadLoggerInfo(formData: FormData): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl + "upload-logger-info", formData, { reportProgress: true, observe: 'response' });
  }

  getLoggerInfo(body: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl + "logger-info", body, {observe: "response"})
  }

}
