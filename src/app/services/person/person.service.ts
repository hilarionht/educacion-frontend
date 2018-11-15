import { Injectable } from '@angular/core';
import { Person } from '../../models/person.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PersonService {

  person:Person;
  constructor(
    public http: HttpClient, 
    public router: Router,
    private toastr: ToastrService
  ) { }
  create( person: Person ) {
    let url = URL_SERVICIOS + '/person';
    console.log(' create person: ',person);
    return this.http.post(url, person ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)})
      .map((res: any) => {
        this.toastr.success( person.firstname + ' ' + person.lasname , 'person Exitosa!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return res.person;
      }).catch( err => {
        console.log(err);
        this.toastr.warning( err.error.message , 'Error en generar la person!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return Observable.throw( err );
      });;
  }
  update( person: Person ) {

    let url = URL_SERVICIOS + '/person';
    console.log(url);
    
    return this.http.put( url, person ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( (resp: any) => {
                  this.toastr.success( resp.nombre, 'person Actualizado!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                });

  }
  
  get(id: string){
    let url = URL_SERVICIOS + '/person/' + id;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} )
                    .map(resp => resp);
  }

  delete( id: string ) {
    let url = URL_SERVICIOS + '/person/' + id;
    //url += '?token=' + this.token;
    return this.http.delete( url ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( resp => {
                  this.toastr.success( 'El person a sido eliminado correctamente', 'person BORRADO!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                });

  }
  
  list( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/person';//?desde=' + desde;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} );
  }

}
