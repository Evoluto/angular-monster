import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { CurrencyPipe, formatCurrency } from '@angular/common';
import { ImplicitReceiver } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { ContentSpinnerService } from 'src/app/services/content-spinner.service';

@Component({
  templateUrl: './billinglist.component.html',
  encapsulation: ViewEncapsulation.None
})

export class BillinglistComponent implements OnInit {
  ngOnInit(): void {
    this.getReportData();
  }
  reportData = [];
  balance: number = 0;
  total_deposits: number = 0;
  total_invoices: number = 0;
  total_to_bill: number = 0;
  billing_table: string = "";
  clients = ['All Clients'];
  transaction_types = ['All Transaction Types'];
  client_selected = "";
  transaction_type_selected = "";
  thisClientID = "";
 
  @ViewChild(BillinglistComponent, { static: false }) table: BillinglistComponent;
  constructor(
    private spinner: ContentSpinnerService,
    private reportService: ReportService, 
    private route: ActivatedRoute,) {
  }

  getReportData(): void{
    this.route.data
      .subscribe((data: { reportData: Object[] }) => {
        this.transformReportData(data.reportData);
      });
  }

  transformReportData(reportData: Object[]): void {
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

    this.loadData();
  }

  onTransactionTypeChange(value) {
    this.transaction_type_selected = value;
    this.loadData();
  }

  onClientChange(value) {
    this.client_selected = value;

    if (this.client_selected != "All Clients" && this.client_selected != "") {
      var client_parts = this.client_selected.split(" ");
      this.reportService.queryReport({"ReportId": 604,
        "ConditionGroups": [
          {
              "Type": "all",
              "Conditions": [
                  {
                      "ConditionField": {
                          "Id": 5578
                      },
                      "OperationType": "is equal",
                      "Value": client_parts[0]
                  }
              ]
          }
      ] })
      .subscribe(response => this.getClientIDResults(response));
    }
    else
    {
      this.loadData();
    }
  }

  loadData() {
    var data;
    if (this.transaction_type_selected != "All Transaction Types" && this.client_selected != "All Clients" &&
        this.transaction_type_selected != "" && this.client_selected != "")
    {
      this.reportService.queryReport({"ReportId": 631,
        "ConditionGroups": [
          {
              "Type": "all",
              "Conditions": [
                  {
                    "ConditionField": {
                        "Id": 5888
                    },
                    "OperationType": "is equal",
                    "Value": this.transaction_type_selected
                  },
                  {
                    "ConditionField": {
                        "Id": 5890
                    },
                    "OperationType": "is equal",
                    "Value": this.thisClientID
                }
              ]
          }
      ] })
      .subscribe(response => this.loadDataResults(response));
    }
    else if (this.transaction_type_selected != "All Transaction Types" && this.transaction_type_selected != "")
    {
      data = this.reportService.queryReport({"ReportId": 631,
        "ConditionGroups": [
          {
              "Type": "all",
              "Conditions": [
                  {
                      "ConditionField": {
                          "Id": 5888
                      },
                      "OperationType": "is equal",
                      "Value": this.transaction_type_selected
                  }
              ]
          }
      ] })
      .subscribe(response => this.loadDataResults(response));
    }
    else if (this.client_selected != "All Clients" && this.client_selected != "")
    {
      this.reportService.queryReport({"ReportId": 631,
        "ConditionGroups": [
          {
              "Type": "all",
              "Conditions": [
                  {
                      "ConditionField": {
                          "Id": 5890
                      },
                      "OperationType": "is equal",
                      "Value": this.thisClientID
                  }
              ]
          }
      ] })
      .subscribe(response => this.loadDataResults(response));
    }
    else
    {
      this.reportService.queryReport({"ReportId": 631})
      .subscribe(response => this.loadDataResults(response));
    }
  }
  
  loadDataResults(reportData: Object[]): void{
    var data1 = JSON.stringify(reportData);
    var data2 = JSON.parse(data1);
    this.balance = 0;
    this.total_deposits = 0;
    this.total_invoices = 0;
    this.total_to_bill = 0;
    this.billing_table = "<tr><td><table>";
    
    for (var i=0; i < data2.length; i++) {
      this.billing_table += "<tr><td>" + data2[i]["tbl628_first_name"] + " " + data2[i]["tbl628_last_name"] + "</td>";
      if (data2[i]["tbl640_item_type"] == "Deposit")
      { 
        this.balance += parseFloat(data2[i]["tbl640_amount"]);
        this.total_deposits += parseFloat(data2[i]["tbl640_amount"]);
        this.billing_table += "<td><span class='label label-success'>" + data2[i]["tbl640_item_type"] + "</span></td>";
        this.billing_table += "<td>$" + data2[i]["tbl640_amount"] + "</td>";
      }
      if (data2[i]["tbl640_item_type"] == "Invoice")
      { 
        this.balance -= parseFloat(data2[i]["tbl640_amount"]);
        this.total_invoices += parseFloat(data2[i]["tbl640_amount"]);
        this.billing_table += "<td><span class='label label-warning'>" + data2[i]["tbl640_item_type"] + "</span></td>";
        this.billing_table += "<td><span class='text-danger'>$" + data2[i]["tbl640_amount"] + "</span></td>";
      }

      this.billing_table += "</tr>";
    }
    this.billing_table += "</table></td></tr>";

    this.reportService.queryReport({ReportId: 586}).subscribe(response => this.getToBill(response));
  }

  getToBill(reportData: Object[]) {
    var data4 = JSON.stringify(reportData);
    var data5 = JSON.parse(data4);

    var include = true;
    for (var i=0; i < data5.length; i++) {
      include = true;
      if (data5[i]["tbl635_status"] == "In Queue" || data5[i]["tbl635_status"] == "Assigned" ||
          data5[i]["tbl635_status"] == "In Progress")
          {
            if (this.client_selected != "All Clients" && this.client_selected != "")
              if (this.client_selected.split(" ")[0] != data5[i]["tbl628_client_id"])
                include = false;
            if (include) {
              var current_amt = parseFloat(data5[i]["tbl635_estimated_time"]) * parseFloat(data5[i]["tbl630_rate"]);
              this.total_to_bill += current_amt;
            }
          }
    }

    this.spinner.stop();
  }

  getClientIDResults(reportData: Object[]): void {
    var data1 = JSON.stringify(reportData);
    var data2 = JSON.parse(data1);
    this.thisClientID = data2[0]["id"];
    this.loadData();
    //return (data2[0]["id"]);
  }
}
