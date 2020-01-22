import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { ReportService } from 'src/app/report.service';
import { ImplicitReceiver } from '@angular/compiler';
//import { ExcelService } from '../../excel.service';

@Component({
  templateUrl: './tasklist.component.html',
  encapsulation: ViewEncapsulation.None
})

export class TasklistComponent implements OnInit {
  ngOnInit(): void {
    this.getReportData();
  }
  reportData = [];
  total_tasks: number = 0;
  in_process_tasks: number = 0;
  in_queue_tasks: number = 0;
  completed_tasks: number = 0;
  task_table: string = "";

  @ViewChild(TasklistComponent, { static: false }) table: TasklistComponent;
  constructor(private reportService: ReportService) {
  }
  

  getReportData(): void{
    this.reportService.queryReport({ReportId: 586})
      .subscribe(response => this.transformReportData(response));
  }

  transformReportData(reportData: Object[]): void{
    var data1 = JSON.stringify(reportData);
    var data2 = JSON.parse(data1);
    this.task_table += "<tr><td><table>";
    
    for (var i=0; i < data2.length; i++) {
      //alert(data2[i]["tbl635_related_matters"])
      this.total_tasks++;
      
      this.task_table += "<tr>";
      if (data2[i]["tbl635_status"] == "In Progress")
      {
        this.in_process_tasks++;
        this.task_table += "<td><span class='label label-warning'>" + data2[i]["tbl635_status"] + "</span></td>";
      }
      if (data2[i]["tbl635_status"] == "In Queue" || data2[i]["tbl635_status"] == "Assigned")
      {
        this.in_queue_tasks++;
        this.task_table += "<td><span class='label label-danger'>" + data2[i]["tbl635_status"] + "</span></td>";
      }  
      if (data2[i]["tbl635_status"] == "Completed" || data2[i]["tbl635_status"] == "N/A")
      {
        this.completed_tasks++;
        this.task_table += "<td><span class='label label-success'>" + data2[i]["tbl635_status"] + "</span></td>";
      }
      this.task_table += "<td><a href='/apps/taskdetails?id=" + data2[i]["id"] + "' class='font-medium link'>" + data2[i]["tbl635_task"] + "</a></td>";
      this.task_table += "<td>" + data2[i]["tbl635_related_roles"] + "</td>";
      this.task_table += "<td>" + data2[i]["tbl630_first_name"] + " " + data2[i]["tbl630_last_name"] + "</td>";
      this.task_table += "</tr>";
    }
    this.task_table += "</table></td></tr>";
  }
  
}
