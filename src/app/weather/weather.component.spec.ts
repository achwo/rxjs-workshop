import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import {By} from '@angular/platform-browser';
import {WeatherService} from '../weather.service';
import {of} from 'rxjs';
import {Weather} from '../weather';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let service: jasmine.SpyObj<WeatherService>;
  let fixture: ComponentFixture<WeatherComponent>;
  const containerEl = () => fixture.debugElement.query(By.css('.container'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherComponent ],
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
    component = fixture.componentInstance;
  });

  it('shows the current weather', () => {
    service.getWeather.and.returnValue(of(new Weather('sunny', 14)));
    fixture.detectChanges();

    expect(containerEl().nativeElement.innerText).toContain('Wir haben gerade 14');
  });
});
