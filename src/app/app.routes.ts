import { Routes } from '@angular/router';
import { MapComponent } from 'clickable-map-lib/map';

export const routes: Routes = [
    {
        path: 'map/:region',
        component: MapComponent
    }
];
