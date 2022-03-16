import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: 'assignment-reminder',
    loadChildren: './tab1/assignment-reminder/assignment-reminder.module#AssignmentReminderPageModule'
  },
  // {
  //   path: 'articles',
  //   loadChildren: () => import('./tab2/articles/articles.module').then( m => m.ArticlesPageModule)
  // }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
