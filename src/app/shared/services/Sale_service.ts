import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class SaleService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }
    //Funcion para obtener las ventas 
    getProducts(token, user_id) :Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'sales/'+ user_id,
        { headers: headers }).pipe(map(res => res));
    }

    getSale(token, sku): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'sales/' + sku + '/edit', { headers: headers }).pipe(map(res => res));
    }

    update(token, sku, sale) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        let json = JSON.stringify(sale);
        let params = json;

        return this._http.put(this.url + 'sales/' + sku + '/update', params, { headers: headers }).pipe(map(res => res));
    }



}