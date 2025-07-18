import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapRegions } from './map/const/map-regions';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  MapRegions = MapRegions;
}
