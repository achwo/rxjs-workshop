import { AfterViewInit, Component } from '@angular/core';
import { PageComponent } from './page.component';
import {of, forkJoin, fromEvent, combineLatest, Subject} from 'rxjs';

@Component({
  selector: 'app-combination2',
  templateUrl: './page.template.html',
  styles: []
})
export class Combination2Component extends PageComponent implements AfterViewInit {
  headline = 'forkJoin und combineLatest';
  ngAfterViewInit(): void {}

  run(): void {

//    this.forkJoining();
//    this.forkJoiningRisk();
    this.combiningLatest();
  }

  forkJoining(): void {
    const ob1$ = of(1);
    const ob2$ = of('two');
    const ob3$ = of([1, 2, 3]);

    forkJoin([ob1$, ob2$, ob3$]).subscribe(([v1, v2, v3]) => this.card.result(v1, v2, v3));

    this.facts.add('forkJoin führt alle Observables parallel aus.');
    this.facts.add('forkJoin emitted erst, wenn alle Observables abgeschlossen sind.');
  }

  forkJoiningRisk(): void {
    const ob1$ = of(1);
    const ob2$ = of('two');
    const ob3$ = fromEvent(window, 'click');

    forkJoin([ob1$, ob2$, ob3$]).subscribe(([v1, v2, v3]) => this.card.result(v1, v2, v3));

    this.facts.add('forkJoin emitted nicht, wenn ein Observable nicht abschließt.');
    this.facts.add('forkJoin sollte daher nur mit kalten Observables verwendet werden.');
  }

  combiningLatest(): void {
    const sub1 = new Subject<string>();
    const sub2 = new Subject<string>();

    sub1.next('sub1 1');
    combineLatest([sub1, sub2]).subscribe(v => this.card.result(v));

    sub1.next('sub1 2');
    sub2.next('sub2');

    sub1.next('sub1 3');

    this.facts.add('combineLatest emitted erst, wenn alle observables einen Wert emitted haben.');
    this.facts.add('combineLatest emitted eine Kombination der jeweiligen letzten Werte aller Observables.');
  }
}
