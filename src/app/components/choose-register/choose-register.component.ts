import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-choose-register',
  templateUrl: './choose-register.component.html',
  styleUrls: ['./choose-register.component.scss'],
})
export class ChooseRegisterComponent implements OnInit {

  register;
  users;

  constructor(
    private popOverCtrl: PopoverController,
    private navCtrl: NavParams
  ) { }

  ngOnInit() {
      this.register = this.navCtrl.get('checkRegister');
      this.users = this.navCtrl.get('usersList')

  }
  
  openPopup($ev) {
    this.popUsers($ev, this.users, this.register);
    this.popOverCtrl.dismiss();
  }

  async popUsers(event, users, register) {
    console.log(event.target.id)
    const popover = await this.popOverCtrl.create({
      component: PopoverComponent,
      // event: ev,
      componentProps: { checkRegister: register, usersList: users, type: event.target.id },
      cssClass: "popover-style",
      translucent: true,
    });
    return await popover.present();
  }
}
