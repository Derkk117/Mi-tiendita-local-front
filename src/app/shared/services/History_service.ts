import { from, Observable } from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GLOBAL} from './global';
import { History} from '../models/History_model';

@Injectable()
export class HistoryService{

    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    create(history,token):Observable<any> {
        let json = JSON.stringify(history);
        let params = json;

        let headers = new HttpHeaders(
            { 'Content-Type': 'application/json',
              'Authorization': "Bearer " + token
            });
        return this._http.post(
            this.url + 'histories', params , { headers: headers }
            ).pipe(map(res => res)
        );
    }
    

    getHistories(token, id):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });

        return this._http.get(this.url + 'histories/'+ id , { headers: headers }).pipe(map(res => res));
    }
}