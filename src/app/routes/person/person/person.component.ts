import { DepartmentService } from './../../../services/department/department.service';
import { LocalityService } from './../../../services/locality/locality.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  templateUrl: './person.component.html',
  styles:[`
  .ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }
  `]
})
export class PersonComponent implements OnInit, OnDestroy {

  person:Person;
  id:any;
  accion:string="Alta";
  localityId: string;
  departmentId: string;
  provinceId: string;
  localities: Locality[] = [];
  departments : Department[] = [];
  provincs: Province[] = [];

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
      this.person = new Person(null,null,null,null,null,null,null,null,null,null,true,this.id);
      if(this.id !== '0'){
        this.personService.getById(this.id).subscribe((pers:any) => {
        
          this.person = pers.data[0];  
          if(pers.data[0].locality.id){
            this.localityId = pers.data[0].locality.id;
            this.departmentId = pers.data[0].locality.department.id;
            this.provinceId = pers.data[0].locality.department.province.id;
            this.person.department = this.departmentId;
            this.person.locality = this.localityId;
            this.person.province = this.provinceId;
            this.loadProvinces();
            this.loadDepartment(this.provinceId);
            this.loadLocalities(this.departmentId);
          }
          this.accion='Edicion';
        } );
      }else{
        this.loadProvinces();
      }
     
    });



   }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.localities = null;
    this.departments = null;
    this.provincs = null;
  }
  addPerson(form?:NgForm){
    if(form.value.id ==="0") {
      this.personService.create(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.router.navigate(['person/persons']);
        });
    } else {
      this.personService.update(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.router.navigate(['person/persons']);
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      //this.getUsers();
    }
  }
  loadProvinces(){
    this._provinceService.list().subscribe((resp:any)=>{
      this.provincs= resp.data;
    });
  }

  loadDepartment(id:string){
    this._departamentService.listbyProvince(id).subscribe((resp:any)=>{
      this.departments = resp.data[0].departments;
      // console.log(this.departments);
    });
  }
  loadLocalities(id:string){
    this._localityService.listbyDepartment(id).subscribe((resp:any)=>{
      this.localities = resp.data[0].localities;
    });
  }
  persons(){
    this.router.navigate(['/person/persons']);
  }
  
}
