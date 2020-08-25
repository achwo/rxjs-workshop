import { AfterViewInit, Component } from '@angular/core';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-error-handling',
  templateUrl: './page.template.html',
  styles: []
})
export class ErrorHandlingComponent extends PageComponent implements AfterViewInit {
  headline = '';

  ngAfterViewInit(): void {}

  run(): void {
  }
// todo  catchError, throwError, retry, retryWhen, delay, delayWhen, finalize
}
