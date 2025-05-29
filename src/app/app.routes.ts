import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { InfomationComponent } from './components/infomation/infomation.component';


export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'info', component: InfomationComponent}
];