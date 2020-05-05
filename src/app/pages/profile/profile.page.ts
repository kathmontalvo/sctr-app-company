import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/services/session.service";
import { ToastController } from "@ionic/angular";
import { LoadingController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { PreviewAnyFile } from "@ionic-native/preview-any-file/ngx";
import { CompanyService } from 'src/app/services/company.service';
import { ModalController } from '@ionic/angular';
import { ModalPdfComponent } from '../../components/modal-pdf/modal-pdf.component';

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
    private alertCtrl: AlertController,
    private previewAnyFile: PreviewAnyFile,
    private userService: CompanyService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.userInfo = this.sessionService.getObject("user");
  }

  async changeListener($event) {
    console.log($event);
    this.file = await $event.target.files[0];
    this.saveProfilePhoto(this.file);
  }

  saveProfilePhoto(file) {
    this.showLoading()
    this.userService.uploadImage(file).subscribe(res => {
      console.log(res["data"]);
      this.updateUserPhoto(res["data"]);
    }, err => {
      this.loading.dismiss();
      this.presentAlert(
        "Error",
        "Hubo un error al actualizar la imagen. Intente nuevamente.",
        "Aceptar"
      );
    });
  }

  updateUserPhoto(file) {
    this.sessionService.destroy("user");

    this.userService.updateUser(file).subscribe(
      async res => {
        this.loading.dismiss();
        console.log(res["data"]);
        await this.sessionService.setObject("user", res["data"]);
        this.presentToastWithOptions();
        this.ngOnInit();
      },
      err => {
        console.log(err);
        this.presentAlert(
          "Error",
          "Hubo un error al actualizar la imagen. Intente nuevamente.",
          "Aceptar"
        );
      }
    );
  }
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: "¡Listo!",
      message: "Has actualizado tu foto de perfil.",
      position: "bottom",
      duration: 3000,
      mode: "ios",
      buttons: [
        {
          text: "Cerrar",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    toast.present();
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
  async presentAlert(title, message, btn) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        {
          text: btn,
        },
      ],
    });
    await alert.present();
  };
  async showPdf(param, title) {
    const modal = await this.modalController.create({
      component: ModalPdfComponent,
      componentProps: {param, title }
    });
    return await modal.present();
  }
}
