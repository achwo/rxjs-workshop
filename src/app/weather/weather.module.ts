import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [WeatherComponent, ButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [WeatherComponent]
})
export class WeatherModule { }
