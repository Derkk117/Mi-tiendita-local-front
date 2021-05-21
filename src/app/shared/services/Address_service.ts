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
}