import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from './link';

type LogLevel = 'info' | 'result' | 'error';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  output: string[] = [];
  @Input() headline = '';
  @Input() facts: string[] = [];
  @Input() links: Set<Link> = new Set();
  @Output() run = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  result(...data: any[]): void {
    this.log('result', ...data);
  }

  error(...data: any[]): void {
    this.log('error', ...data);
  }

  info(...data: any[]): void {
    this.log('info', ...data);
  }

  private log(level: LogLevel, ...data: any[]): void {
    console.log(...data);
    let line = '';
    for (const v of data) {
      line += v + ' ';
    }
    this.output.push(`${level.toUpperCase()}: ${line.trim()}`);

    this.cdr.detectChanges();
  }
}
