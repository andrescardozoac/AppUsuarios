import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolUsuarioService {

  private myUrl = 'https://localhost:44352/';
  private miApiUrl = 'api/Usuarios_Roles/';

  constructor(private http: HttpClient) { }


  getlistarRolesUsuario(): Observable<any> {

    return this.http.get(this.myUrl + this.miApiUrl);
  

  }



  eliminarRolUsuario(id: number): Observable<any> {

    return this.http.delete(this.myUrl + this.miApiUrl + id);

  }

  guardarRolUsuario(rol: any): Observable<any> {


    return this.http.post(this.myUrl + this.miApiUrl, rol);

  }

  actualizarRolUsuario(id: number, rol: any): Observable<any> {

    return this.http.put(this.myUrl + this.miApiUrl + id, rol);
  }
  
}
