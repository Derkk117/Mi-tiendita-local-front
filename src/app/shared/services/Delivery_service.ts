import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class DeliveryService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }
    //Funcion para obtener los productos
    getDeliveries(token, sale_id) :Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'deliveries/'+ sale_id,
        { headers: headers }).pipe(map(res => res));
    }

    getDelivery(token, sku): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'delivery/' + sku + '/edit', { headers: headers }).pipe(map(res => res));
    }

    update(token, sku, delivery) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        let json = JSON.stringify(delivery);
        let params = json;

        return this._http.put(this.url + 'delivery/' + sku + '/update', params, { headers: headers }).pipe(map(res => res));
    }

}