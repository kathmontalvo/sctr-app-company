import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { SessionService } from "./session.service";

@Injectable({
  providedIn: "root"
})
export class CompanyService {
  constructor(private http: HttpClient, private authService: AuthService, private sessionService: SessionService) {}

  getData() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.sessionService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const url = "http://adm.sctr-insured.com.pe/api/oauth/current/user";
    return this.http.post(url, {}, { headers: headers }).pipe(
      map(data => {
        return data;
      })
    );
  }
}
