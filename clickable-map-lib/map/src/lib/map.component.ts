import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { tap, switchMap } from "rxjs";
import { MapRegions } from "./const/map-regions";
import { State } from "./models/state";
import { ViewboxDimensions } from "./models/viewbox-dimensions";
import { SvgMapService } from "./services/svg-map.service";

@Component({
  selector: 'lib-map',
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

  onStateClick(state: State) {
    console.log('State clicked:', state);
  }
}
