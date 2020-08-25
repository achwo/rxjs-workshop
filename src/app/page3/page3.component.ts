import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { concat, from, interval, merge } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CardComponent } from '../card/card.component';
import { Link } from '../card/link';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss'],
})
export class Page3Component implements AfterViewInit {
  @ViewChild(CardComponent) card: CardComponent;

  headline = 'Grundlegende Transformation und Kombination';
  facts: Set<string> = new Set();
  links: Set<Link> = new Set();

  ngAfterViewInit(): void {
    this.run();
  }

  run(): void {
    this.concat();
  }

  map(): void {
    from([12, 3]).pipe(
      map(v => v * 3)
    ).subscribe(v => this.card.result(v));

    this.facts.add('map verändert die Werte eines Observables');
  }

  merge(): void {
   const first$ = interval(500).pipe(map(v => `First: ${v}`));
   const second$ = interval(800).pipe(map(v => `Second: ${v}`));

   merge(first$, second$).subscribe(v => this.card.result(v));

   this.facts.add('merge kombiniert mehrere Observables und lässt sie parallel ablaufen.');
   this.facts.add('Das gemergte Observable emitted immer sofort den Wert jedes Input-Observables.');
  }

  concat(): void {
   const first$ = interval(500).pipe(map(v => `First: ${v}`), take(3));
   const second$ = interval(800).pipe(map(v => `Second: ${v}`));

   concat(first$, second$).subscribe(v => this.card.result(v));

   this.facts.add('concat kombiniert mehrere Observables und lässt sie nacheinander ablaufen.');
   this.facts.add('Das zweite Observable startet erst, wenn das erste completed ist.');
  }
}
