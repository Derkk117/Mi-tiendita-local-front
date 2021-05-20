import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { from, Observable } from 'rxjs';


@Injectable()
export class UserService {

    public url: string;
    public identity; 

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    login(user) : Observable<any> {
        let json = JSON.stringify(user);
        let params = json;

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'login', params, { headers: headers }).pipe(map(res => res));
    }

    logout(token): Observable<any> {
        let headers = new HttpHeaders({ 
            'Authorization': "Bearer " + token
        });
        return this._http.post(this.url + 'logout', [], { headers: headers }).pipe(map(res => res));
    }

    signUp(user) :Observable<any> {
        let json = JSON.stringify(user);
        let params = json;

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'sign-up', params, { headers: headers }).pipe(map(res => res));
    }

    getIdentity(token, user) :Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        });
        let identity = 
            this._http.get(
                this.url + 'current/'+ user, { headers: headers }
            ).pipe(map(res => res)
        );
        //localStorage.setItem('identity', identity);
        return identity;
    }

    //servicio que registra una nueva suscripción.
    // registraUsuario(usuario_a_registrar): Observable<any> {
    //     //creamos un Json de la suscripcion a registrar.
    //     let params = JSON.stringify(usuario_a_registrar);
    //     //console.log(params);
    //     let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //     //regresamos un registro hecho de suscripción.
    //     return this._http.post(this.url + 'registra-usuario', params, { headers: headers })
    //         .pipe(map(res => res));
    // }

    // //servicio para buscar en la base de datos de usuario y verificar si existe.
    // signUp(usuario_a_loguear, gethash = null): Observable<any> {
    //     if (gethash != null)
    //         usuario_a_loguear.gethash = gethash;

    //     //Creamos un json del usuario a loguear.
    //     let json = JSON.stringify(usuario_a_loguear);
    //     let params = json;

    //     // console.log(params);
    //     let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     return this._http.post(this.url + 'login', params, { headers: headers }).pipe(map(res => res));
    // }

    // //Servicio para regresar todos los usuarios
    // obtenUsuarios(token): Observable<any> {

    //     let headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': token
    //     });

    //     return this._http.get(this.url + 'obten-usuarios', { headers: headers }).pipe(map(res => res));
    // }

    // //Servicio para modificar usuarios
    // modificaUsuario(usuario_mod, token): Observable<any> {
    //     // console.log('modifica');
    //     let json = JSON.stringify(usuario_mod);
    //     let params = json;
    //     // console.log(params);
    //     let headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': token
    //     });

    //     return this._http.put(this.url + 'modifica-usuario/' + usuario_mod._id, params, { headers: headers }).pipe(map(res => res));
    // }

    // //servicio que se ejecuta al iniciar la aplicación, si existe un usuario
    // //en el local storage lo regresa, sino regresa null.


    // //servicio que se ejecuta al inciar la aplicación, si existe un usuario
    // //en el local storage lo regresa en forma de token, sino regresa null.
    // getToken() {
    //     //recuperamos un objeto guardado en el local storage.
    //     let token = localStorage.getItem('token');

    //     // console.log('token');
    //     // console.log(token);
    //     if (token != "undefinded") this.token = token;
    //     else this.token = null;
    //     return this.token;
    // }

    // //Servicio para obtener todos los usuarios de la empresa.
    // obtenUsuariosEmpresa(empresa_a_buscar,token):Observable<any>{
    //     let headers = new HttpHeaders(
    //         {
    //             'Content-Type': 'application/json',
    //             'Authorization': token,
    //         }
    //     );

    //     let options = {
    //         headers: headers
    //     }

    //     //buscamos los usuarios de la empresa por id.
    //     return this._http.get(this.url + 'obten-usuarios-empresa/' + empresa_a_buscar, options).pipe(map(res => res));

    // }

    // //Servicio que regresa un usuario buscado por id.
    // obtenUsuario(usuario_a_buscar,token):Observable<any>{
    //     let headers = new HttpHeaders(
    //         {
    //             'Content-Type': 'application/json',
    //             'Authorization': token,
    //         }
    //     );
    //     let options = {
    //         headers: headers
    //     }
    //     //buscamos el usuario por id.
    //     return this._http.get(this.url + 'obten-usuario/' + usuario_a_buscar, options).pipe(map(res => res));

    // }
}