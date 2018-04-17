import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForumService, API_BASE_URL, AuthService } from './api.service';
import { MarkdownService } from './markdown.service';
import { environment } from '../environments/environment.prod';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ForumComponent } from './forum/forum.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { ForumSearchComponent } from './forum-search/forum-search.component';
import { LoginComponent } from './login/login.component';
import { CustomInterceptor } from './credential-http-interceptor';
import { AuthenticationService } from './authentication.service';
import { MomentModule } from 'ngx-moment';
import { PostCardComponent } from './post-card/post-card.component';
@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    NavbarComponent,
    FooterComponent,
    ForumSearchComponent,
    LoginComponent,
    PostCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MomentModule
  ],
  providers: [
    ForumService,
    AuthService,
    {provide: API_BASE_URL, useValue: environment.apiBaseUrl},
    MarkdownService,
    {provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true},
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
