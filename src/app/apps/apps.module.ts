import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { QuillModule } from 'ngx-quill';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ReportService } from '../services/report.service';

import { AppsRoutes } from './apps.routing';
import { ChatComponent } from './chat/chat.component';
import { TicketlistComponent } from './ticketlist/ticketlist.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskathandComponent } from './taskathand/taskathand.component';
import { BillinglistComponent } from './billinglist/billinglist.component';
import { ProjectsComponent } from './projects/projects.component';
import { GanttComponent } from '../charts/gantt/gantt.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    QuillModule.forRoot(),
    DragulaModule.forRoot(),
    RouterModule.forChild(AppsRoutes),
    PerfectScrollbarModule,
    HttpClientModule
  ],
  declarations: [
    ChatComponent,
    TicketlistComponent,
    TicketdetailsComponent,
    TasklistComponent,
    TaskathandComponent,
    TaskdetailsComponent,
    TaskboardComponent,
    BillinglistComponent,
    ProjectsComponent,
    GanttComponent,
    FullcalendarComponent
  ]
})
export class AppsModule {}
