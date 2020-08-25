import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Combination2Component } from './pages/combination2.component';
import { Creation2Component } from './pages/creation2.component';
import { ErrorHandlingComponent } from './pages/error-handling.component';
import { Filtering2Component } from './pages/filtering2.component';
import { FilteringComponent } from './pages/filtering.component';
import { TransformationComponent } from './pages/transformation.component';
import { SubjectsComponent } from './pages/subjects.component';
import { Transformation2Component } from './pages/transformation2.component';
import { CreationComponent } from './pages/creation.component';

const routes: Routes = [
  { path: 'page1', component: CreationComponent },
  { path: 'page2', component: FilteringComponent },
  { path: 'page3', component: TransformationComponent },
  { path: 'page4', component: Creation2Component },
  { path: 'page5', component: ErrorHandlingComponent },
  { path: 'page6', component: SubjectsComponent },
  { path: 'page7', component: Transformation2Component },
  { path: 'page8', component: Combination2Component },
  { path: 'page9', component: Filtering2Component },
  { path: '**', redirectTo: 'page1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
