import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { AngularTableComponent } from "../table/angular-table/angular-table.component";
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-simple-table-page',
  imports: [SidebarComponent, FooterComponent, AngularTableComponent, HeaderComponent],
  templateUrl: './simple-table-page.component.html',
  styleUrl: './simple-table-page.component.scss'
})
export class SimpleTablePageComponent {

}
