import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

    public url: string;

    constructor(private _http: HttpClient) 
    {
        this.url = GLOBAL.url;
    }
    //Funcion para obtener los productos
    getProducts(token, user_id) :Observable<any>
    {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'products/'+ user_id,
        { headers: headers }).pipe(map(res => res));
    }

    getProduct(token, sku) :Observable<any>
    {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'product/'+ sku 
        + '/edit', { headers: headers }).pipe(map(res => res));
    }

    //Funcion para poder eliminar el producto 
    delete(token, sku): Observable<any> 
    {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });        
        let options = {headers: headers}
        return this._http.delete(this.url + 'product/' + 
        sku + '/destroy', options).pipe(map(res => res));
    }   

    update(token, sku, product) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        let json = JSON.stringify(product);
        let params = json;

        return this._http.put(this.url + 'product/' + sku + 
        '/update', params, { headers: headers }).pipe(map(res => res));
    }

    create(token, product) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        let json = JSON.stringify(product);
        let params = json;

        return this._http.post(this.url + 'product', params, 
        { headers: headers }).pipe(map(res => res));
    }
}