import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TablesRoutes } from './tables.routing';
import { DatatableComponent } from './data-table/data-table.component';
import { SmarttableComponent } from './smart-table/smart-table.component';
import { BasictableComponent } from './basic/basic.component';
import { DarktableComponent } from './dark-basic/dark.component';
import { ColortableComponent } from './color-table/color.component';
import { TablesizeComponent } from './sizing/size.component';
import { ContactsComponent } from './contacts/contacts.component';
import { Contacts1Component } from './contacts1/contacts1.component';
import { MattersComponent } from './matters/matters.component';
import { ReportService } from '../report.service';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    RouterModule.forChild(TablesRoutes),
    CommonModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    DataTablesModule
  ],
  declarations: [
    DatatableComponent,
    BasictableComponent,
    DarktableComponent,
    ColortableComponent,
    TablesizeComponent,
    SmarttableComponent,
    ContactsComponent,
    Contacts1Component,
    MattersComponent
  ],
  providers: [
    ReportService
  ]
})
export class TablesModule {}
