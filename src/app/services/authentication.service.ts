import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) {}

  authenticate(email: string, password: string): Promise<any> {
    return this.http.post('//localhost:8080/login', {email: email, password: password})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  refresh(refreshToken: string): Promise<any> {
    return this.http.post('//localhost:8080/refresh', {refresh: refreshToken})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
