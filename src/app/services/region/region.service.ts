import { Region } from './../../models/region.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { URL_SERVICIOS } from '../../config/config';


@Injectable()
export class RegionService {

  region:Region;

  constructor(
    public http: HttpClient, 
    public router: Router,
    private toastr: ToastrService
  ) { }

  getAll(){
    let url = URL_SERVICIOS + '/region';//?desde=' + desde;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} );
  }
  addOrUpdate(){
    
  }
  update() {
    let url = URL_SERVICIOS + '/region/' + this.region._id;
    return this.http.put( url, this.region ,{ headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( (resp: any) => {
                  this.toastr.success( this.region.nombre, 'region Actualizado!',{ timeOut: 3000 , positionClass: 'toast-top-right'});
                  return true;
                });
  }
  delete(){

  }
  getById(){

  }

}
