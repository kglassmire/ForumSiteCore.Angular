import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ForumService, API_BASE_URL } from './forum.service';
import { environment } from '../environments/environment.prod';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ForumComponent } from './forum/forum.component';


@NgModule({
  declarations: [
    AppComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ForumService, {provide: API_BASE_URL, useValue: environment.apiBaseUrl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
