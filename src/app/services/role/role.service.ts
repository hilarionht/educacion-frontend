import { Injectable } from '@angular/core';
import { Role } from '../../models/role.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService {

  role:Role;

  constructor(
    public http: HttpClient, 
    public router: Router,
    private toastr: ToastrService
  ) { }
  create( role: Role ) {
    let url = URL_SERVICIOS + '/role';
    console.log(' create role: ',role);
    return this.http.post(url, role ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)})
      .map((res: any) => {
        this.toastr.success( "EL ROL " + role.name.toUpperCase +" FUE CREADO CON EXITO!" , 'CREACION DE ROL',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return res.role;
      }).catch( err => {
        console.log(err, 'error en backend');
        this.toastr.warning( err.error.errors.message , 'Error en generar la role!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return Observable.throw( err );
      });
  }
  update( role: Role ) {

    let url = URL_SERVICIOS + '/role';
    console.log(url);
    
    return this.http.put( url, role ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( (resp: any) => {
                  this.toastr.success( "EL ROL " +resp.name.toUpperCase + "FUE ACTUALIZADO CON EXITO!", 'ACTUALIZACION DE ROL',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                });

  }
  
  get(id: string){
    let url = URL_SERVICIOS + '/role/' + id;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} )
                    .map(resp => resp);
  }

  delete( id: string ) {
    let url = URL_SERVICIOS + '/role/' + id;
    //url += '?token=' + this.token;
    return this.http.delete( url ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( resp => {
                  console.log(resp, 'in delete role');
                  
                  this.toastr.success( 'El role a sido eliminado correctamente', 'ELIMINACION DE ROL',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                }).catch( err => {
                  console.log(err.error.message, 'error en backend');
                  this.toastr.warning( "NO SE PUEDE ELIMINAR EL ROL CONSULTE CON SU ADMINSTRADOR!" , 'ELIMINACION DE ROL',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return Observable.throw( err );
                });

  }
  
  list( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/role';//?desde=' + desde;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} );
  }
}
