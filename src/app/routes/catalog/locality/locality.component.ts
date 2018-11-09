import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Locality } from '../../../models/locality.model';
import { LocalityService } from '../../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locality',
  templateUrl: './locality.component.html',
  styleUrls: ['./locality.component.scss']
})
export class LocalityComponent implements OnInit {

  
  localitys: Locality[] = [];
  display:string ="none";
  locality: Locality;
  id:any;


  constructor(
    public _provService: LocalityService,
    public router: Router

  ) { }

  ngOnInit() {
    this._provService.list().subscribe((resp:any) => {
      this.localitys = resp.entities;
    });
    this.locality  = new Locality(null,'0');
  }
  add(){
    let date = new Date();
    this.display = 'block';
    this.locality = new Locality(null, '0');
    
  }
  edit(locality:Locality){
    this.locality = locality;
  }
  save(form?: NgForm) {
    
    
    if(form.value.id==='0') {
      this._provService.update(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.getLocalitys();
      });
    } else {
      this._provService.create(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getLocalitys();
        });
    }
    
  }
  getLocalitys(){
    this._provService.list().subscribe((resp:any) => {
      this.localitys = resp.entities as Locality[];
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
