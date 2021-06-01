import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';

import { from, Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SaleService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }
    //Funcion para obtener las ventas 
    getSales(token, user_id) :Observable<any>{
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

    delete(token, sku): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        
        let options = {
            headers: headers
        }
        //buscamos el id de la herramienta.
        return this._http.delete(this.url + 'sales/' + sku + '/destroy', options).pipe(map(res => res));
    }

    store(token, sale, user_id){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        sale.user_id = user_id; //add param to client model.
        
        let json = JSON.stringify(sale);
        let params = json;
        return this._http.post(this.url + 'sales', params, { headers: headers }).pipe(map(res => res));
    }

}