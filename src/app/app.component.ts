import { Component, DoCheck, OnInit} from '@angular/core';
import {LatlonService} from './services/latlon.service';
import {LatLon} from './models/lat-lon';
declare var google;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LatlonService]
})
export class AppComponent implements OnInit, DoCheck {
  zoom = 13;
  defaultLatitude;
  defaultLongitude;
  picurls = [];
  public nearByPlaces;
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
    const that = this;
    const marker = new google.maps.LatLng(lat, lon);
    const map = new google.maps.Map(document.createElement('div'), {center: marker});
    const request = {
      location: marker,
      radius: 200, // around 200meters
      types: ['services'] // categories
    };
    const placesService = new google.maps.places.PlacesService(map);
    placesService.nearbySearch(request, function(results, status) {
      const nearBy = [];
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 1; i < results.length; i ++) {
          nearBy.push({'lat': results[i].geometry.location.lat, 'lon': results[i].geometry.location.lng, 'name': results[i].name});
        }
      }
      that.nearByPlaces = nearBy;
    });
  }

  // Get info of a property
  getMarkerInfo(marker) {
    this.picurls = [];
    this.latlonService.getInfoOfMarker(marker)
      .subscribe(data => {
        this.markerInfo = data;
        if (data.hasOwnProperty('item') && data.item.hasOwnProperty('picurl')) {
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
  ngDoCheck() {
    if (this.pic !== '' || this.pic !== undefined || this.pic !== null) {
      setInterval(this.showNextPic(this.pic), 1000);
    }
  }
  ngOnInit() {
    this.defaultLatitude = 17.458467;
    this.defaultLongitude =  78.364802;
  }
}
