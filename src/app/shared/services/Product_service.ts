import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';

import { from, Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';


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

    store(token, product, user_id) : Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        product.user_id = user_id; //add param to client model.
        let json = JSON.stringify(product);
        let params = json;
        return this._http.post(this.url + 'product', params, { headers: headers }).pipe(map(res => res));
    }
}