import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LatlonService {
  latlonsUrl = 'http://ec2-13-126-145-241.ap-south-1.compute.amazonaws.com:3013/flytta_api/v0.1/portal/showlatlon';
  markerInfoUrl = 'http://ec2-13-126-145-241.ap-south-1.compute.amazonaws.com:3013/flytta_api/v0.1/portal/property/findserviceid/'
  constructor(private http: HttpClient) { }

  getLatlons(): Observable<any> {
    return this.http.get(this.latlonsUrl);
  }
  getInfoOfMarker(marker): Observable<any> {
    return this.http.get(this.markerInfoUrl + marker.service_id);
  }
}
