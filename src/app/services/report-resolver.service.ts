import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RouteDataService } from './route-data.service';
import { SpinnerService } from './spinner.service';
import { ReportService } from './report.service';

@Injectable({
  providedIn: 'root',
})
export class ReportResolverService implements Resolve<Object[]>{
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Object[] | import("rxjs").Observable<Object[]> | Promise<Object[]> 
    {
    let reportId = this.routeDataService.getData(route, 'reportId');
    this.spinner.start();
    return this.reportService.queryReport({ReportId: reportId});
  }

  constructor(
    private spinner: SpinnerService,
    private reportService: ReportService,
    private routeDataService: RouteDataService) 
    { }

}