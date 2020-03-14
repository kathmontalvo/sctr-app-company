import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { InsuranceService } from "src/app/services/insurance.service";
import { SessionService } from "src/app/services/session.service";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";

@Component({
  selector: "app-qr-reader",
  templateUrl: "./qr-reader.page.html",
  styleUrls: ["./qr-reader.page.scss"]
})
export class QrReaderPage implements OnInit {
  segment: string;
  data: any;
  inputCode;
  user;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private insuranceService: InsuranceService,
    private sessionService: SessionService,
    public popOverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.segment = "qrcode";
    this.user = this.sessionService.getObject("user");
  }

  scanQR($ev) {
    this.data = null;
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.data = barcodeData;
        this.insuranceService.readQR(this.data).subscribe(
          res => {
            const users = res["data"].users;
            console.log(users);
            this.popUsers($ev, users);
          },
          error => {
            console.log(error);
          }
        );
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  changeInput($event) {
    this.inputCode = $event.target.value;
    console.log(this.inputCode);
  }

  checkCode($ev) {
    this.insuranceService.readQR(this.inputCode).subscribe(
      res => {
        const users = res["data"].users;
        console.log(users);
        this.popUsers($ev, users);
      },
      error => {
        console.log(error);
      }
    );
  }

  async popUsers(ev, users) {
    this.sessionService.setObject("usersList", users);
    const popover = await this.popOverCtrl.create({
      component: PopoverComponent,
      event: ev,
      cssClass: "popover-style",
      translucent: true
    });
    return await popover.present();
  }
}
