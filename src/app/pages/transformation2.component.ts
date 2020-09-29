import { AfterViewInit, Component } from '@angular/core';
import { PageComponent } from './page.component';
import {interval, of, from, concat, timer} from 'rxjs';
import {tap, map, take, mergeMap, delay, concatMap, switchMap, exhaustMap, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-transformation2',
  templateUrl: './page.template.html',
  styles: []
})
export class Transformation2Component extends PageComponent implements AfterViewInit {
  headline = 'Transformation 2';

  ngAfterViewInit(): void {}

  run(): void {
//    this.theProblem();
//    this.higherOrderMappings();
//    this.mergeMapping();
//    this.concatMapping();
//    this.switchMapping();
    this.exhaustMapping();
  }

  theProblem(): void {
    const outer$ = interval(500).pipe(
      tap(v => this.card.info('outer emits', v)),
      map(v => of(v + 1)),
      take(2)
    );

    outer$.subscribe(inner$ => {
      this.card.info('outer returned an observable');
      inner$.subscribe(v => this.card.result('we have to subscribe within a subscribe', v));
    });

    this.facts.add('Für jeden Wert des äußeren Observables wollen wir das innere komplett abhandeln.');
    this.facts.add('Oft benötigt das innere Observable Werte, die aus dem äußeren kommen.');
  }

  higherOrderMappings(): void {
    const outer$ = interval(500).pipe(
      tap(v => this.card.info('outer emits', v)),
      mergeMap(v => of(v + 1)),
      take(2)
    );

    outer$.subscribe(v => {
      this.card.info('outer returned an value', v);
    });

    this.facts.add('Durch higher order mappings können wir das verschachtelte subscriben vermeiden.');


    this.card.links.add({
      link: 'https://netbasal.com/understanding-mergemap-and-switchmap-in-rxjs-13cf9c57c885',
      text: 'Understanding mergeMap and switchMap',
    });
  }

  mergeMapping(): void {
    const fakeGetRequest$ = from([1, 2]);
    const fakeDependentRequest$ = fakeGetRequest$.pipe(
      mergeMap(v => concat(of(`mergeMap: outer ${v} inner a`), of(`mergeMap: outer ${v} inner b`).pipe(delay(800))))
    );
    fakeDependentRequest$.subscribe(v => this.card.result(v));

//    const receivers$ = from(['a', 'b', 'c']);
//    const sendMessageRequest = (receiver) => of('Request for ' + receiver);
//
//    receivers$.pipe(mergeMap(sendMessageRequest), toArray()).subscribe(v => this.card.result(v));

    this.facts.add('mergeMap: Wenn etwas vom inneren emitted wird, wird es sofort zurückgegeben.');
    this.facts.add('mergeMap: Wenn das äußere emitted, während das innere läuft, wird ein weiteres inneres gestartet.');
    this.facts.add('mergeMap: Bereits laufende innere werden nicht abgebrochen.');
    this.facts.add('mergeMap: Die Reihenfolge ist daher nicht garantiert.');
  }

  concatMapping(): void {
    const fakeGetRequest$ = from([1, 2]);
    const fakeDependentRequest$ = fakeGetRequest$.pipe(
      concatMap(v => concat(of(`concatMap: outer ${v} inner a`), of(`concatMap: outer ${v} inner b`).pipe(delay(800))))
    );

    fakeDependentRequest$.subscribe(v => this.card.result(v));

    this.facts.add('concatMap: Wenn etwas vom inneren emitted wird, wird es sofort zurückgegeben.');
    this.facts.add('concatMap: Wenn das äußere emitted, während das innere läuft, wartet es, bis das innere komplett ist.');
    this.facts.add('concatMap: Bereits laufende innere werden nicht abgebrochen.');
    this.facts.add('concatMap: Die Reihenfolge ist garantiert.');
  }

  switchMapping(): void {
    const fakeGetRequest$ = from([1, 2]);
    const fakeDependentRequest$ = fakeGetRequest$.pipe(
      switchMap(v => concat(of(`switchMap: outer ${v} inner a`), of(`switchMap: outer ${v} inner b`).pipe(delay(800))))
    );

    fakeDependentRequest$.subscribe(v => this.card.result(v));

    this.facts.add('switchMap: Emitted nur den letzten Wert des inneren.');
    this.facts.add('switchMap: Wenn das äußere emitted, während das innere läuft, wird das innere abgebrochen.');
    this.facts.add('switchMap: Bereits laufende innere werden abgebrochen.');
    this.facts.add('switchMap: Die Reihenfolge ist garantiert.');
  }

  exhaustMapping(): void {
    const fakeGetRequest$ = from([1, 2]);
    const fakeDependentRequest$ = fakeGetRequest$.pipe(
      exhaustMap(v => concat(of(`outer ${v} inner a`), of(`outer ${v} inner b`).pipe(delay(800))))
    );

    fakeDependentRequest$.subscribe(v => this.card.result(v));

    this.facts.add('exhaustMap: Wenn das äußere emitted, während das innere läuft, wird es ignoriert.');
    this.facts.add('exhaustMap: Bereits laufende innere laufen bis zum Ende.');
    this.facts.add('exhaustMap: Die Reihenfolge ist garantiert.');
  }
}
