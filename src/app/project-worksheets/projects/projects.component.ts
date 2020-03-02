import { Component, ViewChild, ViewEncapsulation, OnInit, Input, Output} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import * as tableData from './projects';
import { LocalDataSource } from 'ng2-smart-table';
import { ReportService } from 'src/app/services/report.service';
import { CurrencyPipe, formatCurrency } from '@angular/common';
import { ImplicitReceiver, CompileShallowModuleMetadata } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { ContentSpinnerService } from 'src/app/services/content-spinner.service';
import { NgxDatatableModule, ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'row-details-demo',
  templateUrl: './projects.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit {
  @Input() public input_data = [
    {
        "id":"string",
        "gm_no":"string",
        "estimated_cost":"string"
    }];
  ngOnInit(): void {
    this.getReportData();
  }
  
  rows: any[] = [];
  expanded: any = {};
  timeout: any;
  ColumnMode = ColumnMode;
  sectors = ['All Sectors'];
  selectedSector: string = '';
  applicants = ['All Applicants'];
  selectedApplicant: string = '';
  disasters = ['All Disasters'];
  selectedDisaster: string = '';
  categories = ['All Categories'];
  selectedCategory: string = '';

  @ViewChild('myTable', { static: false }) table: any;
  constructor(
    private spinner: ContentSpinnerService,
    private reportService: ReportService, 
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  getReportData(): void{
    this.route.data
      .subscribe((data: { reportData: Object[] }) => {
        this.transformReportData(data.reportData);
      });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
  }

  openModalEdit(content3, row:any) {
    this.input_data["gm_no"] = row.gm_no;
    this.input_data["estimated_cost"] = row.estimated_cost;
    
    this.modalService.open(content3, { centered: true, size: 'lg' });
  }
  
  transformReportData(reportData: Object[]): void {
    // LOAD DATA
    var data1 = JSON.stringify(reportData);
    while (data1.search("tbl755_") > 0) { data1 = data1.replace("tbl755_",""); }
    var data2 = JSON.parse(data1);
    this.rows = data2;

    // LOAD FILTERS
    this.reportService.getDropdownValues("7599").subscribe(response => this.loadSectors(response));
    this.reportService.getDropdownValues("7602").subscribe(response => this.loadApplicants(response));
    this.reportService.getDropdownValues("7601").subscribe(response => this.loadDisasters(response));
    this.reportService.getDropdownValues("7603").subscribe(response => this.loadCategories(response));
    this.spinner.stop();
  }


  // LOAD FILTERS
  loadSectors(reportData: Object[]): void{
    var data4 = JSON.stringify(reportData);
    var data5 = JSON.parse(data4);
    for (var i=0; i < this.sectors.length; i++) {
      this.sectors.pop();
    }
    this.sectors = ['All Sectors'];
    for (var i=0; i < data5.length; i++) {
      this.sectors.push(data5[i]["name"]);
    }
  }
  loadApplicants(reportData: Object[]): void{
    var data4 = JSON.stringify(reportData);
    var data5 = JSON.parse(data4);
    for (var i=0; i < this.applicants.length; i++) {
      this.applicants.pop();
    }
    this.applicants = ['All Applicants'];
    for (var i=0; i < data5.length; i++) {
      this.applicants.push(data5[i]["name"]);
    }
  }
  loadDisasters(reportData: Object[]): void{
    var data4 = JSON.stringify(reportData);
    var data5 = JSON.parse(data4);
    for (var i=0; i < this.disasters.length; i++) {
      this.disasters.pop();
    }
    this.disasters = ['All Disasters'];
    for (var i=0; i < data5.length; i++) {
      this.disasters.push(data5[i]["name"]);
    }
  }
  loadCategories(reportData: Object[]): void{
    var data4 = JSON.stringify(reportData);
    var data5 = JSON.parse(data4);
    for (var i=0; i < this.categories.length; i++) {
      this.categories.pop();
    }
    this.categories = ['All Categories'];
    for (var i=0; i < data5.length; i++) {
      this.categories.push(data5[i]["name"]);
    }
  }

  onChange($event, sectorValue) {
    console.log(sectorValue);
    alert(sectorValue);
}

  apply_filters(): void {
    //alert(this.selectedSector + " " + this.selectedApplicant + " " + this.selectedCategory + " " + this.selectedDisaster);
    this.rows = [];
    var condition = `{"ReportId": 729,"ConditionGroups": [{"Type": "all","Conditions": [`;
          
    if ((this.selectedSector != "All Sectors" && this.selectedSector != "") || 
        (this.selectedApplicant != "All Applicants" && this.selectedApplicant != "") || 
        (this.selectedCategory != "All Categories" && this.selectedCategory != "") ||
        (this.selectedDisaster != "All Disasters" && this.selectedDisaster != "")) {
          if (this.selectedSector != "All Sectors" && this.selectedSector != "") {
            if (condition[condition.length-1] != '[')
              condition += ","
            condition += `{'ConditionField': {'Id': 7599 },'OperationType': 'is equal','Value': '` + this.selectedSector + `'}`;
          }
          if (this.selectedApplicant != "All Applicants" && this.selectedApplicant != "") {
            if (condition[condition.length-1] != '[')
              condition += ","
            condition += `{'ConditionField': {'Id': 7602 },'OperationType': 'is equal','Value': '` + this.selectedApplicant + `'}`;
          }
          if (this.selectedDisaster != "All Disasters" && this.selectedDisaster != "") {
            if (condition[condition.length-1] != '[')
              condition += ","
            condition += `{'ConditionField': {'Id': 7601 },'OperationType': 'is equal','Value': '` + this.selectedDisaster + `'}`;
          }
          if (this.selectedCategory != "All Categories" && this.selectedCategory != "") {
            if (condition[condition.length-1] != '[')
              condition += ","
            condition += `{'ConditionField': {'Id': 7603 },'OperationType': 'is equal','Value': '` + this.selectedCategory + `'}`;
          }
          
          condition += `]}]}`;
          this.reportService.queryReport(condition).subscribe(response => this.transformReportData(response));
    }
    else
    {
      this.reportService.queryReport({"ReportId": 729})
      .subscribe(response => this.transformReportData(response));
    }
  }

  selectSectorChangeHandler (event: any) {
    this.selectedSector = event.target.value;
  }
  selectApplicantChangeHandler (event: any) {
    this.selectedApplicant = event.target.value;
  }
  selectDisasterChangeHandler (event: any) {
    this.selectedDisaster = event.target.value;
  }
  selectCategoryChangeHandler (event: any) {
    this.selectedCategory = event.target.value;
  }
}
