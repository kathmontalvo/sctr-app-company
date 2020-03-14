import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { SessionService } from "src/app/services/session.service";
import { InsuranceService } from "src/app/services/insurance.service";

@Component({
  selector: "app-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"]
})
export class PopoverComponent implements OnInit {
  constructor(
    private popoverCtrl: PopoverController,
    private sessionService: SessionService,
    private insuranceService: InsuranceService
  ) {}

  commentText: string = "";
  usersList;
  check: boolean = true;
  insurance_id;
  plant;
  type;

  ngOnInit() {
    this.getUserList();
    this.insurance_id = this.sessionService.getObject("usersList")[0].insurence_id;
    this.plant = this.sessionService.getObject("user").plant.id;
  }

  onClick() {
    this.popoverCtrl.dismiss({});
  }

  getUserList() {
    const list = this.sessionService.getObject("usersList");
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
  }
  sendRegister() {
    const updatedUsers = this.usersList
      .filter(el => {
        return el.check;
      })
      .map(el => el.id);
    // console.log(updatedUsers, this.insurance_id, this.plant, this.commentText);

    this.insuranceService
      .checkRegister(
        updatedUsers,
        this.insurance_id,
        this.plant,
        this.commentText,
        0
      )
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }
}
