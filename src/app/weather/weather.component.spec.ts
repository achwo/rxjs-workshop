import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import {By} from '@angular/platform-browser';
import {WeatherService} from '../weather.service';
import {of} from 'rxjs';
import {Weather} from '../weather';
import {ButtonComponent} from './button/button.component';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let service: jasmine.SpyObj<WeatherService>;
  let fixture: ComponentFixture<WeatherComponent>;
  const containerEl = () => fixture.debugElement.query(By.css('.container'));
  const buttonEl = () => fixture.debugElement.query(By.css('app-button'));
  const buttonComp = () => buttonEl().componentInstance as ButtonComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherComponent, ButtonComponent ],
      providers: [{
        provide: WeatherService,
        useValue: jasmine.createSpyObj(WeatherService.name, ['getWeather']),
      }]
    })
    .compileComponents(); // das brauchen wir, wenn wir was gerendertes Testen
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    service = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    service.getWeather.and.returnValue(of(new Weather('sunny', 14)));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the current weather', () => {
    expect(containerEl().nativeElement.innerText).toContain('Wir haben gerade 14');
  });

  it('refreshes the weather on button click', () => {
    buttonEl().triggerEventHandler('click', null);
    expect(service.getWeather).toHaveBeenCalledTimes(2);
  });

  it('colors the button according to the weather', () => {
    expect(buttonComp().color).toEqual('yellow');
  });
});

