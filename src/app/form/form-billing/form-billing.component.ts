import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';
import { ImplicitReceiver } from '@angular/compiler';

@Component({
  selector: 'app-form-horizontal',
  templateUrl: './form-billing.component.html',
  styleUrls: ['./form-billing.component.css']
})

export class FormbillingComponent implements OnInit {
  ngOnInit(): void {
    this.getReportData();
  }
  reportData = [];
  clients = ['Choose Client'];
  transaction_types = ['Choose Transaction Type'];
  client_selected = "";
  transaction_type_selected = "";
  amount = '';

  @ViewChild(FormbillingComponent, { static: false }) table: FormbillingComponent;
  constructor(private reportService: ReportService, private router: Router) {
  }

  getReportData(): void{
    this.reportService.queryReport({ReportId: 604})
      .subscribe(response => this.transformReportData(response));
  }

  transformReportData(reportData: Object[]): void{
    var data1 = JSON.stringify(reportData);
    var data2 = JSON.parse(data1);
    for (var i=0; i < data2.length; i++) {
      this.clients.push(data2[i]["tbl628_client_id"] + " - " + data2[i]["tbl628_last_name"] + ", " + data2[i]["tbl628_first_name"]);
    }

    this.reportService.getDropdownValues("5888").subscribe(response => this.loadTransactionTypes(response));
  }

  loadTransactionTypes(reportData: Object[]): void{
    var data4 = JSON.stringify(reportData);
    var data5 = JSON.parse(data4);
    for (var i=0; i < data5.length; i++) {
      this.transaction_types.push(data5[i]["name"]);
    }
  }

  saveBillingItem(event: any) {
    var data: any;
    var client_parts = this.client_selected.split(" ");
    this.reportService.queryReport({"ReportId": 604,"ConditionGroups": [{"Type": "all","Conditions": [{"ConditionField": {"Id": 5578},"OperationType": "is equal","Value": client_parts[0]}]}] })
      .subscribe(response => this.completeSave(response));
  }

  completeSave(reportData: Object[]): void{
    var data1 = JSON.stringify(reportData);
    var data2 = JSON.parse(data1);
    var data3 = this.reportService.postData(
      {
        "ApplicationTableId": "640",
        "FieldsList": [
            { "Name": "item_type", "Value": this.transaction_type_selected },
            { "Name": "amount", "Value": this.amount},
            { "Name": "related_clients", "Value": data2[0]["id"] }
        ]
      }
    );
    alert("Billing Item Inserted");
    this.router.navigateByUrl('/apps/billinglist');
  }

  onTransactionTypeChange(value) {
    this.transaction_type_selected = value;
  }

  onClientChange(value) {
    this.client_selected = value;
  }
}
