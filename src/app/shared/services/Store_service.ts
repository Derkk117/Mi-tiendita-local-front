import { from, Observable } from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GLOBAL} from './global';

import {Store} from '../models/Store_model';

@Injectable()
export class StoreService {

    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getStore(store_id, token):Observable<any>{
        let headers = new HttpHeaders(
            {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
            }
        );

        let options = {headers: headers};

        return this._http.get(this.url+ 'store/' + store_id + '/edit', options).pipe(map(res => res));
    }

    create(token, data):Observable<any>{
        let headers = new HttpHeaders(
            {
                'Authorization': "Bearer " + token,
            }
        );
        
        return this._http.post(this.url + 'stores', data, { headers: headers }).pipe(map(res => res));
    }
}