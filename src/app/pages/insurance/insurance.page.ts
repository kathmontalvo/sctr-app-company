import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { RegistrosComponent } from "../../components/registros/registros.component";
import { ActivatedRoute } from "@angular/router";
import { InsuranceService } from "../../services/insurance.service";
import { AuthService } from "../../services/auth.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { LoadingController } from "@ionic/angular";
import { SessionService } from "src/app/services/session.service";

@Component({
  selector: "app-insurance",
  templateUrl: "./insurance.page.html",
  styleUrls: ["./insurance.page.scss"]
})
export class InsurancePage implements OnInit {
  segment: string;
  sctrType: object;
  users: object[];
  visits;
  insuranceId: number;
  insuranceInfo: object;
  elementType: "url" | "canvas" | "img" = "url";
  value: string;
  display = true;
  pdfFile: string;
  fileUrl;
  protectedUrl: SafeUrl;
  user;
  loading: any;

  constructor(
    public popOverCtrl: PopoverController,
    private route: ActivatedRoute,
    private insuranceService: InsuranceService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private sessionService: SessionService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    this.showLoading();

    let id = await parseInt(this.route.snapshot.paramMap.get("id"));
    this.insuranceId = id;
    console.log({id})
    this.segment = "details";
    this.user = this.sessionService.getObject("user");
    this.getInsuranceData(this.insuranceId);
  }

  getInsuranceData(insuranceId) {
    this.insuranceService.getCurrentInsurance(insuranceId).subscribe(
      async response => {
        console.log(response);
        this.loading.dismiss();

        this.sessionService.setObject("insurance", response["data"]);
        this.insuranceInfo = response["data"];
        // this.qrcodename = this.insuranceInfo["code"];
        // this.pdfFile = this.insuranceInfo["document"];
        this.users = this.insuranceInfo["insu_users"];
        this.sctrType = this.insuranceInfo["type"];

        this.protectedUrl = await this.sanitizer.bypassSecurityTrustResourceUrl(
          this.insuranceInfo["document"]
        );

        this.getRegister(insuranceId);
      },
      error => {
        this.loading.dismiss();

        console.log(error, "ghjkasdjasd");
        alert("Error al obtener datos del documento.");
      }
    );
  }

  getRegister(id) {
    this.insuranceService.getInsuranceRegister(id).subscribe(response => {
      this.visits = response["data"][0].users;
      console.log(response, response["data"][0].users);
    });
  }

  async openRegister(ev, key) {
    console.log(key)
    const userVisits = this.visits.filter((el)=> el.id === key)
    this.sessionService.setObject("register", userVisits);
    const popover = await this.popOverCtrl.create({
      component: RegistrosComponent,
      event: ev,
      cssClass: "popover-style",
      translucent: true
    });
    return await popover.present();
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: ""
    });

    this.loading.present();
  }
}
