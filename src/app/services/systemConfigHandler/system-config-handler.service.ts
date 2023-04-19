import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SystemConfigHandlerService {

    apiUrl: string = 'http://localhost:8080/';

    constructor(private http: HttpClient) { 
        if(!isDevMode()) {
            this.apiUrl = 'https://zesty-blush-anger.glitch.me/'
        }
    }

    getSystemConfigData(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.apiUrl + 'system-config-info', { observe: 'response' });
    }

    uploadSystemConfig(formData: FormData): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.apiUrl + "upload-system-config", formData, {
            reportProgress: true,
            observe: 'response'
        });
    }

    updateSystemConfig(body: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.apiUrl + "update-system-config", body, {
            reportProgress: true,
            observe: 'response'
        });
    }

    
    downloadUpdatedSystemConfig(): any {
        const headers = new Headers({'Accept': 'text/plain' });
        return this.http.post<any>(this.apiUrl + 'download-system-config', {responseType: 'blob', observe: 'response'});
    }

    removeSystemConfigInfo(): any {
        return this.http.delete(this.apiUrl + 'delete-system-config', {observe: 'response'});
    }

}
