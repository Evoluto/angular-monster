import { Component, ViewChild, OnInit } from '@angular/core';
import { ReportService } from 'src/app/report.service';

@Component({
  selector: 'app-matters',
  templateUrl: './matters.component.html',
  styleUrls: ['./matters.css']
})
export class MattersComponent implements OnInit {
  ngOnInit(): void {
    this.getReportData();
  }
  reportData = [];
  dtOptions: DataTables.Settings = {};
  matters: any[] = [];
  
  @ViewChild(MattersComponent, { static: false }) table: MattersComponent;
  constructor(private reportService: ReportService) {
    setTimeout(() => {
    }, 1500);
  }
  
  getReportData(): void{
    this.reportService.queryReport({ReportId: 603})
      .subscribe(response => this.transformReportData(response));
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      ordering: true,
      searching: true
    };
  }

  transformReportData(reportData: Object[]): void{
    let rowsString = JSON.stringify(reportData);
    this.matters = JSON.parse(rowsString);
  }
}
