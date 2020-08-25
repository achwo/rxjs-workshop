import { Component, ViewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Link } from '../card/link';

@Component({ template: ''})
export abstract class PageComponent {
  headline = '';
  facts: Set<string> = new Set();
  links: Set<Link> = new Set();
  @ViewChild(CardComponent) card: CardComponent;

  abstract run(): void;
}
