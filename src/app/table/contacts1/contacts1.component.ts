import { Component, ViewChild, OnInit } from '@angular/core';
import { ReportService } from 'src/app/report.service';

@Component({
  selector: 'app-contacts1',
  templateUrl: './contacts1.component.html',
  styleUrls: ['./contacts1.css']
})
export class Contacts1Component implements OnInit {
  ngOnInit(): void {
    this.getReportData();
  }
  reportData = [];
  dtOptions: DataTables.Settings = {};
  contacts: any[] = [];

  @ViewChild(Contacts1Component, { static: false }) table: Contacts1Component;
  constructor(private reportService: ReportService) {
    setTimeout(() => {
    }, 1500);
  }

  getReportData(): void{
    this.reportService.queryReport({ReportId: 604})
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
    this.contacts = JSON.parse(rowsString);
  }
}
