import { Component, OnInit } from '@angular/core';
import { SvgMapService } from './services/svg-map.service';
import { CommonModule } from '@angular/common';
import { State } from './models/state';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MapRegions } from './const/map-regions';
import { map, switchMap, tap } from 'rxjs';
import { ViewboxDimensions } from './models/viewbox-dimensions';

@Component({
  selector: 'app-map',
  imports: [CommonModule, RouterModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  protected states: State[] = [];
  protected dimensions: ViewboxDimensions = { width: 0, height: 0 };

  constructor(private svgMapService: SvgMapService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const region: MapRegions = params['region'];
      console.log('Region:', region);
      this.svgMapService.getStates(region).pipe(
        tap((states: State[]) => this.states = states),
        switchMap(() => this.svgMapService.getViewBox(region)),
        tap(dimensions => this.dimensions = dimensions),
      ).subscribe();
    });
  }

  onStateClick(state: any) {
    console.log('State clicked:', state);
  }
}
