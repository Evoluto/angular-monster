import { Component, ViewChild, ViewEncapsulation, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './projects.component.html'
})

export class ProjectsComponent implements OnInit {
  ngOnInit(): void {
    this.getReportData();
  }
  reportData = [];
  pa_category = " ";
  ppid = " ";
  pw_number = " ";
  approx_cost = "$0";
  agencies = ['Select an Agency'];
  projects = ['Select a Project'];
  agency_selected = "";
  project_selected = "";
  thisAgencyID = "";
 
  @ViewChild(ProjectsComponent, { static: false }) table: ProjectsComponent;
  constructor(
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private reportService: ReportService) {
  }

  getReportData(): void{
    this.route.data
    .subscribe((data: { reportData: Object[] }) => {
      this.transformReportData(data.reportData);
    });
    // this.reportService.queryReport({ReportId: 439})
    //   .subscribe(response => {
    //     this.transformReportData(response);
    //   });
  }

  transformReportData(reportData: Object[]): void {
    var data1 = JSON.stringify(reportData);
    var data2 = JSON.parse(data1);

    for (var i=0; i < data2.length; i++) {
      this.agencies.push(data2[i]["tbl385_agency_name"] + " (" + data2[i]["tbl385_sector"] + ")");
    }

    this.reportService.queryReport({ReportId: 550,
      "ConditionGroups": [
        {
            "Type": "all",
            "Conditions": [
                {
                    "ConditionField": {
                        "Id": 2534
                    },
                    "OperationType": "is equal",
                    "Value": this.agency_selected
                }
            ]
        }
      ] })
      .subscribe(response => {
        this.loadProjects(response);
        this.spinner.stop();
      });
  }

  loadProjects(reportData: Object[]): void{
    var data4 = JSON.stringify(reportData);
    var data5 = JSON.parse(data4);

    this.projects = ['Select a Project'];
    for (var i=0; i < data5.length; i++) {
      this.projects.push(data5[i]["tbl386_name"]);
    }

    this.loadData();
  }

  onAgencyChange(value) {
    this.agency_selected = value;

    if (this.agency_selected != "Select an Agency" && this.agency_selected != "") {
      var agency_parts = this.agency_selected.split(" (");
      this.reportService.queryReport({ReportId: 550,
        "ConditionGroups": [
          {
              "Type": "all",
              "Conditions": [
                  {
                      "ConditionField": {
                          "Id": 2534
                      },
                      "OperationType": "is equal",
                      "Value": agency_parts[0] //this.agency_selected
                  }
              ]
          }
        ] })
        .subscribe(response => this.loadProjects(response));
        this.loadData();
    }
    else
    {
      this.loadData();
    }
  }

  onProjectChange(value) {
    this.project_selected = value;
    this.loadData();
  }

  loadData() {
    //var data;
    var agency_parts = this.agency_selected.split(" (");
    
    if (this.project_selected != "Select a Project" && this.agency_selected != "Select an Agency" &&
        this.project_selected != "" && this.agency_selected != "")
    {
      this.reportService.queryReport({"ReportId": 550,
        "ConditionGroups": [
          {
              "Type": "all",
              "Conditions": [
                  {
                    "ConditionField": {
                        "Id": 2540
                    },
                    "OperationType": "is equal",
                    "Value": this.project_selected
                  },
                  {
                    "ConditionField": {
                        "Id": 2534
                    },
                    "OperationType": "is equal",
                    "Value": agency_parts[0]
                }
              ]
          }
      ] })
      .subscribe(response => this.loadDataResults(response));
    }
    // else if (this.transaction_type_selected != "All Transaction Types" && this.transaction_type_selected != "")
    // {
    //   data = this.reportService.queryReport({"ReportId": 631,
    //     "ConditionGroups": [
    //       {
    //           "Type": "all",
    //           "Conditions": [
    //               {
    //                   "ConditionField": {
    //                       "Id": 5888
    //                   },
    //                   "OperationType": "is equal",
    //                   "Value": this.transaction_type_selected
    //               }
    //           ]
    //       }
    //   ] })
    //   .subscribe(response => this.loadDataResults(response));
    // }
    // else if (this.agency_selected != "All Clients" && this.agency_selected != "")
    // {
    //   this.reportService.queryReport({"ReportId": 631,
    //     "ConditionGroups": [
    //       {
    //           "Type": "all",
    //           "Conditions": [
    //               {
    //                   "ConditionField": {
    //                       "Id": 5890
    //                   },
    //                   "OperationType": "is equal",
    //                   "Value": this.thisAgencyID
    //               }
    //           ]
    //       }
    //   ] })
    //   .subscribe(response => this.loadDataResults(response));
    // }
    // else
    // {
    //   this.reportService.queryReport({"ReportId": 631})
    //   .subscribe(response => this.loadDataResults(response));
    // }
  }
  
  loadDataResults(reportData: Object[]): void{
    var data1 = JSON.stringify(reportData);
    var data2 = JSON.parse(data1);
    this.pa_category = "";
    this.pa_category = data2[0]["tbl386_custom_pa_category"];
    this.ppid = data2[0]["tbl386_custom_preliminary_project_id"];
    this.pw_number = data2[0]["tbl386_custom_pw_number"];
    this.approx_cost = data2[0]["tbl535_approx_cost"];

    // this.balance = 0;
    // this.total_deposits = 0;
    // this.total_invoices = 0;
    // this.total_to_bill = 0;
    // this.billing_table = "<tr><td><table>";
    
    // for (var i=0; i < data2.length; i++) {
    //   this.billing_table += "<tr><td>" + data2[i]["tbl628_first_name"] + " " + data2[i]["tbl628_last_name"] + "</td>";
    //   if (data2[i]["tbl640_item_type"] == "Deposit")
    //   { 
    //     this.balance += parseFloat(data2[i]["tbl640_amount"]);
    //     this.total_deposits += parseFloat(data2[i]["tbl640_amount"]);
    //     this.billing_table += "<td><span class='label label-success'>" + data2[i]["tbl640_item_type"] + "</span></td>";
    //     this.billing_table += "<td>$" + data2[i]["tbl640_amount"] + "</td>";
    //   }
    //   if (data2[i]["tbl640_item_type"] == "Invoice")
    //   { 
    //     this.balance -= parseFloat(data2[i]["tbl640_amount"]);
    //     this.total_invoices += parseFloat(data2[i]["tbl640_amount"]);
    //     this.billing_table += "<td><span class='label label-warning'>" + data2[i]["tbl640_item_type"] + "</span></td>";
    //     this.billing_table += "<td><span class='text-danger'>$" + data2[i]["tbl640_amount"] + "</span></td>";
    //   }

    //   this.billing_table += "</tr>";
    // }
    // this.billing_table += "</table></td></tr>";

    // this.reportService.queryReport({ReportId: 586}).subscribe(response => this.getToBill(response));
  }

  // getToBill(reportData: Object[]) {
  //   var data4 = JSON.stringify(reportData);
  //   var data5 = JSON.parse(data4);

  //   var include = true;
  //   for (var i=0; i < data5.length; i++) {
  //     include = true;
  //     if (data5[i]["tbl635_status"] == "In Queue" || data5[i]["tbl635_status"] == "Assigned" ||
  //         data5[i]["tbl635_status"] == "In Progress")
  //         {
  //           if (this.agency_selected != "Select Agency" && this.agency_selected != "")
  //             if (this.agency_selected.split(" ")[0] != data5[i]["tbl628_client_id"])
  //               include = false;
  //           if (include) {
  //             var current_amt = parseFloat(data5[i]["tbl635_estimated_time"]) * parseFloat(data5[i]["tbl630_rate"]);
  //             // this.total_to_bill += current_amt;
  //           }
  //         }
  //   }
  // }

  // getAgencyIDResults(reportData: Object[]): void {
  //   var data1 = JSON.stringify(reportData);
  //   var data2 = JSON.parse(data1);
  //   this.thisAgencyID = data2[0]["id"];
  //   this.loadData();
  //   //return (data2[0]["id"]);
  // }
}
