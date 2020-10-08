import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LayoutService } from '../../../shared/services/layout.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel-admin.component.html',
  styleUrls: ['./left-panel-admin.component.scss']
})
export class LeftPanelAdminComponent implements OnInit {
  asidebarHeight: number;

  @Input() navLayout: string;
  @Input() defaultNavbar: string;
  @Input() toggleNavbar: string;
  @Input() toggleStatus: boolean;
  @Input() navbarEffect: string;
  @Input() deviceType: string;
  @Input() headerColorTheme: string;
  @Input() navbarColorTheme: string;
  @Input() activeNavColorTheme: string;
  imageurl = '../../../../assets/avatar3.jpg';
  title: any;
  menuList: any;
  selected: any;
  userName: any;
  constructor(private layoutService: LayoutService) {}

  isActive(item) {
    return this.selected === item;
  }
  onItemSelect(item) {
    this.selected = this.selected === item ? item : item;
  }
  onSubItemSelect(item) {
    event.stopPropagation();
    this.selected = this.selected === item ? item : item;
  }

  @HostListener('window:resize', ['$event'])
  onResizeHeight(event: any) {
    this.asidebarHeight = window.innerHeight;
  }

  ngOnInit() {
    this.layoutService.setAsidebarHeightCast.subscribe(
      setSidebarHeight => (this.asidebarHeight = setSidebarHeight)
    );

    this.title = 'Navigation';

    this.menuList = [
      {
        name: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        url: '/headofficeentry/dashboard'
      },
      {
        name: 'UserTransactions',
        icon: 'fas fa-credit-card',
        url: '/headofficeentry/usertransactions'
      },
      {
        name: 'Customers',
        icon: 'fas fa-users',
        url: '/headofficeentry/customers'
      },
      {
        name: 'Reports',
        icon: 'fas fa-file',
        url: '/headofficeentry/reports'
      },
      {
        name: 'EditProfile',
        icon: 'fas fa-user',
        url: '/headofficeentry/editprofile'
      }
      
    ];
  }
}
