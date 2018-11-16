import { DepartmentService } from './../../../services/department/department.service';
import { LocalityService } from './../../../services/locality/locality.service';
import { Component, OnInit } from '@angular/core';
import { Person } from '../../../models/person.model';
import { PersonService } from '../../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Locality } from './../../../models/locality.model';
import { Department } from '../../../models/departament.model';
import { Province } from '../../../models/province.model';
import { ProvinceService } from '../../../services/province/province.service';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit {

  person:Person;
  id:any;
  accion:string="Alta";

  localitys: Locality[] = [];
  departaments : Department[] = [];
  provinces: Province[] = [];

  constructor(
    public _localityService: LocalityService,
    public _departamentService: DepartmentService,
    public _provinceService: ProvinceService,
    public personService: PersonService, 
    public routeActivate: ActivatedRoute,
    public router: Router

  ) {
    this.routeActivate.params.subscribe( param => {
      this.id = param['id'];
      this.person = new Person(null,null,null,null,null,null,null,null,null,null,null,this.id);
      if(this.id !== '0'){
        this.personService.get(this.id).subscribe((pers:any) => {
          this.person = pers;
          this.accion='Edicion';
        } );
      }
      this._provinceService.list().subscribe((resp:any)=>{
        this.provinces= resp.data;
      });
    });



   }

  ngOnInit() {
  }
  addPerson(form?:NgForm){
    console.log('clicked'+ this.id, 'FormValue: '+ form.value.id);
    
    if(form.value.id ==="0") {
      this.personService.create(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.router.navigate(['person/users']);
        });
    } else {
      this.personService.update(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.router.navigate(['person/users']);
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      //this.getUsers();
    }
  }
}
