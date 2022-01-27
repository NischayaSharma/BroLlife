import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentReminderPage } from './assignment-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: AssignmentReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentReminderPageRoutingModule {}
