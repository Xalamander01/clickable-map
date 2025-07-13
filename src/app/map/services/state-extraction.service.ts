import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class StateExtractionService {

  private svgPath = 'assets/us-map.svg';

  constructor(private http: HttpClient) { }

  getStates(): Observable<State[]> {
    return this.http.get(this.svgPath, { responseType: 'text' }).pipe(
      map(svgText => this.extractStatesFromSVG(svgText))
    );
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
