import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/services/session.service";
import { ToastController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { PreviewAnyFile } from "@ionic-native/preview-any-file/ngx";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  userInfo: object;
  file: File;
  loading: any;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private previewAnyFile: PreviewAnyFile
  ) {}

  ngOnInit() {
    this.userInfo = this.sessionService.getObject("user");
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: "Por favor, espere...",
    });

    this.loading.present();
  }
  navigateToHome() {
    this.router.navigate(["/home"]);
  }
  downloadPdf(pdfUrl) {
    // window.open(pdfUrl);
    return this.previewAnyFile.preview(pdfUrl)
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
  }
  logOut() {
    this.sessionService.destroy("access_token");
    this.sessionService.destroy("user");
    this.router.navigate(["/login"]);
  }
}