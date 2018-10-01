import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EndpointsService {

  protected headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('zf3_jwt_api_jwt')}`);
  }

  callProtectedEndpoint(): Promise<any> {
    return this.http.get('//localhost:8080/protected', {headers: this.headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  callUnprotectedEndpoint(): Promise<any> {
    return this.http.get('//localhost:8080/unprotected', {headers: this.headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
