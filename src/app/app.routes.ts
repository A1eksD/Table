import { Routes } from '@angular/router';
import { HomeComponentComponent } from './component/home-component/home-component.component';
import { PrimeTableComponent } from './component/table/prime-table/prime-table.component';
import { AngularTableComponent } from './component/table/angular-table/angular-table.component';
import { SimpleTablePageComponent } from './component/simple-table-page/simple-table-page.component';

export const routes: Routes = [
    { path: '', component: SimpleTablePageComponent },
    { path: 'table', component: HomeComponentComponent },
    { path: 'table/ang', component: AngularTableComponent },
    { path: 'table/prime', component: PrimeTableComponent }
];
