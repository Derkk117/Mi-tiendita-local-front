import { from, Observable } from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GLOBAL} from './global';

import {Address} from '../models/Address_model';

@Injectable()
export class AddressService{
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getAddress(address_id, token):Observable<any>{
        let headers = new HttpHeaders(
            {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
            }
        );

        let options = {headers: headers};

        return this._http.get(this.url+ 'address/' + address_id + '/edit', options).pipe(map(res => res));
    }

    create(token, address):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        let json = JSON.stringify(address);
        let params = json;

        return this._http.post(this.url + 'address', params, { headers: headers }).pipe(map(res => res));
    }

    getLast(token):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        return this._http.get(this.url+ 'addressLast',{ headers: headers }).pipe(map(res => res));
    }

    update(token, id, address){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        let json = JSON.stringify(address);
        let params = json;

        return this._http.put(this.url + 'address/' + id + '/update', params, { headers: headers }).pipe(map(res => res));
    }
}