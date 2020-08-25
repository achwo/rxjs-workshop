import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { range } from 'rxjs';
import { filter, find, first, last, take, tap } from 'rxjs/operators';
import { CardComponent } from '../card/card.component';
import { Link } from '../card/link';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class Page2Component implements AfterViewInit {
  @ViewChild(CardComponent) card: CardComponent;

  headline = 'Filter';
  facts: Set<string> = new Set();
  links: Set<Link> = new Set();

  ngAfterViewInit(): void {
    this.run();
  }

  run(): void {}

  filter(): void {
    range(1, 5)
      .pipe(filter((v) => v < 3))
      .subscribe((v) => this.card.result(v));

    this.facts.add('filter gibt alle Werte zurück, die der Bedingung entsprechen.');
  }

  tap(): void {
    range(1, 5)
      .pipe(tap((v) => this.card.info('Side effect', v)))
      .subscribe((v) => this.card.result(v));

    this.facts.add(
      'tap verändert das Observable nicht, sondern wird benutzt, um Seiteneffekte auszulösen.'
    );
  }

  find(): void {
    range(1, 5)
      .pipe(find((v) => v > 1))
      .subscribe((v) => this.card.result(v));
    this.facts.add('find gibt den ersten Wert zurück, der der Bedingung entspricht.');
  }

  first(): void {
    range(1, 5)
      .pipe(first())
      .subscribe((v) => this.card.result(v));
    this.facts.add('first gibt den ersten emitteten Wert zurück');
  }

  last(): void {
    range(1, 5)
      .pipe(last())
      .subscribe((v) => this.card.result(v));
    this.facts.add('last gibt den letzten emitteten Wert zurück, sobald completed wurde');
  }

  take(): void {
    range(1, 5)
      .pipe(take(3))
      .subscribe((v) => this.card.result(v));

    this.facts.add('take schränkt die Anzahl der zurückgegebenen Werte auf n ein.');
  }
}
