import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignmentReminderPageRoutingModule } from './assignment-reminder-routing.module';

import { AssignmentReminderPage } from './assignment-reminder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignmentReminderPageRoutingModule
  ],
  declarations: [AssignmentReminderPage]
})
export class AssignmentReminderPageModule {}
