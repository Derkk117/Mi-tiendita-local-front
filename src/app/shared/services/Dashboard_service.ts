import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DashboardService {

    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getMostSold(token, user_id, year, month): Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        return this._http.get(this.url + 'mostSold/' + user_id + "/" + year + "/" + month, { headers: headers }).pipe(map(res => res));
    }
}
