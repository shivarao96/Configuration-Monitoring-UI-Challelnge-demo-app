import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, retryWhen, tap } from 'rxjs';
import { isDevMode } from '@angular/core';

@Injectable()
export class UserHandlerService {

    apiUrl: string = 'http://localhost:8080/';

    constructor(private http: HttpClient) { 
        if(!isDevMode()) {
            this.apiUrl = 'https://zesty-blush-anger.glitch.me/'
        }
    }

    getAllMetaInfo(body: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.apiUrl + 'user-config-data', body, { observe: 'response' }).pipe(retry(2))
    }

    getAllProducts(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.apiUrl + 'products', { observe: 'response' }).pipe(retry(2));
    }

    getAllServices(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.apiUrl + 'services', { observe: 'response' }).pipe(retry(2));
    }

    getAllGroups(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.apiUrl + 'groups', { observe: 'response' }).pipe(retry(2));
    }

    uploadUserConfig(formData: FormData): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.apiUrl + "upload-user-data", formData, {
            reportProgress: true,
            observe: 'response'
        });
    }

    updateServiceMetaInfo(body: any) {
        return this.http.post<any>(this.apiUrl + "update-service-meta-info", body, {
            reportProgress: true,
            observe: 'response'
        });
    }

    addServiceMetaInfo(body: any) {
        return this.http.post<any>(this.apiUrl + "add-service-meta-info", body, {
            reportProgress: true,
            observe: 'response'
        });
    }

    deleteServiceMetaInfo(body: any) {
        return this.http.post<any>(this.apiUrl + "delete-service-meta-info", body, {
            reportProgress: true,
            observe: 'response'
        });
    }

    removeAllServiceMetaInfo() {
        return this.http.delete(this.apiUrl + "remove-all-user-config", {
            reportProgress: true,
            observe: 'response'
        });
    }

}
