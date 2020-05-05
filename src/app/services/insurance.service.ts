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

  getCurrentInsurance(insured_id: number) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.sessionService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const url = "http://adm.sctr-insured.com.pe/api/plant/insurence";
    return this.http.post(url, { insured_id }, { headers: headers }).pipe(
      map(data => {
        return data;
      })
    );
  }

  getInsuranceRegister(insured_id: number, user_id: number) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.sessionService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const url = "http://adm.sctr-insured.com.pe/api/plant/history";
    return this.http.post(url, { insured_id, user_id }, { headers: headers }).pipe(
      map(data => {
        return data;
      })
    );
  }

  setComments(register_id, body){
    const formHeaders = new HttpHeaders({
      Authorization: "Bearer " + this.sessionService.getItem("access_token"),
    }); 

    const fd = new FormData();
    fd.append("register_id", register_id);
    fd.append("body", body);

    const url = "http://adm.sctr-insured.com.pe/api/plant/comment";
    
    return this.http.post(url, fd, { headers: formHeaders }).pipe(
      map(data => {
        return data;
      })
    );
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

  checkRegister(users, insurence, plant, body, type ){
    const formHeaders = new HttpHeaders({
      Authorization: "Bearer " + this.sessionService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const fd = new FormData();
    const url = "http://adm.sctr-insured.com.pe/api/plant/mark/assistance";

    fd.append("users", JSON.stringify(users));
    fd.append("insurence", insurence);
    fd.append("plant", plant);
    fd.append("body", body);
    fd.append("type", type);
    console.log(fd)
    return this.http.post(url, fd, { headers: formHeaders }).pipe(
      map(data => {
        return data;
      })
    );
  }

  getGraphic(){
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.sessionService.getItem("access_token"),
      Accept: "application/json, text/plain"
    });
    const url = "http://adm.sctr-insured.com.pe/api/plant/graphic";
    return (this.data = this.http.get(url, { headers: headers }));
  }
}
