import { AfterViewInit, Component } from '@angular/core';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-combination2',
  templateUrl: './page.template.html',
  styles: []
})
export class Combination2Component extends PageComponent implements AfterViewInit {
  headline = '';
  ngAfterViewInit(): void {}

  run(): void {

  }

  combineLatest(): void {}
  forkJoin(): void {}
  startWith(): void {}
  withLatestFrom(): void {}

}
