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

    update(token, sku, client) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        let json = JSON.stringify(client);
        let params = json;

        return this._http.put(this.url + 'client/' + sku + '/update', params, { headers: headers }).pipe(map(res => res));
    }

    // eliminaHerramienta(herramienta_a_eliminar, token): Observable<any> {
    //     //creamos un Json de la herramienta a buscar.
    //     let headers = new HttpHeaders(
    //         {
    //             'Content-Type': 'application/json',
    //             'Authorization': token,
    //         }
    //     );
    //     let options = {
    //         headers: headers
    //     }
    //     //buscamos el id de la herramienta.
    //     return this._http.delete(this.url + 'herramienta/' + herramienta_a_eliminar, options).pipe(map(res => res));
    // }
}
