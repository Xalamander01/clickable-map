import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    {
        path: 'map/:region',
        component: MapComponent
    }
];
