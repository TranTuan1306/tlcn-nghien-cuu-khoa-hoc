import { Component, OnInit, HostListener } from '@angular/core';
// eslint-disable-next-line no-unused-vars
declare function xPathClick(path: string): unknown;

@Component({
  selector: 'app-management-layout',
  templateUrl: './management-layout.component.html',
  styleUrls: ['./management-layout.component.scss']
})
export class ManagementLayoutComponent implements OnInit {

  isCollapsed = false;

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth < 1001) {
      this.isCollapsed = true;
    } else if (window.innerWidth > 1999) {
      this.isCollapsed = false;
    }
  }

  ngOnInit() {
    setTimeout(() => {
      if (window.innerWidth < 1001) {
        xPathClick('/html/body/app-root/app-management-layout/nz-layout/nz-layout/nz-header/app-management-header/div[1]/i');
      }
    }, 2000);
  }

  changeCollapse(status: boolean) {
    this.isCollapsed = status;
  }
}
