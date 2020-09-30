import { Component, OnInit } from '@angular/core';
import {Observable } from 'rxjs';
import { Weather } from '../weather';
import { WeatherService } from '../weather.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather$: Observable<Weather>;
  weatherString$: Observable<string>;

  get buttonColor$(): Observable<'yellow' | 'grey' | 'default'> {
    // hier muss geprüft werden, ob weather$ truthy ist
    return this.weather$.pipe(
      map(w => {
        switch (w.sky) {
          case 'rain':
            return 'grey';
          case 'sunny':
            return 'yellow';
          default:
            return 'default';
        }
      })
    );
  }

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.weather$ = this.weatherService.getWeather();
    this.weatherString$ = this.weather$.pipe(map(w => w.toString()));
  }
}

