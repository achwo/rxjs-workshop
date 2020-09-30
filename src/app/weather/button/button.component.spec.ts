import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.text = 'Refresh';
    fixture.detectChanges();
  });

  it('has the text from the input', () => {
    expect(fixture.nativeElement.innerText).toEqual('Refresh');
  });

  // die Farben könnte man testen, indem man auf Klassen prüft
});
