import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
    // Accept: 'application/json, text/plain'
  });

  login(
    grant_type: string,
    client_id: string,
    client_secret: string,
    username: string,
    password: string
  ): Observable<any> {
    const url = "http://adm.sctr-insured.com.pe/api/oauth/token";
    console.log(grant_type, client_id, client_secret, username, password);
    return this.http
      .post(url, { grant_type, client_id, client_secret, username, password })
      .pipe(
        map(data => {
          return data;
        })
      );
  }
}
