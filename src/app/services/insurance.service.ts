import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { SessionService } from "./session.service";

@Injectable({
  providedIn: "root"
})
export class InsuranceService {
  data: Observable<any>;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  getInsurances() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.sessionService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const url = "http://adm.sctr-insured.com.pe/api/plant/home";
    return (this.data = this.http.get(url, { headers: headers }));
  }
  readQR(code: any) {
    const formHeaders = new HttpHeaders({
      Authorization: "Bearer " + this.sessionService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const fd = new FormData();
    fd.append("code", code);
    const url = "http://adm.sctr-insured.com.pe/api/plant/read/qr";
    
    return this.http.post(url, fd, { headers: formHeaders }).pipe(
      map(data => {
        return data;
      })
    );
  }
}
