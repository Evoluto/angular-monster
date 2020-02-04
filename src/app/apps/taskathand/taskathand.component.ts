import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { now } from 'd3';
import { ActivatedRoute } from '@angular/router';
import { ContentSpinnerService } from 'src/app/services/content-spinner.service';


@Component({
  templateUrl: './taskathand.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskathandComponent implements OnInit {
  ngOnInit(): void {
    this.getReportData();
  }
  reportData = [];
  current_task: string = "";
  bg_info: string = "";
  task_status: string = "";
  estimated_time: string = "";
  task_description: string = "";
  start_date: string = "";
  end_date: string = "";
  assigned_to: string = "";
  client: string = "";
  matter_description = "";
  visible_start: boolean = false;
  visible_stop: boolean = false;
  visible_complete: boolean = false;
  task_id: number = 0;

  @ViewChild(TaskathandComponent, { static: false }) table: TaskathandComponent;
  constructor(
    private spinner: ContentSpinnerService,
    private route: ActivatedRoute,
    private reportService: ReportService) {
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
    
    for (var i=0; i < 1; i++) {
      this.task_id = data2[i]["tbl635_id"];
      //alert(data2[i]["tbl635_related_matters"])
      this.current_task = data2[i]["tbl635_task"];
      
      if (data2[i]["tbl635_status"] == "In Progress")
      {
        this.bg_info = "bg-warning";
        this.task_status = "<span class='label label-warning'>" + data2[i]["tbl635_status"] + "</span>";
        //this.buttons = "<button type='button' class='btn btn-primary'>Stop</button>";
        this.visible_start = false;
        this.visible_stop = true;
        this.visible_complete = false;
      }
      if (data2[i]["tbl635_status"] == "In Queue" || data2[i]["tbl635_status"] == "Assigned")
      {
        this.bg_info = "bg-danger";
        this.task_status = "<span class='label label-danger'>" + data2[i]["tbl635_status"] + "</span>";
        
        this.visible_start = true;
        this.visible_stop = false;
        this.visible_complete = false;
      }  
      if (data2[i]["tbl635_status"] == "Completed" || data2[i]["tbl635_status"] == "N/A")
      {
        this.bg_info = "bg-success";
        this.task_status = "<span class='label label-success'>" + data2[i]["tbl635_status"] + "</span>";
        this.visible_start = false;
        this.visible_stop = false;
        this.visible_complete = false;
      }

      this.estimated_time = data2[i]["tbl635_estimated_time"];
      this.task_description = data2[i]["tbl635_description"];
      this.start_date = data2[i]["tbl635_start_dt"];
      this.end_date = data2[i]["tbl635_end_dt"];
      this.assigned_to = data2[i]["tbl630_first_name"] + " " + data2[i]["tbl630_last_name"];
      this.client =  data2[i]["tbl628_first_name"] + " " + data2[i]["tbl628_last_name"];
      this.matter_description = data2[i]["tbl631_description"];
   }

   this.spinner.stop();
  }
  startTimer() {
    var data = this.reportService.putData({"ApplicationTableId": "635","FieldsList": [{ "Id": "5626", "Value": "In Progress" },{"Id": "5703", "Value": now() }],"Where": { "Id": "5618", "Value": this.task_id}});
    alert("Task Updated");
    location.reload();
  }
}
