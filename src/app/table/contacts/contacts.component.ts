import { Component, ViewChild, OnInit } from '@angular/core';
import { ReportService } from 'src/app/report.service';
import { ImplicitReceiver } from '@angular/compiler';

declare var require: any;
var data;//: any = require('./company.json');
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.css']
})
export class ContactsComponent implements OnInit {
  ngOnInit(): void {
    this.getReportData();
  }
  reportData = [];
  editing = {};
  rows = [];
  temp = [];
  test = [];

  loadingIndicator = true;
  reorderable = true;
  
  columns = [{ prop: 'name' }, { name: 'lastname' }, { name: 'clientid' }];

  @ViewChild(ContactsComponent, { static: false }) table: ContactsComponent;
  constructor(private reportService: ReportService) {
    setTimeout(() => {
      this.loadingIndicator = false; 
    }, 1500);
  }

  getReportData(): void{
    this.reportService.queryReport({ReportId: 604})
      .subscribe(response => this.transformReportData(response));
  }

  transformReportData(reportData: Object[]): void{
    let rowsString = JSON.stringify(reportData);
    rowsString = rowsString.replace(new RegExp("tbl628_first_name", "g"), "name");
    rowsString = rowsString.replace(new RegExp("tbl628_last_name", "g"), "lastname");
    rowsString = rowsString.replace(new RegExp("tbl628_client_id", "g"), "clientid");
    this.rows = JSON.parse(rowsString);
    this.temp = JSON.parse(rowsString);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
}
