import { AfterViewInit, Component } from '@angular/core';
import { PageComponent } from './page.component';
import { Observable, of, range } from 'rxjs';
import { share, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cache-example',
  templateUrl: './page.template.html',
  styles: []
})
export class CacheExampleComponent extends PageComponent implements AfterViewInit {
  headline = 'Cache Beispiele';


  private source$ = range(1, 3).pipe(tap(v => this.card.info('Source value', v)));
  private propertyWithCache3$ = this.source$.pipe(shareReplay(1));

  // tslint:disable-next-line: variable-name
  private _propertyWithGetter$: Observable<number>;
  get propertyWithGetter$(): Observable<number> {
    if (!this._propertyWithGetter$) {
      this._propertyWithGetter$ = this.source$.pipe(shareReplay(1));
    }
    return this._propertyWithGetter$;
  }


  ngAfterViewInit(): void {}



  run(): void {
     this.withoutCaching();
    // this.cache1();
    // this.cache2();
//    this.cache3();
  }

  withoutCaching(): void {
    this.source$.subscribe(v => this.card.info('A done'));
    this.source$.subscribe(v => this.card.info('B done'));
    this.source$.subscribe(v => this.card.info('C done'));

    this.facts.add('Mehrere Subscribes führen zu mehrfacher Ausführung');
  }

  cache1(): void {
    const withCache1$ = this.source$.pipe(shareReplay(1));

    withCache1$.subscribe(v => this.card.info('A done'));
    withCache1$.subscribe(v => this.card.info('B done'));
    withCache1$.subscribe(v => this.card.info('C done'));

    this.facts.add('shareReplay cached ein Observable');
  }

  cache2(): void {
    this.requestFromFunctionWithCache2().subscribe(v => this.card.info('A done'));
    this.requestFromFunctionWithCache2().subscribe(v => this.card.info('B done'));
    this.requestFromFunctionWithCache2().subscribe(v => this.card.info('C done'));

    this.facts.add('Eine Funktion returned immer ein neues Observable, daher wirkt der Cache nicht.');
  }

  private requestFromFunctionWithCache2(): Observable<number> {
    return this.source$.pipe(shareReplay(1));
  }

  cache3(): void {
    this.propertyWithGetter$.subscribe(v => this.card.info('A done'));
    this.propertyWithGetter$.subscribe(v => this.card.info('B done'));
    this.propertyWithGetter$.subscribe(v => this.card.info('C done'));

    this.facts.add('Man kann das Observable selbst zusätzlich cachen, dann wirkt der Cache.');
  }

  cache4(): void {
    this.propertyWithCache3$.subscribe(v => this.card.info('A done'));
    this.propertyWithCache3$.subscribe(v => this.card.info('B done'));
    this.propertyWithCache3$.subscribe(v => this.card.info('C done'));

    this.facts.add('Ein Property returned immer dasselbe Observable, daher wirkt der Cache.');
    this.facts.add('Diese Lösung wirkt genauso wie die vorherige, nur mit weniger Code.');

    this.links.add({
      link: 'https://dev.to/prestonjlamb/rxjs-caching-and-refreshing-in-angular-2icn',
  };



}
