import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { LinkService } from '../../services/link.service';
import { Task } from '../../models/task';
import { Link } from '../../models/link';

import "dhtmlx-gantt";
import { ReportService } from 'src/app/services/report.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService, ReportService],
	//template: `<div #gantt_here class='gantt-chart'></div>`,
	templateUrl: './gantt.component.html'
})

export class GanttComponent implements OnInit {
	@ViewChild("gantt_here", {static: true}) ganttContainer: ElementRef;
	
    constructor(private taskService: TaskService, private linkService: LinkService, private reportService: ReportService) { }
	
    ngOnInit() {

		this.reportService.getToken('super_admin@mail.com', 'Miami123.');

		gantt.config.xml_date = '%Y-%m-%d %H:%i';

		gantt.init(this.ganttContainer.nativeElement);

		const dp = gantt.createDataProcessor({
			task: {
				update: (data: Task) => this.taskService.update(data),
				create: (data: Task) => this.taskService.insert(data),
				delete: (id) => this.taskService.remove(id)
			},
			link: {
				update: (data: Link) => this.linkService.update(data),
				create: (data: Link) => this.linkService.insert(data),
				delete: (id) => this.linkService.remove(id)
			}
		});

		Promise.all([this.taskService.get(), this.linkService.get()])
			.then(([data, links]) => {
				gantt.parse({ data, links });
			});
	}
}