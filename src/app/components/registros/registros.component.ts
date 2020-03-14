import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
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
    const register = this.sessionService.getObject("register")
    console.log(register);
    this.visits = register["visits"];
    const lastEl = this.visits.length - 1;
    this.today = this.visits[lastEl];
    console.log(this.dateStr)
  }

  onClick() {
    this.popoverCtrl.dismiss({});
  }



  onRegister() {
    this.d = new Date();
    this.dateNow = ("0" + this.d.getDate()).slice(-2);
    this.month = ("0" + (this.d.getMonth() + 1)).slice(-2); // Since getMonth() returns month from 0-11 not 1-12
    this.year = this.d.getFullYear();
    this.hours =  ("0" + this.d.getHours()).slice(-2);
    this.minutes = ("0" + this.d.getMinutes()).slice(-2);
    this.seconds = ("0" + this.d.getSeconds()).slice(-2);
  
    this.fullDate = this.year + "-" + this.month + "-" + this.dateNow + " " +  this.hours + ":" + this.minutes + ":" + this.seconds;
    
    console.log(this.fullDate)
    console.log(this.dateStr)
    
    const insurence_id = this.sessionService.getObject("insurance").id;
    const plant_id= this.sessionService.getObject("register").id;
    const body= this.commentText;
    const date = this.fullDate;

    console.log(insurence_id, plant_id, body, date)

    // this.insuranceService.postRegister(insurence_id, plant_id, body, date, date).subscribe(
    //   response => {
    //     alert("updated")
    //   },
    //   error => {
    //     alert(error)
    //   }
    // )
  }

}
