import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from './credential-http-interceptor';
import { environment } from '../environments/environment.prod';
import { ForumService, AuthService, PostService, API_BASE_URL } from './api.service';
import { AuthenticationService, COOKIE_NAME } from './authentication.service';
import { MarkdownService } from './markdown.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ForumComponent } from './forum/forum.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ForumSearchComponent } from './forum-search/forum-search.component';
import { LoginComponent } from './login/login.component';
import { PostCardComponent } from './post-card/post-card.component';
import { LoginReactiveComponent } from './login-reactive/login-reactive.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    NavbarComponent,
    FooterComponent,
    ForumSearchComponent,
    LoginComponent,
    PostCardComponent,
    LoginReactiveComponent,
    CreatePostComponent
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
    {provide: API_BASE_URL, useValue: environment.apiBaseUrl},
    {provide: COOKIE_NAME, useValue: environment.cookieName},
    {provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
