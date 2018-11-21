
import { Person } from './../../../models/person.model';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/service.index';
import { Router } from '@angular/router';


@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit {


  person :Person;
  persons : Person [] =[];

  constructor( 
    public _personService: PersonService,
    public router: Router
    ) { }

  ngOnInit() {
    this.loadPersons();
  }
  edit(id:string){
    console.log(id);
    
    this.router.navigate(['/person/person', id]);
  }
  delete(id: string){
    this._personService.delete(id).subscribe(()=>{ this.loadPersons(); });
  }
  loadPersons(){
    this._personService.list().subscribe((resp:any) => {
      this.persons = resp.data;
    });
  }
}
