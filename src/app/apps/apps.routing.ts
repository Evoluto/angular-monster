import { Routes } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { TicketlistComponent } from './ticketlist/ticketlist.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskathandComponent } from './taskathand/taskathand.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { BillinglistComponent } from './billinglist/billinglist.component';
import { ProjectsComponent } from './projects/projects.component';
import { GanttComponent } from './gantt/gantt.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';

export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chat',
        component: ChatComponent,
        data: {
          title: 'Chat App',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Chat App' }
          ]
        }
      },
      {
        path: 'ticketlist',
        component: TicketlistComponent,
        data: {
          title: 'Ticket List',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Ticket List' }
          ]
        }
      },
      {
        path: 'ticketdetails',
        component: TicketdetailsComponent,
        data: {
          title: 'Ticket Details',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Ticket Details' }
          ]
        }
      },
      {
        path: 'tasklist',
        component: TasklistComponent,
        data: {
          title: 'Task List',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Task List' }
          ]
        }
      },
      {
        path: 'taskathand',
        component: TaskathandComponent,
        data: {
          title: 'Task At Hand',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Task At Hand' }
          ]
        }
      },
      {
        path: 'taskdetails',
        component: TaskdetailsComponent,
        data: {
          title: 'Task Details',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Task Details' }
          ]
        }
      },
      {
        path: 'taskboard',
        component: TaskboardComponent,
        data: {
          title: 'Taskboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Taskboard' }
          ]
        }
      },
      {
        path: 'billinglist',
        component: BillinglistComponent,
        data: {
          title: 'Billing List',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Billing List' }
          ]
        }
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: {
          title: 'Projects',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Projects' }
          ]
        }
      },
      {
        path: 'gantt',
        component: GanttComponent,
        data: {
          title: 'Gantt',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Gantt' }
          ]
        }
      },
      {
        path: 'fullcalendar',
        component: FullcalendarComponent,
        data: {
          title: 'Full-Calendar',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Full-Calendar' }
          ]
        }
      }
    ]
  }
];
