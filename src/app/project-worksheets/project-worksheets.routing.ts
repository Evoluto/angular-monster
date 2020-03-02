import { Routes } from '@angular/router';
import { ReportResolverService } from '../services/report-resolver.service';

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
          reportId: 731,
          urls: [
            { title: 'Projects', url: '/projects' },
            { title: 'Projects' }
          ]
          },
          resolve: {
            reportData: ReportResolverService
        }
      }
    ]
  }
];
