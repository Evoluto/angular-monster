import { NgModule } from '@angular/core';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

import { ProjectWorksheetsRoutes } from './project-worksheets.routing';
import { ProjectsComponent } from './projects/projects.component';
import { ReportService } from '../services/report.service';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    RouterModule.forChild(ProjectWorksheetsRoutes),
    CommonModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    DataTablesModule,
    NgbModule,
    NgbModalModule.forRoot(),
    FormsModule,
  ],
  declarations: [
    ProjectsComponent
  ]
})
export class ProjectWorksheetsModule {}
