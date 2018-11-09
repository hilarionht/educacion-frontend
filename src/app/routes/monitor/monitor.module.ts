import { ClientesComponent } from './clientes/clientes.component';
import { AgendaComponent } from './agenda/agenda.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { Ng2TableModule } from 'ng2-table';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



const routes: Routes = [
    { path: '', redirectTo: 'monitor' },
    { path: 'agenda', component: AgendaComponent },
    // { path: 'producto/:id', component: ProductoComponent },
    // { path: 'tipoProducto/:id', component: TipoProductoComponent },
    { path: 'clientes', component: ClientesComponent }
    
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        Ng2TableModule,
       // AgGridModule.withComponents([AngulargridComponent]),
        NgxDatatableModule
    ],
    declarations: [
 ClientesComponent,AgendaComponent
    ],
    exports: [
        RouterModule
    ]
})
export class MonitorModule { }