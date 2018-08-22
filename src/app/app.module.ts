import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from './credential-http-interceptor';
import { environment } from '../environments/environment';
import { ForumService, AuthService, PostService, API_BASE_URL } from './services/api.service';
import { AuthenticationService, COOKIE_NAME } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { MarkdownService } from './services/markdown.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ForumComponent } from './components/forum/forum.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForumSearchComponent } from './components/forum-search/forum-search.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { LoginReactiveComponent } from './components/login-reactive/login-reactive.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    NavbarComponent,
    FooterComponent,
    ForumSearchComponent,
    PostCardComponent,
    LoginReactiveComponent,
    CreatePostComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MomentModule
  ],
  providers: [
    ForumService,
    AuthService,
    MarkdownService,
    AuthenticationService,
    PostService,
    AlertService,
    {provide: API_BASE_URL, useValue: environment.apiBaseUrl},
    {provide: COOKIE_NAME, useValue: environment.cookieName},
    {provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
