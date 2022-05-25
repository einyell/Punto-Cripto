import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  title = ' ¡Encuentra tu cajero físico más cercano, hay más de 40.000 en todo el mundo!';
  lat = 37.9835;
  lng = -1.12989;
}