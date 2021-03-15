import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private myUrl = 'https://localhost:44352/';
  private miApiUrl = 'api/Roles/';

  constructor(private http: HttpClient) { }


  getlistarRoles(): Observable<any> {

    return this.http.get(this.myUrl + this.miApiUrl);
  

  }



  eliminarRol(id: number): Observable<any> {

    return this.http.delete(this.myUrl + this.miApiUrl + id);

  }

  guardarRol(rol: any): Observable<any> {


    return this.http.post(this.myUrl + this.miApiUrl, rol);

  }

  actualizarRol(id: number, rol: any): Observable<any> {

    return this.http.put(this.myUrl + this.miApiUrl + id, rol);
  }
}
