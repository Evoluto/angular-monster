import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/report.service';

@Component({
  templateUrl: './taskdetails.component.html'
})
export class TaskdetailsComponent implements OnInit {
  task: string = "";
  taskid: number = 0;
  task_status: string = "";
  assigned_to: string = "";
  role: string = "";
  client_name: string = "";
  client_email: string = "";

  constructor(reportService: ReportService, private activatedRoute: ActivatedRoute) {
    this.ngOnInit();
    var data = reportService.queryReport({"ReportID": 586,"ConditionGroups": [{"Type": "all","Conditions": [{"ConditionField": {
"Id": 5618},"OperationType": "is equal","Value": this.taskid}]}]});
    var data1 = JSON.stringify(data);
    var data2 = JSON.parse(data1);
    if (data2[0] != undefined) {
      this.task = data2[0]["tbl635_task"]; 
      this.task_status = "<span class='label label-warning'>" + data[0].tbl635_status + "</span>"
      if (data2[0]["tbl635_status"] == "In Progress")
      {
        this.task_status = "<span class='label label-warning'>" + data[0].tbl635_status + "</span>"
      }
      if (data2[0]["tbl635_status"] == "In Queue" || data2[0]["tbl635_status"] == "Assigned")
      {
        this.task_status = "<span class='label label-danger'>" + data[0].tbl635_status + "</span>"
      }  
      if (data2[0]["tbl635_status"] == "Completed" || data2[0]["tbl635_status"] == "N/A")
      {
        this.task_status = "<span class='label label-success'>" + data[0].tbl635_status + "</span>"
      }
      this.assigned_to = data2[0]["tbl630_first_name"] + " " + data2[0]["tbl630_last_name"];
      this.role = data2[0]["tbl635_related_roles"];
      this.client_name = data2[0]["tbl628_first_name"] + " " + data2[0]["tbl628_last_name"];
      this.client_email = data2[0]["tbl628_email1"]
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.taskid = params['id'];
    });
  }
}
