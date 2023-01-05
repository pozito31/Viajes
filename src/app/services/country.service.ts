import { IRegion } from './../interfaces/iregion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICountry } from '../interfaces/icountry';
import { Country } from '../models/country';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountriesByRegion(region): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('https://restcountries.com/v2/regionalbloc/' + region).pipe(
      map(data => data.map(d => new Country(d)))
    )
  }

  getAllRegions(): Observable<IRegion[]> {
    return this.http.get<IRegion[]>('assets/data/regions.json').pipe(
      map(data => data.map(d => new Region(d)))
    )
  }
}
