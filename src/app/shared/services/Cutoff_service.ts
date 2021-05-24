import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CutoffService {

    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }
}
