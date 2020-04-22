import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { InsuranceService } from "src/app/services/insurance.service";
import { SessionService } from "src/app/services/session.service";
import { PopoverController, AlertController, LoadingController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";

@Component({
  selector: "app-qr-reader",
  templateUrl: "./qr-reader.page.html",
  styleUrls: ["./qr-reader.page.scss"],
})
export class QrReaderPage implements OnInit {
  segment: string;
  data: any;
  inputCode;
  user;
  loading: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private insuranceService: InsuranceService,
    private sessionService: SessionService,
    public popOverCtrl: PopoverController,
    public alertCtrl: AlertController,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.segment = "qrcode";
    this.user = this.sessionService.getObject("user");
  }

  scanQR($ev) {
    this.data = null;
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.data = barcodeData.text;
        console.log(this.data);
        this.insuranceService.readQR(this.data).subscribe(
          (res) => {
            const users = res["data"].users;
            const register = res["data"].registers;
            console.log({ users, register });
            this.popUsers($ev, users, register);
          },
          (error) => {
            console.log(error);
          }
        );
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  changeInput($event) {
    this.inputCode = $event.target.value;
  }

  checkCode($ev) {
    this.showLoading();
    this.insuranceService.readQR(this.inputCode).subscribe(
      (res) => {
        const users = res["data"].users;
        const register = res["data"].registers;
        console.log({ users, register });
        this.loading.dismiss()
        this.popUsers($ev, users, register);
      },
      (error) => {
        console.log(error);
        this.loading.dismiss()
        this.presentAlert(
          "Error",
          "No se pudo realizar la acción. Intente nuevamente o ingrese un código válido.",
          "Aceptar"
        );
      }
    );
  }

  async popUsers(ev, users, register) {
    this.sessionService.setObject("usersList", users);
    this.sessionService.setObject("checkRegister", register);
    const popover = await this.popOverCtrl.create({
      component: PopoverComponent,
      event: ev,
      cssClass: "popover-style",
      translucent: true,
    });
    return await popover.present();
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
    alert.present();
  }
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: "",
    });

    this.loading.present();
  }
}
