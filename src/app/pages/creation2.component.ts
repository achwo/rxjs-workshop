import { AfterViewInit, Component } from '@angular/core';
import { PageComponent } from './page.component';

@Component({
  selector: 'app-creation2',
  templateUrl: './page.template.html',
  styles: []
})
export class Creation2Component extends PageComponent implements AfterViewInit {
  headline = '';
  ngAfterViewInit(): void {}

  run(): void {

  }
// todo - advanced creation: defer, fromEvent
}
