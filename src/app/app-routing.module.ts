import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/f/home', pathMatch: 'full' },
  {path: 'f/:name', component: ForumComponent },
  {path: 'login', component: LoginComponent }

];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ]
})
export class AppRoutingModule { }
