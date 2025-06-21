import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

import { ResearchTeamComponent } from './components/research-team/research-team.component';
import { ProjectComponent } from './components/project/project.component';
import { NewsUpdateComponent } from './components/news-update/news-update.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },

  { path: 'team', component: ResearchTeamComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'test', component: TestComponent },
];
