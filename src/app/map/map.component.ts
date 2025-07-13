import { Component, OnInit } from '@angular/core';
import { StateExtractionService } from './services/state-extraction.service';
import { CommonModule } from '@angular/common';
import { State } from './models/state';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  protected states: State[] = [];

  constructor(private stateExtractionService: StateExtractionService) { }

  ngOnInit() {
    this.stateExtractionService.getStates().subscribe(
      result => {
        this.states = result;
      }
    );
  }

  onStateClick(state: any) {
    console.log('State clicked:', state);
  }
}
