import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {

  protected headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders()
      .set('Authorization', `${localStorage.getItem('zf3_jwt_api_jwt')}`)
      .set('X-Refresh-Token', `${localStorage.getItem('zf3_jwt_api_refresh')}`);
  }

  authenticate(email: string, password: string): Promise<any> {
    return this.http.post('//localhost:8080/login', {email: email, password: password}, {headers: this.headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  refresh(): Promise<any> {
    return this.http.post('//localhost:8080/refresh', {}, {headers: this.headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
