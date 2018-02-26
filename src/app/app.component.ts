import {Component, OnInit} from '@angular/core';
import {LatlonService} from './services/latlon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LatlonService]
})
export class AppComponent implements OnInit {
  defaultLatitude;
  defaultLongitude;
  validData = [];
  markerInfo;
  constructor(private latlonService: LatlonService) {}
  getLatlons() {
    this.latlonService.getLatlons()
      .subscribe(data => {
        for (let i = 0; i < data.length; i ++) {
          data[i].lat = parseFloat(data[i].lat);
          data[i].lon = parseFloat(data[i].lon);
          this.validData.push(data[i]);
        }
      });
  }
  getMarkerInfo(marker) {
    this.latlonService.getInfoOfMarker(marker)
      .subscribe(data => {
        console.log(JSON.stringify(data));
        this.markerInfo = data;
      });
  }
  ngOnInit() {
    this.defaultLatitude = 17.458467;
    this.defaultLongitude =  78.364802;
  }
}
