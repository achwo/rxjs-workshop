import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CacheExampleComponent } from './pages/cache-example.component';
import { Combination2Component } from './pages/combination2.component';
import { CreationComponent } from './pages/creation.component';
import { ErrorHandlingComponent } from './pages/error-handling.component';
import { FilteringComponent } from './pages/filtering.component';
import { Filtering2Component } from './pages/filtering2.component';
import { SubjectsComponent } from './pages/subjects.component';
import { TransformationComponent } from './pages/transformation.component';
import { Transformation2Component } from './pages/transformation2.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  { path: 'page1', component: CreationComponent },
  { path: 'page2', component: FilteringComponent },
  { path: 'page3', component: TransformationComponent },
  { path: 'page4', component: ErrorHandlingComponent },
  { path: 'page5', component: SubjectsComponent },
  { path: 'page6', component: Transformation2Component },
  { path: 'page7', component: Combination2Component },
  { path: 'page8', component: Filtering2Component },
  // { path: 'page4', component: Creation2Component },
  { path: 'cache', component: CacheExampleComponent },
  { path: 'weather', component: WeatherComponent },
  { path: '**', redirectTo: 'page1' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
