import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClientService {

    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getClients(token, user_id): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'clients/' + user_id, { headers: headers }).pipe(map(res => res));
    }

    getClient(token, sku): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'client/' + sku + '/edit', { headers: headers }).pipe(map(res => res));
    }

    store(token, client, user_id){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        client.user_id = user_id; //add param to client model.
        let json = JSON.stringify(client);
        let params = json;

        return this._http.post(this.url + 'client', params, { headers: headers }).pipe(map(res => res));
    }

    update(token, sku, client) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        let json = JSON.stringify(client);
        let params = json;

        return this._http.put(this.url + 'client/' + sku + '/update', params, { headers: headers }).pipe(map(res => res));
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
        return this._http.delete(this.url + 'client/' + sku + '/destroy', options).pipe(map(res => res));
    }
}
