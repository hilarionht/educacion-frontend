
import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { RoleService } from '../../../services/role/role.service';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  id : any;
  roles: Role[] = [];
  accion:string='Alta';
  constructor(
    public userService: UserService, 
    public rolService: RoleService,
    public routeActivate: ActivatedRoute,
    public router: Router
  ) { 
    this.routeActivate.params.subscribe( param => {
      this.id = param['id'];
      this.user = new User(null,null,null,null,true,null,null,null,null,this.id);
      if(this.id !== '0'){
        this.userService.get(this.id).subscribe((user:any) => {
          this.user = user;
          this.accion='Edicion';
        } );
      }
      
    });
    this.rolService.list().subscribe((resp:any) => {
        this.roles = resp.entities;
      });
  }

  ngOnInit() {
  }
  addUser(form?:NgForm){
    console.log('clicked'+ this.id, 'FormValue: '+ form.value.id);
    
    if(form.value.id ==="0") {
      this.userService.create(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.router.navigate(['config/users']);
        });
    } else {
      this.userService.update(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.router.navigate(['config/users']);
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
