import { AfterViewInit, Component } from '@angular/core';
import { concat, of, throwError } from 'rxjs';
import { catchError, concatMap, delay, finalize, retry, retryWhen, take } from 'rxjs/operators';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-error-handling',
  templateUrl: './page.template.html',
  styles: [],
})
export class ErrorHandlingComponent extends PageComponent implements AfterViewInit {
  headline = '';

  ngAfterViewInit(): void {}

  run(): void {
    this.retrying();
  }

  throwingErrors(): void {
    throwError(new Error('This is an error')).subscribe({
      next: (_) => this.card.info('Der next-Block wird nie erreicht'),
      error: (e: Error) => this.card.result(e.message),
      complete: () => this.card.info('Der complete-Block wird immer aufgerufen'),
    });
    this.facts.add('throwError erzeugt ein Observable, das nur einen Fehler emitted');
  }

  catchingErrors(): void {
    throwError(new Error('This is an error'))
      .pipe(catchError((e) => of('Default-Wert')))
      .subscribe((v) => this.card.result(v));

    this.facts.add(
      'catchError fängt einen Fehler und ermöglicht die Rückgabe eines anderen Observables'
    );
  }

  finalizing(): void {
    throwError(new Error('This is an error'))
      .pipe(finalize(() => this.card.result('Finalize wurde aufgerufen.')))
      .subscribe({
        error: (e: Error) => this.card.result(e.message),
      });
    this.facts.add('finalize wird immer aufgerufen');
  }

  retrying(): void {
    throwError(new Error('This is an error'))
      .pipe(retry(2))
      .subscribe({
        error: (e: Error) => this.card.result(e.message),
      });
    this.facts.add('retry wiederholt eine Subscription n mal, bevor es einen Fehler zurückgibt.');
  }

  conditionalRetrying(): void {
    throwError(new Error('This is an error'))
      .pipe(
        retryWhen((result) =>
          result.pipe(
            concatMap((r) => {
              // here we can check the error.
              // We can specify the retry only if we are getting 5xx errors for instance.
              if (r === 0) {
                return of(r);
              }
              // in other cases we throw an error down the pipe
              return throwError(r);
            }),
            delay(1000),
            // we can keep calling forever but usually we want to avoid this.
            // So, we set the number of attempts including the initial one.
            take(4),
            (o) => concat(o, throwError(`Sorry, there was no result after 3 retries)`))
          )
        )
      )
      .subscribe({
        error: (e: Error) => this.card.result(e.message),
      });

    this.facts.add('retryWhen nimmt ein anderes Observable, um retry nur unter bestimmten Bedingungen durchzuführen.');
    this.facts.add('retryWhen in Kombination mit delay ist nützlich, wenn Server kurz nicht erreichbar sind.');
  }
}
