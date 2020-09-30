import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { FilteringComponent } from './pages/filtering.component';
import { Filtering2Component } from './pages/filtering2.component';
import { TransformationComponent } from './pages/transformation.component';
import { Transformation2Component } from './pages/transformation2.component';
import { CreationComponent } from './pages/creation.component';
import { ErrorHandlingComponent } from './pages/error-handling.component';
import { SubjectsComponent } from './pages/subjects.component';
import { Combination2Component } from './pages/combination2.component';
import { CacheExampleComponent } from './pages/cache-example.component';
import { Creation2Component } from './pages/creation2.component';
import {HttpClientModule} from '@angular/common/http';
import { WeatherModule } from './weather/weather.module';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CreationComponent,
    FilteringComponent,
    TransformationComponent,
    Creation2Component,
    ErrorHandlingComponent,
    SubjectsComponent,
    Transformation2Component,
    Combination2Component,
    Filtering2Component,
    CacheExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WeatherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
