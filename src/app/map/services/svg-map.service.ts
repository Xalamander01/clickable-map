import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { State } from '../models/state';
import { MapRegions } from '../const/map-regions';
import { MapPaths } from '../const/map-paths';
import { ViewboxDimensions } from '../models/viewbox-dimensions';

@Injectable({
  providedIn: 'root'
})
export class SvgMapService {

  constructor(private http: HttpClient) { }

  getViewBox(region: MapRegions): Observable<ViewboxDimensions> {
    return this.http.get(MapPaths[region], { responseType: 'text' }).pipe(
      map(svgText => this.extractViewBoxFromSVG(svgText))
    );
  }

  getStates(region: MapRegions): Observable<State[]> {
    return this.http.get(MapPaths[region], { responseType: 'text' }).pipe(
      map(svgText => this.extractStatesFromSVG(svgText))
    );
  }

  private extractViewBoxFromSVG(svg: string): ViewboxDimensions {
    const parser = new DOMParser();
    const svgProperty = parser.parseFromString(svg, 'image/svg+xml').querySelector('svg');

    return { width: Number(svgProperty!.getAttribute('width')), height: Number(svgProperty!.getAttribute('height')) };
  }

  private extractStatesFromSVG(svg: string): State[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    let stateListToReturn: State[] = [];

    const stateList = doc.querySelectorAll('g.state')[0].querySelectorAll('path');

    stateList.forEach((state: Element) => {
      const code = state.getAttribute('class')!.toUpperCase();
      const name = state.querySelector('title')!.textContent!;
      const d = state.attributes.getNamedItem('d')!.value;
      const stateToAdd: State = { code, name, d };
      stateListToReturn.push(stateToAdd);
    });

    return stateListToReturn;
  }
}
