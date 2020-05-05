import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { RegistrosComponent } from "../../components/registros/registros.component";
import { ActivatedRoute } from "@angular/router";
import { InsuranceService } from "../../services/insurance.service";
import { AuthService } from "../../services/auth.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { LoadingController } from "@ionic/angular";
import { SessionService } from "src/app/services/session.service";
import { DocumentViewer } from "@ionic-native/document-viewer/ngx";

@Component({
  selector: "app-insurance",
  templateUrl: "./insurance.page.html",
  styleUrls: ["./insurance.page.scss"],
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
    private loadingController: LoadingController,
    private document: DocumentViewer
  ) {}

  async ngOnInit() {
    this.showLoading();

    let id = await parseInt(this.route.snapshot.paramMap.get("id"));
    this.insuranceId = id;
    console.log({ id });
    this.segment = "details";
    this.user = this.sessionService.getObject("user");
    this.getInsuranceData(this.insuranceId);
  }

  getInsuranceData(insuranceId) {
    this.insuranceService.getCurrentInsurance(insuranceId).subscribe(
      async (response) => {
        this.loading.dismiss();

        this.sessionService.setObject("insurance", response["data"]);
        this.insuranceInfo = response["data"];
        this.users = this.insuranceInfo["insu_users"];
        this.sctrType = this.insuranceInfo["type"];

        this.protectedUrl = await this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://docs.google.com/viewer?url=${this.insuranceInfo["document"]}&embedded=true`
        );
        console.log("pdf url", this.protectedUrl);
      },
      (error) => {
        this.loading.dismiss();
        console.log(error);
        alert("Error al obtener datos del documento.");
      }
    );
  }

  async getPopOver(ev, visits, plant_id, user_id) {
    const popover = await this.popOverCtrl.create({
      component: RegistrosComponent,
      componentProps: { register: visits, loading: this.loading, plant_id, user_id },
      event: ev,
      cssClass: "popover-style",
      translucent: true,
    });
    return await popover.present();
  }

  async openRegister(ev, plant_id, user_id) {
    console.log(plant_id, user_id);
    this.showLoading();
    this.insuranceService
      .getInsuranceRegister(plant_id, user_id)
      .subscribe((response) => {
        const visits = response["data"];
        this.getPopOver(ev, visits, plant_id, user_id)
      });
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: "",
    });

    this.loading.present();
  }
}
