import { AfterViewInit, Component } from '@angular/core';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-transformation2',
  templateUrl: './page.template.html',
  styles: []
})
export class Transformation2Component extends PageComponent implements AfterViewInit {
  headline = '';

  ngAfterViewInit(): void {}

  run(): void {

  }
// - advanced transformation: mergeMap, concatMap, switchMap, exhaustMap
}
