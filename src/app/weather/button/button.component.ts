import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text = ''; // alternativ wäre auch übergabe als ng-content denkbar (siehe src/app/modal/modal-button/modal-button.component.ts
  @Input() color: 'yellow' | 'grey' | 'default' = 'default'; // wird vom Template genutzt [ngClass]
}
