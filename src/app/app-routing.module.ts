import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';

const routes: Routes = [
  {path: '', redirectTo: '/f/3', pathMatch: 'full'},
  {path: 'f/:id', component: ForumComponent}

];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
