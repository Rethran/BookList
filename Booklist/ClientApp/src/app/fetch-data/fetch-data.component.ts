import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  dataUrl: string = "https://localhost:5001/weatherForecast"
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  }
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    http.get<WeatherForecast[]>(this.dataUrl, {headers: this.headers}).subscribe(result => {
      this.forecasts = result;
      
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
