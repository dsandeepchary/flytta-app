import {Component, OnInit} from '@angular/core';
import {LatlonService} from './services/latlon.service';
import {LatLon} from './models/lat-lon';
declare var google;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LatlonService]
})
export class AppComponent implements OnInit {
  defaultLatitude;
  defaultLongitude;
  picurls = [];
  nearbyPlaces;
  pic;
  validData: LatLon[] = [];
  markerInfo;
  constructor(private latlonService: LatlonService) {}
  openNav() {
    document.getElementById('mySidenav').style.width = '400px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }
  // Get Latlons to display markers
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
  // Find places near a marker
  public findPlaces(lat, lon) {
    const marker = new google.maps.LatLng(lat, lon);
    const map = new google.maps.Map(document.createElement('div'), {center: marker});
    const request = {
      location: marker,
      radius: 2000, // around 2km
      types: ['hospital', 'restaurant', 'cinema'] // categories
    };
    const placesService = new google.maps.places.PlacesService(map);
    placesService.nearbySearch(request, this.callback);
  }
  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      this.nearbyPlaces = results;
      console.log(this.nearbyPlaces);
    }
  }
  // Get info of a property
  getMarkerInfo(marker) {
    this.picurls = [];
    this.latlonService.getInfoOfMarker(marker)
      .subscribe(data => {
        this.markerInfo = data;
        if (data.hasOwnProperty('picurl')) {
          this.picurls = data.item.picurl;
          this.pic = data.item.picurl[0];
        }
      });
  }
  showNextPic(pic) {
    const index = this.picurls.indexOf(pic);
    if (index === this.picurls.length - 1) {
      this.pic = '';
      this.pic = this.picurls[0];
    } else {
      this.pic = '';
      this.pic = this.picurls[index + 1];
    }
  }
  showPrevPic(pic) {
    const index = this.picurls.indexOf(pic);
    if (index === 0) {
      this.pic = '';
      this.pic = this.picurls[this.picurls[this.picurls.length - 1]];
    } else {
      this.pic = '';
      this.pic = this.picurls[index - 1];
    }
  }
  ngOnInit() {
    this.defaultLatitude = 17.458467;
    this.defaultLongitude =  78.364802;
  }
}
