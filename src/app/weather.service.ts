import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { Weather } from './weather';
import {SkyStatus} from './sky-status';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(): Observable<Weather> {
    return of(new Weather('sunny', -2));
//    return this.http.get(a, scheduler)<{sky: string, temperatureInC: number}>(
//      'http://workshop/weather'
//    ).pipe(
//      map(({sky, temperatureInC}) => new Weather(sky as SkyStatus, temperatureInC))
//    );
  }
}
