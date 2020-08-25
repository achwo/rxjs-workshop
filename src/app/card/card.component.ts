import { ChangeDetectorRef, Component, Input } from '@angular/core';

type LogLevel = 'result' | 'error';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  output: string[] = [];
  @Input() headline = '';

  constructor(private cdr: ChangeDetectorRef) {}

  result(...data: any[]): void {
    this.log('result', ...data);
  }

  error(...data: any[]): void {
    this.log('error', ...data);
  }

  private log(level: LogLevel = 'result', ...data: any[]): void {
    console.log(...data);
    let line = '';
    for (const v of data) {
      line += v + ' ';
    }
    this.output.push(`${level.toUpperCase()}: ${line.trim()}`);

    this.cdr.detectChanges();
  }
}
