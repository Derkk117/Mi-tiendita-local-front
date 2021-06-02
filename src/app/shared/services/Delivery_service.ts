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
    getDeliveries(token, user_id) :Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'deliveries/'+ user_id,
        { headers: headers }).pipe(map(res => res));
    }

    getDelivery(token, id): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'deliveries/' + id + '/edit', { headers: headers }).pipe(map(res => res));
    }

    create(delivery,token) :Observable<any> {
        let headers = new HttpHeaders(
            { 'Content-Type': 'application/json',
              'Authorization': "Bearer " + token
        });

        

        let json = JSON.stringify(delivery);
        let params = json;
        return this._http.post(
            this.url + 'deliveries', params , { headers: headers }
            ).pipe(map(res => res)
        );
    }

    update(token, id, delivery) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        let json = JSON.stringify(delivery);
        let params = json;
        
        return this._http.put(this.url + 'deliveries/' + id + '/update', params, { headers: headers }).pipe(map(res => res));
    }

    delete(token, id): Observable<any>{

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        
        let options = {headers: headers}

        return this._http.delete(this.url + 'deliveries/' + id + '/destroy', options).pipe(map(res => res));
    }

}