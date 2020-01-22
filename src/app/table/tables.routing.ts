import { Routes } from '@angular/router';

import { DatatableComponent } from './data-table/data-table.component';
import { SmarttableComponent } from './smart-table/smart-table.component';
import { BasictableComponent } from './basic/basic.component';
import { DarktableComponent } from './dark-basic/dark.component';
import { ColortableComponent } from './color-table/color.component';
import { TablesizeComponent } from './sizing/size.component';
import { ContactsComponent } from './contacts/contacts.component';
import { Contacts1Component } from './contacts1/contacts1.component';
import { MattersComponent } from './matters/matters.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contacts',
        component: ContactsComponent,
        data: {
          title: 'Contacts',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Contacts' }
          ]
        }
      },
      {
        path: 'contacts1',
        component: Contacts1Component,
        data: {
          title: 'Contacts',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Contacts' }
          ]
        }
      },
      {
        path: 'matters',
        component: MattersComponent,
        data: {
          title: 'Matters',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Matters' }
          ]
        }
      },
      {
        path: 'datatable',
        component: DatatableComponent,
        data: {
          title: 'Data Table',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Data Table' }
          ]
        }
      },
      {
        path: 'basictables',
        component: BasictableComponent,
        data: {
          title: 'Basic Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Basic Tables' }
          ]
        }
      },
      {
        path: 'darktables',
        component: DarktableComponent,
        data: {
          title: 'Dark Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dark Tables' }
          ]
        }
      },
      {
        path: 'colortables',
        component: ColortableComponent,
        data: {
          title: 'Color Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Color Tables' }
          ]
        }
      },
      {
        path: 'tablesizing',
        component: TablesizeComponent,
        data: {
          title: 'Table Sizing',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Table Sizing' }
          ]
        }
      },
      {
        path: 'smarttable',
        component: SmarttableComponent,
        data: {
          title: 'Smart Table',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      }
    ]
  }
];
