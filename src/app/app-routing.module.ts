import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './components/forum/forum.component';
import { LoginReactiveComponent } from './components/login-reactive/login-reactive.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

const routes: Routes = [
  {path: '', redirectTo: '/f/home', pathMatch: 'full' },
  {path: 'f/:name', component: ForumComponent },
  {path: 'login', component: LoginReactiveComponent },
  {path: 'createPost', component: CreatePostComponent }
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
