import { Component, OnInit } from '@angular/core';
import { EndpointsService } from './services/endpoints.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public publicData: any;
  protected secretData: any;

  constructor(
    private endpointService: EndpointsService
  ) {}

  ngOnInit(): void {
    this.endpointService.callUnprotectedEndpoint().then(response => this.publicData = response);
    this.endpointService.callProtectedEndpoint().then(response => this.secretData = response);
  }
}
