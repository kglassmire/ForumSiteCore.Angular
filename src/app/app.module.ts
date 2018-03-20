import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ForumService, API_BASE_URL } from './forum.service';
import { MarkdownService } from './markdown.service';
import { environment } from '../environments/environment.prod';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ForumComponent } from './forum/forum.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { ForumSearchComponent } from './forum-search/forum-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    NavbarComponent,
    FooterComponent,
    ForumSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [ForumService, {provide: API_BASE_URL, useValue: environment.apiBaseUrl}, MarkdownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
