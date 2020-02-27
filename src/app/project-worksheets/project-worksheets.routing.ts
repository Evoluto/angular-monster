import { Routes } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';

export const ProjectWorksheetsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'projects',
        component: ProjectsComponent,
        data: {
          title: 'Projects',
          urls: [
            { title: 'Projects', url: '/projects' },
            { title: 'Projects' }
          ]
        }
      }
    ]
  }
];
