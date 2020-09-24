import { AfterViewInit, Component } from '@angular/core';
import { PageComponent } from './page.component';
import {interval, concat, of, from, Subject} from 'rxjs';
import {debounceTime, take, delay, distinctUntilChanged, mergeAll, toArray, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-filtering2',
  templateUrl: './page.template.html',
  styles: []
})
export class Filtering2Component extends PageComponent implements AfterViewInit {
  headline = '';
  ngAfterViewInit(): void {}

  run(): void {
    this.debouncingTime();
//    this.distinctUntilChanged();
//    this.takingUntil();
  }

  debouncingTime(): void {
    const obs$ = concat(
      of('immediately'),
      of('delayed 50').pipe(delay(50)),
      of('delayed 100').pipe(delay(100)),
      of('delayed 150').pipe(delay(150)),
      of('delayed 200').pipe(delay(200))
    );

    obs$.subscribe(v => this.card.result('no debounceTime', v));
    obs$.pipe(debounceTime(200)).subscribe(v => this.card.result('debounceTime', v));

    this.facts.add('debounceTime startet den Timer neu, wenn ein neuer Wert kommt.');
    this.facts.add('debounceTime emitted nur, wenn der Wert n ms stabil ist.');
  }

  distinctUntilChanged(): void {
    const obs$ = from([0, 1, 1, 2, 3, 3, 3, 4, 5, 5]);

    obs$.pipe(toArray()).subscribe(v => this.card.result('all values', v));
    obs$.pipe(
      distinctUntilChanged(),
      toArray()
    ).subscribe(v => this.card.result('only distinct values', v));

    this.facts.add('distinctUntilChanged emitted nur, wenn sich der Wert vom vorherigen Wert unterscheidet');
  }

  takingUntil(): void {
    const sub = new Subject<string>();
    const obs$ = sub.asObservable();
    const signal$ = new Subject<void>();

    obs$.pipe(takeUntil(signal$)).subscribe(v => this.card.info(v));

    sub.next('emitted before signal$');
    sub.next('also emitted before signal$');
    signal$.next();
    sub.next('emitted after signal$');

    this.facts.add('takeUntil completed das Observable, wenn ein Signal vom gegebenen Observable kommt.');
  }
}
