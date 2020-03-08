import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { InsuranceService } from "src/app/services/insurance.service";

@Component({
  selector: "app-qr-reader",
  templateUrl: "./qr-reader.page.html",
  styleUrls: ["./qr-reader.page.scss"]
})
export class QrReaderPage implements OnInit {
  segment: string;
  data: any;
  inputCode;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private insuranceService: InsuranceService
  ) {}

  ngOnInit() {
    this.segment = "qrcode";
  }

  scanQR() {
    this.data = null;
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.data = barcodeData;
        console.log("data", this.data);
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
  changeInput($event) {
    this.inputCode = $event.target.value;
    console.log(this.inputCode);
  }
  checkCode() {
    this.insuranceService.readQR(this.inputCode).subscribe(
      (res) => {
        console.log(res["data"])
      },
      error => {
        console.log(error)
      }
    )
  }
}
