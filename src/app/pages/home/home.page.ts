import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/services/session.service";
import { InsuranceService } from "src/app/services/insurance.service";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  user: object;
  loading: any;
  insuranceTypes: Array<Object>;

  constructor(
    private sessionService: SessionService,
    private insuranceService: InsuranceService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getInsuranceData();
  }

  ionViewWillEnter() {
    this.user = this.sessionService.getObject("user");
  }

  getInsuranceData() {
    this.insuranceService.getInsurances().subscribe(
      res => {
        this.insuranceTypes = res["data"].insurences;
        this.user = this.sessionService.getObject("user");
      },
      error => {
        console.log(error);
      }
    );
  }

  handleInput($event) {
    const query = $event.target.value.toLowerCase();
    const items = Array.from(document.querySelector("ion-list").children);

    requestAnimationFrame(() => {
      items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item["style"].display = shouldShow ? "block" : "none";
      });
    });
  }

  goToQrPage() {
    this.router.navigateByUrl("/qr-reader")
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: ""
    });

    this.loading.present();
  }
}
