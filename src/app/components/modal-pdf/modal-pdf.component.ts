import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { CompanyService } from "../../services/company.service";

@Component({
  selector: "app-modal-pdf",
  templateUrl: "./modal-pdf.component.html",
  styleUrls: ["./modal-pdf.component.scss"],
})
export class ModalPdfComponent implements OnInit {
  title;

  constructor(
    private navCtrl: NavParams,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private companyService: CompanyService
  ) {}

  async ngOnInit() {
    this.title = this.navCtrl.get("title");
    const param = this.navCtrl.get("param");
    this.getDoc(param);
  }

  dismissModal() {
    this.modalController.dismiss({});
  }
  getDoc(title) {
    this.companyService.getDocs(title).subscribe(
      (res) => {
        const htmlString = res["data"].value;
        let node = document.createElement("div"); // Create a <li> node
        node.innerHTML= htmlString;
        document.getElementById("info-container").appendChild(node);
      },
      (err) => err
    );
  }
}
