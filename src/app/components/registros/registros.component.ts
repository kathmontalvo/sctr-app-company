import { Component, OnInit } from "@angular/core";
import {
  PopoverController,
  NavParams,
  LoadingController,
  AlertController,
} from "@ionic/angular";
import { InsuranceService } from "src/app/services/insurance.service";

@Component({
  selector: "app-registros",
  templateUrl: "./registros.component.html",
  styleUrls: ["./registros.component.scss"],
})
export class RegistrosComponent implements OnInit {
  visits: object[];
  register;
  plant_id;
  user_id;
  loading;
  edit: boolean = false;
  visitId;
  inputCode;

  constructor(
    private popoverCtrl: PopoverController,
    private navCtrl: NavParams,
    private loadingController: LoadingController,
    private insuranceService: InsuranceService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loading = this.navCtrl.get("loading");
    this.loading.dismiss();
    this.register = this.navCtrl.get("register");
    this.plant_id = this.navCtrl.get("plant_id");
    this.user_id = this.navCtrl.get("user_id");
    this.initiating(this.register, false);
  }

  onClick() {
    this.popoverCtrl.dismiss({});
  }

  initiating(register, bool) {
    if (register.length !== 0) {
      const visitas = register[0].users[0]["visits"];
      this.visits = visitas.map((el) => {
        let editing = false;
        if (this.visitId == el["id"]) {
          editing = bool ? !editing : editing;
        }

        return {
          id: el["id"],
          body: el["body"],
          from: el["from"],
          to: el["to"],
          edit: editing,
        };
      });
      // console.log(register, this.visits);
    }
  }

  changeEdit(id, bool) {
    this.visitId = id;
    console.log(this.visitId);
    this.initiating(this.register, bool);
  }

  changeInput($event) {
    this.inputCode = $event.target.value;
    console.log(this.inputCode);
  }

  setComment(insu_id, body) {
    this.showLoading();
    this.insuranceService.setComments(insu_id, body).subscribe(
      (res) => {
        console.log(res);
        this.insuranceService
          .getInsuranceRegister(this.plant_id, this.user_id)
          .subscribe(
            (res) => {
              this.loading.dismiss();
              this.inputCode = "";
              this.register = res["data"];
              this.initiating(res["data"], false);
            },
            (err) => {
              this.loading.dismiss();
              this.presentAlert(
                "Error",
                "Hubo un error al realizar esta acción. Intente nuevamente.",
                "Aceptar"
              );
              console.error(err);
            }
          );
      },
      (err) => {
        this.loading.dismiss();
        this.presentAlert(
          "Error",
          "Hubo un error al realizar esta acción. Intente nuevamente.",
          "Aceptar"
        );
        console.log(err);
      }
    );
  }

  handleEditing(insu_id, bool) {
    this.changeEdit(insu_id, bool);
    if (this.inputCode) {
      this.setComment(insu_id, this.inputCode);
    }
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: "",
    });

    this.loading.present();
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
}
