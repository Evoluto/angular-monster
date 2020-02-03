import {
    Component,
    Input,
    OnDestroy,
    Inject,
    ViewEncapsulation
  } from '@angular/core';
  import {
    Router
  } from '@angular/router';
  import { DOCUMENT } from '@angular/common';
  import { SpinnerService } from '../services/spinner.service';
import { RouteDataService } from '../services/route-data.service';
  
  @Component({
    selector: 'content-spinner',
    template: `<div *ngIf="isSpinnerVisible">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
      </div>`,
    encapsulation: ViewEncapsulation.None
  })
  export class ContentSpinnerComponent implements OnDestroy {
    public isSpinnerVisible = false;
  
    @Input() public backgroundColor = 'rgba(0, 150, 170, 0.3)';
  
    constructor(
      private routeDataService: RouteDataService,
      private spinner: SpinnerService,
      private router: Router,
      @Inject(DOCUMENT) private document: Document
    ) {
        spinner.status.subscribe((status: boolean) => {
            this.isSpinnerVisible = status;
          });
    }
  
    ngOnDestroy(): void {
      this.spinner.stop();
    }
  }
  