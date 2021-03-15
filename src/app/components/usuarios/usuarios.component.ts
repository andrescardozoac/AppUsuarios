import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { RolService } from 'src/app/Services/rol.service';
import { RolUsuarioService } from 'src/app/Services/rol-usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


  listarUsuarios: any[] = [];
  listarUsuariosRol: any[] = [];
  listarRoles: any[] = [];
  formUsuario: FormGroup;
  formRol: FormGroup;
  formRolUsuario: FormGroup;


  accion = "Agregar";
  accion2 = "Agregar"
  accion3 = "Agregar"
  idUsuario: number | undefined;
  idUsuarioRol: number | undefined;
  idRol: number | undefined;
  datos: any;
  mostrarTablaUsuario = false;
  mostrarTablaUsuarioRoles = false;
  mostrarRoles = false;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _usuariosServices: UsuarioService,
    private _rolesServices: RolService,
    private _rolesUsuariosServices: RolUsuarioService) {
    this.formUsuario = this.fb.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      nombre: ['', Validators.required]
    });
    this.formRol = this.fb.group({
      nombreRol: ['', Validators.required]
    });
    this.formRolUsuario = this.fb.group({
      idRol: ['', Validators.required],
      idUsuario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRoles();
    this.obtenerUsuariosRol();
    this.datos = ["Listar Usuarios", "Listar Usuarios - Roles", "Listar Roles"];
  }

  obtenerUsuarios() {
    this._usuariosServices.getListarUsuarios().subscribe(data => {
      // console.log(data);
      this.listarUsuarios = data;
    }, error => {
      console.log(error)

    })


  }

  obtenerUsuariosRol() {
    this._rolesUsuariosServices.getlistarRolesUsuario().subscribe(data => {
      // console.log(data);
      this.listarUsuariosRol = data;
    }, error => {
      console.log(error)

    })


  }

  obtenerRoles() {
    this._rolesServices.getlistarRoles().subscribe(data => {
      // console.log(data);
      this.listarRoles = data;
    }, error => {
      console.log(error)

    })


  }


  agregarUsuario() {


    const usuario: any = {
      login: this.formUsuario.get('login')?.value,
      password: this.formUsuario.get('password')?.value,
      nombre: this.formUsuario.get('nombre')?.value,
      //idRol : this.form.get('idRol')?.value,
    }

    if (this.idUsuario == undefined) {
      //Agregamos un nuevo usuario
      this._usuariosServices.guardarUsuario(usuario).subscribe(data => {
        this.toastr.success('El usuario fue registrado con Exito!', 'Usuario Registrado');
        this.obtenerUsuarios();
        this.formUsuario.reset();
      }, error => {

        this.toastr.error('Upss...Ocurrio un Error', 'Error');
        console.log(error)
      });

    }
    else {
      //Actualizamos un Usuario
      usuario.idUsuario = this.idUsuario;
      this._usuariosServices.actualizarUsuario(this.idUsuario, usuario).subscribe(data => {
        this.formUsuario.reset();
        this.accion = "Agregar";
        this.idUsuario = undefined;
        this.toastr.info('El usuario fue Actualizado con Exito!', 'Usuario Actualizado');
        this.obtenerUsuarios();
      }, error => {
        console.log(error);
      }


      );

    }

  }

  eliminarUsuario(id: number) {

    //console.log(id);
    this._usuariosServices.deleteusuario(id).subscribe(data => {
      this.toastr.error('El usuario ha Sido Eliminado', 'Usuario Eliminado');
      this.obtenerUsuarios();
    }, error => {
      console.log(error);
    }


    );

  }


  editarUsuario(usuario: any) {
    this.accion = "Editar";

    this.idUsuario = usuario.idUsuario;
    this.formUsuario.patchValue({
      login: usuario.login,
      password: usuario.password,
      nombre: usuario.nombre

    })

  }

  editarUsuarioRol(usuarioRol: any) {
    this.accion3 = "Editar";

    this.idUsuarioRol = usuarioRol.idUsuarioRol;
    this.formRolUsuario.patchValue({
      idRol: usuarioRol.idRol,
      idUsuario: usuarioRol.idUsuario
    })

  }


  agregarRol() {


    const rol: any = {

      nombreRol: this.formRol.get('nombreRol')?.value,
      //idRol : this.form.get('idRol')?.value,
    }

    if (this.idRol == undefined) {
      //Agregamos un nuevo Rol
      this._rolesServices.guardarRol(rol).subscribe(data => {
        this.toastr.success('El Rol fue registrado con Exito!', 'Rol Registrado');
        this.obtenerRoles();
        this.formRol.reset();
      }, error => {

        this.toastr.error('Upss...Ocurrio un Error', 'Error');
        console.log(error)
      });

    }
    else {
      //Actualizamos un Rol
      rol.idRol = this.idRol;
      this._rolesServices.actualizarRol(this.idRol, rol).subscribe(data => {
        this.formRol.reset();
        this.accion2 = "Agregar";
        this.idRol = undefined;
        this.toastr.info('El Rol fue Actualizado con Exito!', 'Rol Actualizado');
        this.obtenerRoles();
      }, error => {
        console.log(error);
      }


      );

    }

  }

  eliminarRol(id: number) {

    //console.log(id);
    this._rolesServices.eliminarRol(id).subscribe(data => {
      this.toastr.error('El Rol ha Sido Eliminado', 'Rol Eliminado');
      this.obtenerRoles();
    }, error => {
      console.log(error);
    }


    );

  }


  eliminarUsuarioRol(id: number)
  {

    console.log(id);
    this._rolesUsuariosServices.eliminarRolUsuario(id).subscribe(data => {
      this.toastr.error('El Rol ha Sido Eliminado', 'Rol Eliminado');
      this.obtenerUsuariosRol();
      this.formRolUsuario.reset();
    }, error => {
      console.log(error);
    }


    );

  }


  editarRol(rol: any) {
    this.accion2 = "Editar";

    this.idRol = rol.idRol;
    this.formRol.patchValue({
      nombreRol: rol.nombreRol

    })

  }



  capturar(value: any) {

    //console.log(value);

    if (value == "Listar Usuarios") {

      this.mostrarTablaUsuario = true;
      this.mostrarTablaUsuarioRoles = false;
      this.mostrarRoles = false;

    }

    else if (value == "Listar Usuarios - Roles") {
      this.mostrarTablaUsuarioRoles = true;
      this.mostrarTablaUsuario = false;
      this.mostrarRoles = false;


    }
    else if (value == "Listar Roles") {

      this.mostrarRoles = true;
      this.mostrarTablaUsuario = false;
      this.mostrarTablaUsuarioRoles = false;
    }
    else {

      this.mostrarRoles = false;
      this.mostrarTablaUsuario = false;
      this.mostrarTablaUsuarioRoles = false;

    }


  }


  agregarRolUsuario() {


    const rolUsuario: any = {

      idRol: this.formRolUsuario.get('idRol')?.value,
      idUsuario: this.formRolUsuario.get('idUsuario')?.value

    }

    console.log(rolUsuario);
    //Agregamos un nuevo RolUsuario
    this._rolesUsuariosServices.guardarRolUsuario(rolUsuario).subscribe(data => {
      this.toastr.success('El Rol - Usuario fue registrado con Exito!', 'Rol a Usuario Registrado');
     this.obtenerUsuariosRol();
      this.formRolUsuario.reset();
      this.formUsuario.reset();
      this.formRol.reset();
    }, error => {

      this.toastr.error('Upss...Ocurrio un Error', 'Error');
      console.log(error)
    });




  }

}
