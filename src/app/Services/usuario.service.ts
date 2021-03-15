import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private myUrl = 'https://localhost:44352/';
  private miApiUrl = 'api/Usuarios/';

  constructor(private http: HttpClient) { }

  getListarUsuarios(): Observable<any> {

    return this.http.get(this.myUrl + this.miApiUrl);

  }



  deleteusuario(id: number): Observable<any> {

    return this.http.delete(this.myUrl + this.miApiUrl + id);

  }

  guardarUsuario(usuario: any): Observable<any> {


    return this.http.post(this.myUrl + this.miApiUrl, usuario);

  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {

    return this.http.put(this.myUrl + this.miApiUrl + id, usuario);
  }

}
