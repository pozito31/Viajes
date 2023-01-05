import {forkJoin} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { Region } from 'src/app/models/region';
import { Country } from 'src/app/models/country';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.css']
})
export class ListCountriesComponent implements OnInit {

  public listRegions: Region[];
  public listCountries: Country[];
  public listCountriesToVisit: Country[];
  public regionSelected: string;
  public load: boolean;

  constructor(private countryService: CountryService) {
    this.load = false;
    this.listRegions = [];
    this.listCountries = [];
    this.listCountriesToVisit = [];
    this.regionSelected = 'EU';
  }

  ngOnInit() {

    forkJoin(
      this.countryService.getCountriesByRegion("eu"),
      this.countryService.getAllRegions()
    ).subscribe(results => {
      this.listCountries = results[0];
      this.listRegions = results[1];

      this.load = true;
      console.log(this.listCountries);
      console.log(this.listRegions);
    }, error => {
      console.error('Error: ' + error);
      this.load = true;
    })
  }

  filterCountries($event) {
    this.load = false;
    this.countryService.getCountriesByRegion($event.value).subscribe(list => {
      this.listCountries = _.differenceBy(list, this.listCountriesToVisit, c => c.name);
      this.load = true;
    })
  }

  drop(event: CdkDragDrop<Country[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
