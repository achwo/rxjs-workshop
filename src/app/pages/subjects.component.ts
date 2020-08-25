import { AfterViewInit, Component } from '@angular/core';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './page.template.html',
  styles: []
})
export class SubjectsComponent extends PageComponent implements AfterViewInit {
  headline = '';
  ngAfterViewInit(): void {}

  run(): void {

  }

  // todo subjects
  publish(): void {}
  shareReplay(): void {}
}
