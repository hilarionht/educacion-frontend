import { UserService } from './../../services/user/user.service';
import { Injectable } from '@angular/core';
import { log } from 'util';

@Injectable()
export class MenuService {

    menuItems: Array<any>;

    constructor(public _userService: UserService) {
        this.menuItems = [];
    }

    addMenu(items: Array<{
        text: string,
        heading?: boolean,
        link?: string,     // internal route links
        elink?: string,    // used only for external links
        target?: string,   // anchor target="_blank|_self|_parent|_top|framename"
        icon?: string,
        alert?: string,
        submenu?: Array<any>
    }>) {

        items.forEach((item) => {
            this.menuItems.push(item);
            //console.log(this.menuItems,'menu');
            
        });
    }

    getMenu() {
        this.menuItems.forEach((menu)=>{
            
            menu.submenu.forEach((submenu)=> {
                let existe = false;
                submenu.role.forEach((rol)=>{
                    let roleid = this._userService.role.id;
                    if(parseInt(rol) === parseInt(roleid)){
                        existe = true;
                    }
                });
                if(!existe){
                   menu.submenu.splice(submenu,1);
                }
            });
           
        });
        for (let i = 0; i < this.menuItems.length; i++) {
            const element = this.menuItems[i];
            let rol = new Array();
            rol = element.role;
            let existe = false;
            for (let j = 0; j < rol.length; j++) {
                const r = rol[j];
                if(parseInt(r) === parseInt(this._userService.role.id)){
                    existe = true;
                }
            }
           
            
        }
        return this.menuItems;
    }

}
