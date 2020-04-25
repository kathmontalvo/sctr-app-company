import { Component, OnInit } from "@angular/core";
import { PopoverController, NavParams } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { SessionService } from "src/app/services/session.service";
import { InsuranceService } from "src/app/services/insurance.service";

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss'],
})
export class RegistrosComponent implements OnInit {
  constructor(
    private popoverCtrl: PopoverController,
    private navCtrl: NavParams,
    private authService: AuthService,
    private sessionService: SessionService,
    private insuranceService: InsuranceService
  ) {}
  visits: object[];
  fromHour;
  toHour;
  bodyNow;
  today;
  d = new Date();
  dateNow = ("0" + this.d.getDate()).slice(-2);
  month = ("0" + (this.d.getMonth() + 1)).slice(-2); // Since getMonth() returns month from 0-11 not 1-12
  year = this.d.getFullYear();
  dateStr = this.dateNow + "/" + this.month + "/" + this.year;
  hours;
  minutes;
  seconds;
  fullDate;
  commentText: string = "";

  ngOnInit() {
    const register = this.navCtrl.get('register');
    this.visits = register[0]["visits"].reverse();
  }

  onClick() {
    this.popoverCtrl.dismiss({});
  }

}
