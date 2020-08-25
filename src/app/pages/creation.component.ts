import { AfterViewInit, Component } from '@angular/core';
import { EMPTY, from, interval, Observable, of, range, Subscriber, timer } from 'rxjs';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-creation',
  templateUrl: './page.template.html',
  styles: []
})
export class CreationComponent extends PageComponent implements AfterViewInit {
  headline = 'Observables und deren Erzeugung';

  ngAfterViewInit(): void {
    this.run();
  }

  run(): void {
//    this.basic();
//    this.alternativeSyntax();
//    this.of();
//    this.from2();
    this.timer();
  }

  basic(): void {
    const true$ = new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      subscriber.next(true);
      subscriber.complete();
    });

    true$.subscribe(
      (result: boolean) => this.card.result(result),
      (error) => this.card.error(error),
      () => this.card.info('After everything happened')
    );

    this.facts.add('Der next-Handler behandelt Werte, die per subscriber.next verschickt werden.');
    this.facts.add('Der complete-Handler agiert, wenn subscriber.complete aufgerufen wurde.');
  }

  alternativeSyntax(): void {
    const true$ = new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      subscriber.next(true);
      subscriber.complete();
    });

    true$.subscribe({
      next: (result: boolean) => this.card.result(result),
      error: (error) => this.card.error(error),
      complete: () => this.card.info('After everything happened'),
    });

    this.facts.add('Der Parameter für subscribe kann auch ein Objekt sein.');
  }

  of(): void {
    const true$ = of(true);

    true$.subscribe(
      (result: boolean) => this.card.result(result),
      (error) => this.card.error(error),
      () => this.card.info('After everything happened')
    );

    this.facts.add('Observables mit nur einem Wert können mit of erzeugt werden.');
  }


  errors(): void {
    const error$ = new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      subscriber.next(true);
      subscriber.error(new Error('This is an error'));
      subscriber.complete();
    });

    error$.subscribe({
      next: (result: boolean) => this.card.result(result),
      error: (error) => this.card.error(error),
      complete: () => this.card.info('This is never executed'),
    });

    this.facts.add('Der Error-Block behandelt Werte, die per subscriber.error verschickt werden.');
    this.facts.add('Der complete-Handler wird nach einem Fehler nicht mehr aufgerufen.');
    this.facts.add('subscriber.error und subscriber.complete sind beide completions.');

    this.links.add({
      text: 'The Observable Contract',
      link: 'http://reactivex.io/documentation/contract.html',
    });
  }

  from(): void {
    const bool$ = from([true, false]);
    bool$.subscribe((result: boolean) => this.card.result(result));

    this.facts.add('From emitted nacheinander die Werte aus dem Array');
  }

  from2(): void {
    const bool$ = from([true, new Error('Fail')]);
    bool$.subscribe(
      (result: boolean) => this.card.result(result),
      (e) => this.card.error(e)
    );
//    const bool2$ = new Observable(o => {
//      o.next(true);
//      o.next(new Error('Fail'));
//      o.complete();
//    });
//
//    bool2$.subscribe(
//      (result: boolean) => this.card.result(result),
//      (e) => this.card.error(e)
//    );

  }

  empty(): void {
    EMPTY.subscribe({ complete: () => this.card.result('Immediately completes')});
//    const equivalent$ = new Observable(s => s.complete());
  }

  range(): void {
    range(1, 10).subscribe(v => this.card.result(v));
    this.facts.add('range emitted die Werte innerhalb des angegebenen Bereichs.');
  }

  timer(): void {
    timer(1000).subscribe(() => this.card.result('This shows up after 1 second'));

    this.facts.add('Timer emitted nach der gegebenen Dauer');
    this.facts.add('subscribe wird synchron ausgeführt');
  }

  interval(): void {
    interval(500).subscribe(v => this.card.result('emits every n ms', v));
    this.facts.add('interval emitted alle n Millisekunden.');
  }
}
