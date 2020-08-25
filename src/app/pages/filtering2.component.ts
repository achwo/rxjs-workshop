import { AfterViewInit, Component } from '@angular/core';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-filtering2',
  templateUrl: './page.template.html',
  styles: []
})
export class Filtering2Component extends PageComponent implements AfterViewInit {
  headline = '';
  ngAfterViewInit(): void {}

  run(): void {

  }

  debounceTime(): void {}
  distinctUntilChanged(): void {}
  takeUntil(): void {}
  takeWhile(): void {}
}
