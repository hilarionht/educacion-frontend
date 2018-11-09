import { Component, OnInit } from '@angular/core';
import { Department } from '../../../models/departament.model';
import { DepartamentService, ProvinceService } from '../../../services/service.index';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Province } from '../../../models/province.model';


@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.scss']
})
export class DepartamentComponent implements OnInit {


  departments: Department[] = [];
  provincs: Province[] = [];
  display:string ="none";
  department: Department;
  id:any;


  constructor(
    public _depService: DepartamentService,
    public _provService: ProvinceService,
    public router: Router

  ) { }

  ngOnInit() {
    this._depService.list().subscribe((resp:any) => {
      this.departments = resp.entities;
    });
    this.department  = new Department(null,null,'0');
    this._provService.list().subscribe(
      (resp:any)=> {
        this.provincs = resp.entities;
      }
    );
  }
  add(){
    let date = new Date();
    this.display = 'block';
    this.department = new Department(null, null,'0');
    
  }
  edit(department:Department){
    this.department = department;
  }
  save(form?: NgForm) {
    
    
    if(form.value.id==='0') {
      this._depService.update(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.getDepartaments();
      });
    } else {
      this._depService.create(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getDepartaments();
        });
    }
    
  }
  getDepartaments(){
    this._depService.list().subscribe((resp:any) => {
      this.departments = resp.entities as Department[];
    });
  }
  close(){
    this.display = 'none';
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      //this.getUsers();
    }
  }

}
