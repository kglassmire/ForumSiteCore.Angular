import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { LoginReactiveComponent } from './login-reactive/login-reactive.component';

const routes: Routes = [
  {path: '', redirectTo: '/f/home', pathMatch: 'full' },
  {path: 'f/:name', component: ForumComponent },
  {path: 'login', component: LoginReactiveComponent },
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
