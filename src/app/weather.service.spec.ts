import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import {Weather} from './weather';



describe('WeatherService', () => {
  let service: WeatherService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WeatherService);

    http = TestBed.inject(HttpTestingController);
  });

  describe('getWeather', () => {
    it('returns the weather from the backend (with of)', () => {
      let result: Weather;
      service.getWeather().subscribe(w => result = w);

      expect(result.sky).toEqual('sunny');
      expect(result.temperatureInC).toEqual(-2);
      expect(result.toString()).toContain('Wir haben');
    });

    xit('returns the weather from the backend (with http service)', () => {
      const weather = {
        sky: 'sunny',
        temperatureInC: 15
      };
      let result: Weather;
      service.getWeather().subscribe(w => result = w);
      const req = http.expectOne('http://workshop/weather');
      req.flush(weather);

      expect(result.sky).toEqual('sunny');
      expect(result.temperatureInC).toEqual(15);
      expect(result.toString()).toContain('Wir haben');
    });
  });
});
