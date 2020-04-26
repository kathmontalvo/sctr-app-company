import { Component, OnInit } from "@angular/core";
import { PopoverController, NavParams } from "@ionic/angular";
import { SessionService } from "src/app/services/session.service";
import { InsuranceService } from "src/app/services/insurance.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"]
})
export class PopoverComponent implements OnInit {
  constructor(
    private popoverCtrl: PopoverController,
    private navCtrl: NavParams,
    private sessionService: SessionService,
    private insuranceService: InsuranceService,
    public alertCtrl: AlertController
  ) {}

  commentText: string = "";
  usersList;
  registers;
  check: boolean = true;
  insurance_id;
  plant;
  type;
  alert: any;
  disabledBtn;

  ngOnInit() {
    this.getUserList();
    this.insurance_id = this.sessionService.getObject("usersList")[0].insurence_id;
    this.plant = this.sessionService.getObject("user").plant.id;
    this.disabledBtn = false;
  }

  onClick() {
    this.popoverCtrl.dismiss({});
  }

  getUserList() {
    const list = this.navCtrl.get('usersList');
    this.registers= this.navCtrl.get('checkRegister');
    this.usersList = list.map(user => {
      const elemento = {
        name: user.user.name,
        lastname: user.user.lastname,
        id: user.user_id,
        insurance: user.insurence_id,
        check: false
      };
      return elemento;
    });
    this.commentText = ''
  }

  async presentAlert(title, message, btn) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [{
        text: btn,
        handler: () => this.onClick()
      }]
    });

    await alert.present();
  }

  sendRegister() {
    this.disabledBtn = true;
    const updatedUsers = this.usersList
      .filter(el => {
        return el.check;
      })
      .map(el => el.id);
    console.log('includes', this.registers.includes(updatedUsers));
    const register = !this.registers.includes(updatedUsers) ? 0 : 1;
    
    this.insuranceService
    .checkRegister(
      updatedUsers,
      this.insurance_id,
      this.plant,
      this.commentText || '-',
      register
      )
      .subscribe(
        res => {
          console.log(updatedUsers, this.insurance_id, this.plant, this.commentText, register);
          console.log(res);
          this.presentAlert('¡Excelente!', 'Se ha registrado correctamente a los colaboradores.', 'Aceptar');
        },
        error => {
          console.error(error);
          this.presentAlert('Error', 'No se pudo realizar el registro correctamente', 'Aceptar');
        }
      );
  }
}
