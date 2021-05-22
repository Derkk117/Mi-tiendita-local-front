import { from, Observable } from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GLOBAL} from './global';
import { Supplier} from '../models/Supplier_model';

@Injectable()
export class SupplierService{

    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    create(supplier,token) :Observable<any> {
        let json = JSON.stringify(supplier);
        let params = json;

        let headers = new HttpHeaders(
            { 'Content-Type': 'application/json',
              'Authorization': "Bearer " + token
            });
        return this._http.post(
            this.url + 'suppliers', params , { headers: headers }
            ).pipe(map(res => res)
        );
    }
    
    getSuppliers(token) :Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        return this._http.get(
            this.url + "suppliers" , { headers: headers }
            ).pipe(map(res => res)
        );
    }
}