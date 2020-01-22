import { Component } from '@angular/core';
import { ReportService } from 'src/app/report.service';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent {
  assigned_tasks: string = "";

  constructor(reportService: ReportService) {
    var data = reportService.queryReport({"ReportID": 586});
    var data1 = JSON.stringify(data);
    var data2 = JSON.parse(data1);
    if (data2[0] != undefined) {
      for (var i=0; i<data2.length; i++) {
        if (data2[i]["tbl635_status"] == "In Queue" || data2[i]["tbl635_status"] == "Assigned")
        {
          this.assigned_tasks += "<div class='taskboard-task'><div class='taskboard-task-title'>";
          this.assigned_tasks += data2[i]["tbl635_task"];
          this.assigned_tasks += "</div><small class='card-text text-muted'>";
          this.assigned_tasks += data2[i]["tbl635_description"];
          this.assigned_tasks += "</small></div>";
        }
      }
    }
  }
}
