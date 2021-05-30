import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CutoffService {

    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }
    
    getCutoffs(token, user_id): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'cutoff/' + user_id, { headers: headers }).pipe(map(res => res));
    }

    getCutoff(token, sku): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'cutoff/' + sku + '/edit', { headers: headers }).pipe(map(res => res));
    }

    create(cutoff,token) :Observable<any> {
        let json = JSON.stringify(cutoff);
        let params = json;

        let headers = new HttpHeaders(
            { 'Content-Type': 'application/json',
              'Authorization': "Bearer " + token
            });
        return this._http.post(
            this.url + 'cutoff', params , { headers: headers }
            ).pipe(map(res => res)
        );
    }

    update(token, sku, cutoff) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        let json = JSON.stringify(cutoff);
        let params = json;

        return this._http.put(this.url + 'cutoff/' + sku + '/update', params, { headers: headers }).pipe(map(res => res));
    }

    delete(token, sku): Observable<any>{

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        
        let options = {headers: headers}

        return this._http.delete(this.url + 'cutoff/' + sku + '/destroy', options).pipe(map(res => res));
    }


}
