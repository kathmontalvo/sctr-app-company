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
  updateUser(file: string) {
    const formHeaders: HttpHeaders = new HttpHeaders({
      Authorization: "Bearer " + this.sessionService.getItem("access_token"),
      // "Content-Type": "multipart/form-data",
      Accept: "application/json, text/plain"
    });
    const url = "http://adm.sctr-insured.com.pe/api/user/update";

    const fd = new FormData();
    fd.append("image", file);

    return this.http.post(url, fd, { headers: formHeaders }).pipe(
      map(data => {
        return data;
      })
    );
  }

  uploadImage(file: File) {
    const url = "http://adm.sctr-insured.com.pe/api/user/update/image";
    console.log(file);

    const fd = new FormData();
    fd.append("image", file);

    const headers = new HttpHeaders({});

    return this.http.post(url, fd, { headers: headers }).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }
  getDocs(doc){
    const headers = new HttpHeaders();
    const url = `http://adm.sctr-insured.com.pe/api/guest/${doc}`;
    return this.http.get(url, { headers: headers });
  }
}
