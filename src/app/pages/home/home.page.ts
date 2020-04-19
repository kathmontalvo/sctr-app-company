import { Component, OnInit, ViewChild } from "@angular/core";
import { SessionService } from "src/app/services/session.service";
import { InsuranceService } from "src/app/services/insurance.service";
import { LoadingController } from "@ionic/angular";
import { Chart } from "chart.js";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  @ViewChild("barCanvas", { static: false }) barCanvas: any;

  user: object;
  loading: any;
  insuranceTypes: Array<Object>;
  graphicData: object;
  percentage: number;
  graphicLabels: Array<string>;

  private barChart: Chart;

  constructor(
    private sessionService: SessionService,
    private insuranceService: InsuranceService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getInsuranceData();
    this.getGraphicData();
  }

  ionViewWillEnter() {
    this.user = this.sessionService.getObject("user");
  }

  getInsuranceData() {
    this.insuranceService.getInsurances().subscribe(
      (res) => {
        this.insuranceTypes = res["data"].insurences;
        this.user = this.sessionService.getObject("user");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleInput($event) {
    const query = $event.target.value.toLowerCase();
    const items = Array.from(document.querySelector("ion-list").children);

    requestAnimationFrame(() => {
      items.forEach((item) => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item["style"].display = shouldShow ? "block" : "none";
      });
    });
  }

  goToQrPage() {
    this.router.navigateByUrl("/qr-reader");
  }

  navigateToInsurance(id) {
    this.router.navigate(["/insurance", id]);
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: "",
    });

    this.loading.present();
  }

  getGraphicData() {
    this.insuranceService.getGraphic().subscribe((res) => {
      const data = res["data"]; // Data -> Mes: #días
      this.graphicData = data.visits
        .filter((el, i) => {
          return i > data.visits.length - 7;
        })
        .map((el) => el.visits);
      this.percentage = data.percent;
      const months = data.visits
        .filter((el, i) => {
          return i > data.visits.length - 7;
        })
        .map((el) => el.month);
      this.graphicLabels = months.map((el) => {
        switch (el) {
          case "01":
            el = "Ene";
            break;
          case "02":
            el = "Feb";
            break;
          case "03":
            el = "Mar";
            break;
          case "04":
            el = "Abr";
            break;
          case "05":
            el = "May";
            break;
          case "06":
            el = "Jun";
            break;
          case "07":
            el = "Jul";
            break;
          case "08":
            el = "Ago";
            break;
          case "09":
            el = "Set";
            break;
          case "10":
            el = "Oct";
            break;
          case "11":
            el = "Nov";
            break;
          case "12":
            el = "Dic";
            break;
          default:
            el = null;
            break;
        }
        console.log(el);
        return el;
      });
      console.log( this.graphicLabels, this.graphicData );
      this.createBarChart();
    });
  }

  createBarChart() {
    console.log(this.barCanvas);
    if (this.barCanvas) {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: this.graphicLabels,
          datasets: [
            {
              barPercentage: 0.8,
              label: "# visitas a planta",
              data: this.graphicData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.3)",
                "rgba(54, 162, 235, 0.3)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.3)",
                "rgba(153, 102, 255, 0.3)",
                "rgba(255, 159, 64, 0.3)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.4)",
                "rgba(54, 162, 235, 0.4)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.4)",
                "rgba(153, 102, 255, 0.4)",
                "rgba(255, 159, 64, 0.4)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          tooltips: {
            enabled: true,
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  offsetGridLines: true,
                },
              },
            ],
          },
        },
      });
    }
  }
}
